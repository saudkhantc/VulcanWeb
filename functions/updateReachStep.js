const { onCall } = require("firebase-functions/v2/https")  
const { getDatabase } = require("firebase-admin/database")

const db = getDatabase()  
const dbCalls = require("./databaseCalls")  

exports.updateReachStep = onCall((request) => {

    let isSuccess = true
    let errorMessage = null
    const uid = request.auth.uid

    const { platformLink1, platformLink2, platformLink3, socialLink1, socialLink2, socialLink3 } = request.data

    try {
        const platforms = {}  
        const socials = {}

        if (platformLink1) {
            platforms.platform_link_1 = platformLink1
        }

        if (platformLink2) {
            platforms.platform_link_2 = platformLink2
        }

        if (platformLink3) {
            platforms.platform_link_3 = platformLink3
        }

        if (socialLink1) {
            socials.social_link_1 = socialLink1
        }

        if (socialLink2) {
            socials.social_link_2 = socialLink2
        }
       
        if (socialLink3) {
            socials.social_link_3 = socialLink3
        }

        db.ref(`users/${uid}/educator/questions`).update({
            platforms: platforms,
            socials: socials
          })         
    } catch (error) {
        dbCalls.logUser("ERROR: Reach Steps: " + error)  
        isSuccess = false
        errorMessage = error
    }

    return { isSuccess: isSuccess, errorMessage: errorMessage }  
})  
