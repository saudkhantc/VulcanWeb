const admin = require('firebase-admin')

const storage = admin.storage()

exports.uploadImageAndSaveLink = async (request) => {
  const bucket = storage.bucket()
  const { base64String, courseImage, courseId, uid } = request
  try {
    if (base64String) {
      const fileName = `educators/${uid}.png`
      const dataPrefix = "data:image/png;base64,"
      let actualBase64 = base64String
      if (base64String.startsWith(dataPrefix)) {
        actualBase64 = base64String.slice(dataPrefix.length)
      }
      const imageRef = bucket.file(fileName)
      await imageRef.save(Buffer.from(actualBase64, 'base64'), {
        metadata: {
          contentType: 'image/png'
        }
      })
      const imageUrl = await imageRef.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
      })
      if (imageUrl[0]) {
        return { imageUrl: imageUrl[0] }
      }
    } else {
        const fileName = `courses/${uid}_${courseId}.png`
        const dataPrefix = "data:image/png;base64,"
        let actualBase64 = courseImage
        if (courseImage.startsWith(dataPrefix)) {
          actualBase64 = courseImage.slice(dataPrefix.length)
        }
        const imageRef = bucket.file(fileName)
        await imageRef.save(Buffer.from(actualBase64, 'base64'), {
          metadata: {
            contentType: 'image/png'
          }
        })
        const imageUrl = await imageRef.getSignedUrl({
          action: 'read',
          expires: '03-09-2491'
        })
        if (imageUrl[0]) {
          return { imageUrl: imageUrl[0] }
        }
      }
    } catch (error) {
      return { error: "Error uploading image" }
    }
  }