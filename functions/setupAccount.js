const { onCall } = require("firebase-functions/v2/https") 
const { getDatabase } = require("firebase-admin/database") 

const db = getDatabase() 
const dbCalls = require("./databaseCalls") 

exports.setupAccount = onCall((request) => {
  var isSuccess = true 
  var errorMessage = null 
  const uid = request.auth.uid 
  const email = request.auth.token.email 
  const { firstName, lastName, number, isEducator } = request.data 

  dbCalls.logUser(uid, `ACTION: Firebase Account Created: ID: ${email}`) 

  db.ref(`users`).child(uid).update({
      account_active: true,
      created: Date.now(),
      email_verified: false,
      is_educator: isEducator,
    })
    .then(
      db.ref(`users`).child(uid).child("account").update({
        first_name: firstName,
        last_name: lastName,
        email: email,
        number: number,
      })
    )
    .catch((error) => {
      dbCalls.logUser(uid, `ERROR: ACCOUNT INFO ERROR ID: ${uid}: ${error}`) 
      isSuccess = false 
      errorMessage = error
    })
  return { isSuccess: isSuccess, errorMessage: errorMessage } 
}) 
