const { onCall } = require("firebase-functions/v2/https")
const { getDatabase } = require("firebase-admin/database")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const db = getDatabase()
const dbCalls = require("../databaseCalls")

exports.getEducatorAccBalance = onCall(async (request) => {
  let isSuccess = true
  let errorMessage = null
  const uid = request.auth.uid
  try {
    const snapshot = await db.ref(`users/${uid}/stripe/stripe_account_id`).once('value')
    const account_id = snapshot.val()
    const payouts = await stripe.payouts.list({
      limit: 100,
      stripeAccount: account_id,
    }
    )
    let totalPayoutAmount = 0
    payouts.data.forEach(payout => {
      totalPayoutAmount += payout.amount
    })
    const balance = await stripe.balance.retrieve({
      stripeAccount: account_id,
    })
    return { balance: balance, payouts: totalPayoutAmount }
  }
  catch (error) {
    dbCalls.logUser("ERROR: Account Balance: " + error)
    isSuccess = false
    errorMessage = error.message || 'An error occurred'
  }
  return { isSuccess: isSuccess, errorMessage: errorMessage }
})
