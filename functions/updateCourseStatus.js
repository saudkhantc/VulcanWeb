const { onCall } = require("firebase-functions/v2/https")
const { getDatabase } = require("firebase-admin/database")

const db = getDatabase()
const dbCalls = require("./databaseCalls")

exports.updateCourseStatus = onCall(async (request) => {
    let isSuccess = true
    let errorMessage = null
    try {
        const uid = request.auth.uid
        const { courseId, status } = request.data
        await db.ref(`users/${uid}/educator/courses/${courseId}/`).update({status})
    } catch (error) {
        dbCalls.logUser("ERROR: Status: " + error)
        isSuccess = false
        errorMessage = error
    }

    return { isSuccess: isSuccess, errorMessage: errorMessage }
})
