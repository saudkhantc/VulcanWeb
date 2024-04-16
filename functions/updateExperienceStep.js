const { onCall } = require("firebase-functions/v2/https")
const { getDatabase } = require("firebase-admin/database")

const db = getDatabase()
const dbCalls = require("./databaseCalls")

exports.updateExperienceStep = onCall((request) => {
  let isSuccess = true
  let errorMessage = null
  const uid = request.auth.uid
  const { professor, teacher, independent, tutor, experienceOther, inPerson, liveOnline, recordedOnline, mediumOther, years} = request.data  
  try {
    const experience = {}
    const mediums = {}

    experience.professor = professor
    experience.teacher = teacher
    experience.independent = independent
    experience.tutor = tutor
    experience.experience_other = experienceOther

    
    mediums.in_person = inPerson
    mediums.live_online = liveOnline
    mediums.recorded_online = recordedOnline
    mediums.medium_other = mediumOther
    db.ref(`users/${uid}/educator/questions`).update({
      mediums: mediums,
      experience: experience,
      years: years
    })    
  } catch (error) {
    dbCalls.logUser("ERROR: Experience Steps: " + error)
    isSuccess = false
    errorMessage = error
  }
  return { isSuccess: isSuccess, errorMessage: errorMessage }
})
