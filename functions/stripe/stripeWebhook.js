
const { onRequest } = require("firebase-functions/v2/https")
const { getDatabase } = require("firebase-admin/database")
const db = getDatabase()
const dbCalls = require("../databaseCalls")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.stripeWebhook = onRequest(async (req, res) => {
    const sig = req.headers['stripe-signature']
    const body = req.rawBody
    let event
    try {
        console.log('process.env.STRIPE_WEB_HOOK_SECRET_KEY', process.env.STRIPE_WEB_HOOK_SECRET_KEY);
        event = stripe.webhooks.constructEvent(body, sig, "whsec_df5dde33da8086a5b8937eed4c171981228b231e486cd68b71c7fa1f9b112a52")
    } catch (err) {
        dbCalls.logUser("ERROR: stripe webhook: " + err)
    }
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object
            const { student_id } = session.metadata
            if (session.payment_status === "paid" || session.payment_status === "unpaid") {
                if (session.payment_status === "paid") {
                    db.ref(`users/${student_id}/student/courses/${session.id}/`).update({
                        payment_complete: true
                    })
                } else if (session.payment_status === "unpaid") {
                    db.ref(`users/${student_id}/student/courses/${session.id}/`).update({
                        payment_complete: false
                    })
                }
            }
            break
        default:
            console.log(`Unhandled event type ${event.type}`)
    }
    res.send(event.data.object)
})
