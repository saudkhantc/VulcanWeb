const { onCall } = require("firebase-functions/v2/https")
const { getDatabase } = require("firebase-admin/database")

const db = getDatabase()
const dbCalls = require("./databaseCalls")

exports.updateCourseObjectives = onCall((request) => {
    let isSuccess = true
    let errorMessage = null
    const uid = request.auth.uid
    const { objective1, objective2, objective3, objective4, objective5, prerequisite1, prerequisite2, prerequisite3, prerequisite4, prerequisite5, intendedLearner, courseId} = request.data
    try {
        const objectives = {}
        const prerequisites = {}
        if (objective1) {
            objectives.objective_1 = objective1
        }
        if (objective2) {
            objectives.objective_2 = objective2
        }
        if (objective3) {
            objectives.objective_3 = objective3
        }
        if (objective4) {
            objectives.objective_4 = objective4
        }
        if (objective5) {
            objectives.objective_5 = objective5
        }
        if (prerequisite1) {
            prerequisites.prerequisite_1 = prerequisite1
        }
        if (prerequisite2) {
            prerequisites.prerequisite_2 = prerequisite2
        }
        if (prerequisite3) {
            prerequisites.prerequisite_3 = prerequisite3
        }
        if (prerequisite4) {
            prerequisites.prerequisite_4 = prerequisite4
        }
        if (prerequisite5) {
            prerequisites.prerequisite_5 = prerequisite5
        }
        db.ref(`users/${uid}/educator/courses/${courseId}/courseDetails/intended_learner`).update({
            objectives: objectives,
            description: intendedLearner,
            prerequisites: prerequisites
          })
          
    } catch (error) {
        dbCalls.logUser("ERROR: Pre-Requisites Steps: " + error)
        isSuccess = false
        errorMessage = error
    }
    return { isSuccess: isSuccess, errorMessage: errorMessage }
})  
