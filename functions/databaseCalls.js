const admin = require("firebase-admin")  

const db = admin.database()  

exports.logUnauth = (tag) => {
  db.ref(`unauth_logging`).update({
    [Date.now()]: tag,
  })  
}  

exports.logUser = (uid, tag) => {
  db.ref(`users_logging`)
    .child(uid)
    .update({
      [Date.now()]: tag,
    })  
}  

// exports.createUser = (uid, firstName, lastName, email, number, isEducator) => {
//     db.ref(`users`).child(uid).update({
//         "first_name":firstName,
//         "last_name":lastName,
//         "email":email,
//         "email_verified": false,
//         "number":number,
//         "isEducator": isEducator,
//         "account_active":true,
//         "created": Date.now()
//     }).catch(error => {
//         this.logUnauth(loggingConstants.createAccountError + `ID: ${uid}: ${error}`)
//     })  
// }

// exports.udateEmailVerified = (uid, isEmailVerified) => {
//     db.ref(`users`).child(uid).update({
//         "email_verified": isEmailVerified
//     })
// }

// exports.updateEnrolled = (uid, chargeId,paymentMethodType,isInstallments,courseId,sectionId,cohortId) => {
//     db.ref(`users/${uid}/courses/enrolled`).update({
//         [Date.now()]: 
//         {
//             "charge_id": chargeId,
//             "payment_method_type": paymentMethodType,
//             "is_installments":isInstallments,
//             "course_id":courseId,
//             "section_id":sectionId,
//             "cohort_id": cohortId
//         }
//       })

//     this.logUser(uid, "ACTION: Course Enrolled: " + courseId + " is_installments: " + isInstallments + " paymentMethod: " + paymentMethodType + " id: " + chargeId)
// }

// exports.dbCourseCancelled = (uid, timestamp,chargeId,paymentMethodType,isInstallments,courseId,refundAmount) => {
//     db.ref(`/users/${uid}/courses/enrolled/${timestamp}`).on("value", function(snapshot) {

//         if (!snapshot.val()) {
//             return
//         }

//         db.ref(`/users/${uid}/courses/cancelled/${timestamp}`).update(snapshot.val())
//         .then(
//             db.ref(`/users/${uid}/courses/enrolled/${timestamp}`).remove()
//         )
//         db.ref(`/users/${uid}/courses/cancelled/${timestamp}`).update({
//             "cancelled_at" : firebase.database.ServerValue.TIMESTAMP
//         })

//     }, function (error) {
//         db.ref(`users_logging`).child(uid).update({
//             [Date.now()]: "ERROR: Course Cancel DB Update: " + error
//         })
//     })  
// }

// exports.addWaitlist = (uid, courseId, email) => {

//     try {

//         db.ref(`waitlist/${courseId}`).push().update(
//             {
//                 "added": firebase.database.ServerValue.TIMESTAMP,
//                 "email": email,
//                 "uid": uid
//             }
//         )

//         return true
//     } catch(error) {
//         this.logUnauth("ERROR: ADD WAITLIST: " + error + " Email: " + email + " UID: " + uid)
//         return false
//     }
// }

// exports.logNotFound = (url) => {

//     try {
//         db.ref(`not_found`).push().update(
//             {
//                 "at": firebase.database.ServerValue.TIMESTAMP,
//                 "url": url,
//                 "local_date": Date.now(),
//             }
//         )
//         return true
//     } catch(error) {
//         this.logUnauth("ERROR: Not Found: " + error + " Url: " + url)
//         return false
//     }
// }
