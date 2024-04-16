const { onCall } = require("firebase-functions/v2/https")  
const { getDatabase } = require("firebase-admin/database")

const db = getDatabase()  
const dbCalls = require("./databaseCalls")  

exports.updateAccountInfo = onCall((request) => {
  let isSuccess = true  
  let errorMessage = null  
  const uid = request.auth.uid  
  const { firstName, lastName, number } = request.data  
  try {
    const profileUpdates = {}
    
    if (firstName) {
      profileUpdates.first_name = firstName  
    }

    if (lastName) {
      profileUpdates.last_name = lastName  
    }

    if (number) {
      profileUpdates.number = number  
    }

    if (Object.keys(profileUpdates).length > 0) {
      db.ref(`users/${uid}/account`).update(profileUpdates)  
    }
  } catch (error) {
    dbCalls.logUser("ERROR: Update Account: " + error)  
    isSuccess = false
    errorMessage = error
  }
  return { isSuccess: isSuccess, errorMessage: errorMessage }  
})  
