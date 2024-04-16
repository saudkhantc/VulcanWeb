const { onCall } = require("firebase-functions/v2/https")
const { getDatabase } = require("firebase-admin/database")

const db = getDatabase()
const dbCalls = require("./databaseCalls")

exports.courses = onCall(async () => {
    try {
        const usersRef = db.ref("users")
        const usersSnapshot = await usersRef.once("value")
        const users = usersSnapshot.val()
        const activeCourses = {}
        // Iterate over each user
        for (const userId in users) {
            if (
                users.hasOwnProperty(userId) &&
                users[userId].educator &&
                users[userId].educator.courses
            ) {
                const courses = users[userId].educator.courses
                const user = users[userId]
                const userData = {
                    userId: userId,
                    account: user.account,
                    profile: user.educator.profile,
                    stripe: user.stripe
                }
                // Iterate over each course of the user
                for (const courseId in courses) {
                    if (courses.hasOwnProperty(courseId)) {
                        const course = courses[courseId]
                        // Check if the course is active in users/educator/courses
                        if (course.status === "active") {
                            // Check if the course is also active in courses
                            if (courseId in activeCourses) {
                                // If the course is already added, update the user information
                                activeCourses[courseId].userId = userData
                            } else {
                                // If the course is not added yet, add it to activeCourses
                                activeCourses[courseId] = {
                                    courseDetails: course.courseDetails,
                                    instructorId:  course.instructorId,
                                    status: course.status,
                                    user: userData,
                                }
                            }
                        } else {
                            delete activeCourses[courseId]
                        }
                    }
                }
            }
        }
        return { isSuccess: true, activeCourses }
    } catch (error) {
        dbCalls.logUser("ERROR: Course Details Step: " + error)
        return { isSuccess: false, errorMessage: error }
    }
})
