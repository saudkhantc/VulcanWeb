const { onCall } = require("firebase-functions/v2/https");
const dbCalls = require("../databaseCalls");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.educatorPayments = onCall(async (request) => {
    let isSuccess = true;
    let errorMessage = null;
    const stripe_account_id = request.data.stripe_account_id;
    let filteredPaymentIntents = [];
    let lastPaymentIntentId = null;

    try {
        while (true) {
            const params = { limit: 100 };
            if (lastPaymentIntentId) {
                params.starting_after = lastPaymentIntentId;
            }
            const paymentIntents = await stripe.paymentIntents.list(params);
            if (paymentIntents.data.length === 0) {
                break;
            }
            const batchFiltered = paymentIntents.data.filter(pi => pi.transfer_data && pi.transfer_data.destination === stripe_account_id);
            filteredPaymentIntents = filteredPaymentIntents.concat(batchFiltered);
            lastPaymentIntentId = paymentIntents.data[paymentIntents.data.length - 1].id;
        }
        return {
            isSuccess: true,
            errorMessage: null,
            paymentIntents: filteredPaymentIntents,
            count: filteredPaymentIntents.length,
        };
    } catch (error) {
        dbCalls.logUser("ERROR: Payment intents retrieval error: " + error.toString());
        isSuccess = false;
        errorMessage = error.message || 'An unexpected error occurred';
        return {
            isSuccess: isSuccess,
            errorMessage: errorMessage,
            paymentIntents: [],
        };
    }
});
