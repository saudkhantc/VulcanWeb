const { setGlobalOptions } = require("firebase-functions/v2")
var serviceAccount = require("./serviceAccountKey.json")
var admin = require("firebase-admin")

admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vulcan-v2-dev-default-rtdb.firebaseio.com",
    storageBucket: "gs://vulcan-v2-dev.appspot.com"
  }
)

setGlobalOptions({ maxInstances: 10 })

const setupAccount = require('./setupAccount')
exports.createaccount = setupAccount.setupAccount

const updateAccountInfo = require('./updateAccountInfo')
exports.updateaccount = updateAccountInfo.updateAccountInfo

const updateExperienceStep = require('./updateExperienceStep')
exports.updateexperiencestep = updateExperienceStep.updateExperienceStep

const updateReachStep = require('./updateReachStep')
exports.updatereachstep = updateReachStep.updateReachStep

const updateEducatorProfile = require('./updateEducatorProfile')
exports.updateeducatorprofile = updateEducatorProfile.updateEducatorProfile

const emailVerifyToggle = require('./emailVerifyToggle')
exports.emailverify = emailVerifyToggle.emailVerifyToggle

const updateCategoryStep = require('./updateCategoryStep')
exports.updatecategorystep = updateCategoryStep.updateCategoryStep

const updateCourseObjectives = require('./updateCourseObjectives')
exports.updatecourseobjectives = updateCourseObjectives.updateCourseObjectives

const updateCurriculum = require('./updateCurriculum')
exports.updatecurriculum = updateCurriculum.updateCurriculum

const updateCourseDetailsStep = require('./updateCourseDetailsStep')
exports.updatecoursedetailsstep = updateCourseDetailsStep.updateCourseDetailsStep

const updateClassScheduleStep = require('./updateClassScheduleStep')
exports.updateclassschedulestep = updateClassScheduleStep.updateClassScheduleStep

const updateCourseStatus = require('./updateCourseStatus')
exports.updatecoursestatus = updateCourseStatus.updateCourseStatus

const courses = require('./courses')
exports.courses = courses.courses

const createStripeAccount = require('./stripe/createStripeAccount')
exports.setupstripeaccount = createStripeAccount.createStripeAccount

const getEducatorAccBalance = require('./stripe/getEducatorAccBalance')
exports.geteducatoraccbalance = getEducatorAccBalance.getEducatorAccBalance

const checkout = require('./stripe/checkout')
exports.checkout = checkout.checkout

const educatorPayments = require('./stripe/educatorPayments')
exports.educatorpayments = educatorPayments.educatorPayments

const getEnrolledCourses = require('./getEnrolledCourses')
exports.getenrolledcourses = getEnrolledCourses.getEnrolledCourses

const stripeWebhook = require('./stripe/stripeWebhook')
exports.stripewebhook = stripeWebhook.stripeWebhook

