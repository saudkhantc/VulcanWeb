const { onCall } = require("firebase-functions/v2/https")
const { getDatabase } = require("firebase-admin/database")

const db = getDatabase()
const dbCalls = require("./databaseCalls")

exports.updateCategoryStep = onCall((request) => {
    const { courseTitle, courseSubTitle, cost, categoryValue, status, courseId } = request.data
    let isSuccess = true
    let errorMessage = null
    const uid = request.auth.uid
    let id = courseId || Date.now().toString()
    try {
        db.ref(`users/${uid}/educator/courses/${id}`).update({
            'courseDetails/basics': {
                title: courseTitle,
                subTitle: courseSubTitle,
                category: categoryValue,
                cost: cost
            },
            instructorId: uid,
            status
        })
    } catch (error) {
        dbCalls.logUser("ERROR: category Steps: " + error)
        isSuccess = false
        errorMessage = error
    }
    return { isSuccess: isSuccess, errorMessage: errorMessage, courseId: id }
})
