const { onCall } = require("firebase-functions/v2/https")
const { getDatabase } = require("firebase-admin/database")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const db = getDatabase()
const dbCalls = require("../databaseCalls")

exports.createStripeAccount = onCall(async (request) => {
  const { firstName, lastName } = request.data
  let isSuccess = true
  let errorMessage = null
  const uid = request.auth.uid
  const DOMAIN = 'http://localhost:3000'

  try {
    let accountId;
    const userDataSnapshot = await db.ref(`users/${uid}/stripe/stripe_account_id`).once('value')
    if (userDataSnapshot.exists()) {
      accountId = userDataSnapshot.val()
    }

    if (!accountId) {
      //for now its just dummy data for development
      const account = await stripe.accounts.create({
        country: 'US',
        type: 'express',
        capabilities: {
          transfers: {
            requested: true,
          },
          tax_reporting_us_1099_k: { requested: true },
        },
        business_type: 'individual',
        business_profile: {
          product_description: 'Vulcan Learning Institute Educator'
        },
        individual: {
          first_name: firstName,
          last_name: lastName,
        }
      })
      accountId = account.id
    }

    // Create an account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${DOMAIN}/dashboard#earnings`,
      return_url: `${DOMAIN}/dashboard#earnings`,
      type: 'account_onboarding',
    })

    await db.ref(`users/${uid}`).update({
      stripe: {
        stripe_account_id: accountId,
      },
    })

    return { url: accountLink.url, created: accountLink.created, expires_at: accountLink.expires_at, object: accountLink.object }
  }
  catch (error) {
    dbCalls.logUser("ERROR: Create Stripe Account: " + error)
    isSuccess = false
    errorMessage = error.message || 'An error occurred'
  }
  return { isSuccess: isSuccess, errorMessage: errorMessage }
})
