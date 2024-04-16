const { onCall } = require("firebase-functions/v2/https")
const { getDatabase } = require("firebase-admin/database")

const db = getDatabase()
const dbCalls = require("./databaseCalls")
const { uploadImageAndSaveLink } = require("./uploadImageAndSaveLink")

exports.updateCourseDetailsStep = onCall(async(request) => {
    const { description, courseImage, promoLink, state, courseId } = request.data
    let isSuccess = true
    let errorMessage = null
    const uid = request.auth.uid
    const courseDetails = {}
    if (description) {
        courseDetails.description = description
    }
    if (promoLink) {
        courseDetails.promo_link = promoLink
    }
    if (courseImage) {
      const result = await uploadImageAndSaveLink({
        courseImage: courseImage,
        uid: uid,
        courseId: courseId
      })
      const url = result?.imageUrl
      if (url) {
        courseDetails.course_image = url
      }
    }
    try {
        db.ref(`users/${uid}/educator/courses/${courseId}/courseDetails/details`).update(courseDetails)
    } catch (error) {
        dbCalls.logUser("ERROR: Course Details Step: " + error)
        isSuccess = false
        errorMessage = error
    }
    return { isSuccess: isSuccess, errorMessage: errorMessage }
})      
