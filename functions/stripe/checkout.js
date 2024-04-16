const { onCall } = require("firebase-functions/v2/https")
const { getDatabase } = require("firebase-admin/database")
const db = getDatabase()
const dbCalls = require("../databaseCalls")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.checkout = onCall(async (request) => {
  let isSuccess = true
  let errorMessage = null
  const uid = request.auth.uid
  const YOUR_DOMAIN = process.env.APP_URL
  const { stripe_acc_id, amount, application_fee_amount, cohort_id, duration, start_date, times, student_id, instructorId, course_title, course_id, instructor } = request.data
  const cost = (amount - application_fee_amount) / 100
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      ui_mode: 'embedded',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course_title,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        student_id: student_id,
        course_title: course_title,
        cohort_id: cohort_id
      },
      return_url: `${YOUR_DOMAIN}/enrollment-complete?session_id={CHECKOUT_SESSION_ID}`,
      payment_intent_data: {
        application_fee_amount: application_fee_amount,
        transfer_data: {
          destination: stripe_acc_id,
        },
        metadata: {
          student_id: student_id,
          course_title: course_title,
          cohort_id: cohort_id
        }
      },
    })
    db.ref(`users/${uid}/student/courses/${session.id}/`).update({
      payment_complete: false,
      cohort: cohort_id,
      start_date: start_date,
      course_id,
      instructor,
      instructorId,
      course_title,
      times,
      duration,
      cost: cost,
      stripeKey: session.payment_intent
    })
    return { clientSecret: session.client_secret }
  }
  catch (error) {
    dbCalls.logUser("ERROR: Checkout: " + error)
    isSuccess = false
    errorMessage = error.message || 'An error occurred'
  }
  return { isSuccess: isSuccess, errorMessage: errorMessage }
}
)
