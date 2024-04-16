const { onCall } = require("firebase-functions/v2/https")
const admin = require('firebase-admin')
const { getDatabase } = require("firebase-admin/database")

exports.emailVerifyToggle = onCall(async (request) => {
  const db = getDatabase()
  try {
    const uid = request.auth.uid
    const userRef = db.ref(`users/${uid}`)
    const snapshot = await userRef.once('value')
    const userData = snapshot.val()
    const emailVerified = userData.email_verified || false
    const newEmailVerified = !emailVerified
    await admin.auth().updateUser(uid, {
      emailVerified: newEmailVerified,
    })
    userRef.update({
      email_verified: newEmailVerified,
    })
    return { isSuccess: true, errorMessage: null }
  } catch (error) {
    console.error("Error:", error)
    return { isSuccess: false, errorMessage: error.message }
  }
})
