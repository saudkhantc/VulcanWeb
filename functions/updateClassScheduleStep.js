const { onCall } = require("firebase-functions/v2/https")
const { getDatabase } = require("firebase-admin/database")

const db = getDatabase()
const dbCalls = require("./databaseCalls")

exports.updateClassScheduleStep = onCall(async (request) => {
    const { firstClassString, duration, times, courseId, classId, classStatus } = request.data
    let isSuccess = true
    let errorMessage = null
    const uid = request.auth.uid
    const class_schedule = {}
    let cohort
    let id = classId || Date.now().toString()

    try {
        if (!classId) {
            const classScheduleRef = db.ref(`users/${uid}/educator/courses/${courseId}/courseDetails/class_schedule`)
            const classScheduleSnapshot = await classScheduleRef.once("value")
            const classNumbersArray = []
            classScheduleSnapshot.forEach((childSnapshot) => {
                const classData = childSnapshot.val()
                const classStringPart = classData.cohort.charAt(0)
                const classNumericPart = parseInt(classData.cohort.substring(1)) 
                classNumbersArray.push({
                    string: classStringPart,
                    numeric: classNumericPart,
                })
            })
            if (classNumbersArray.length === 0) {
                cohort = "A1"
            } else {
                const maxObject = classNumbersArray.reduce((maxObj, currentObj) => {
                    if (currentObj.string === maxObj.string) {
                        return currentObj.numeric > maxObj.numeric ? currentObj : maxObj
                    } else {
                        return currentObj.string > maxObj.string ? currentObj : maxObj
                    }
                })        
                let classLetter = "A"
                if (maxObject.string === "A" && maxObject.numeric >= 99) {
                    classLetter = "B"
                    cohort = `${classLetter}1`
                } else {
                    cohort = `${maxObject.string}${maxObject.numeric + 1}`
                }
            }
        }   
        if (firstClassString) {
            class_schedule.first_class = firstClassString
        }
        if (duration) {
            class_schedule.duration = duration
        }
        if (times) {
            class_schedule.times = times
        }
        if (classStatus) {
            class_schedule.status = classStatus
        }
        if (cohort) {
            class_schedule.cohort = cohort
        }

        const classScheduleRef = db.ref(`users/${uid}/educator/courses/${courseId}/courseDetails/class_schedule/${id}`)
        const classScheduleSnapshot = await classScheduleRef.once("value")

        if (classScheduleSnapshot.exists()) {
            // If the class schedule already exists, update it
            await classScheduleRef.update({
                ...class_schedule,
            })
        } else {
            // If the class schedule doesn't exist, create it
            await classScheduleRef.set({
                ...class_schedule,
            })
        }
    } catch (error) {
        dbCalls.logUser("ERROR: Class Schedule Step:" + error)
        isSuccess = false
        errorMessage = error
    }
    return { isSuccess: isSuccess, errorMessage: errorMessage }
})