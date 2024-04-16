const { onCall } = require("firebase-functions/v2/https")
const { getDatabase } = require("firebase-admin/database")

const db = getDatabase()
const dbCalls = require("./databaseCalls")

function filterCoursesByInstructorId(courses, uid) {
    const filteredCourses = {}
    for (const courseId in courses) {
        if (courses.hasOwnProperty(courseId)) {
            const course = courses[courseId]
            if (course.instructorId === uid) {
                filteredCourses[courseId] = course
            }
        }
    }
    return filteredCourses
}

exports.getEnrolledCourses = onCall(async (request) => {
    const uid = request.auth.uid
    try {
        const usersRef = db.ref("users")
        const usersSnapshot = await usersRef.once("value")
        const users = usersSnapshot.val()
        let instructorCourses = {}
        for (const userId in users) {
            if (
                users.hasOwnProperty(userId) &&
                users[userId].student &&
                users[userId].student.courses
            ) {
                const courses = users[userId].student.courses
                instructorCourses = { ...instructorCourses, ...filterCoursesByInstructorId(courses, uid) }
            }
        }
        return { isSuccess: true, courses: instructorCourses }
    } catch (error) {
        console.error("Error in getEnrolledCourses function:", error)
        dbCalls.logUser("ERROR: Course Details Step: " + error)
        return { isSuccess: false, errorMessage: error.message || "An error occurred." }
    }
})
