import admin from 'firebase-admin'
import { logger } from 'firebase-functions'

export const sendNotification = async (
  userId: string,
  title: string,
  body: string,
  data?: { [key: string]: string }
) => {
  const db = admin.firestore()
  const fcm = admin.messaging()

  const tokensRef = db
    .collection('tokens')
    .where('userId', '==', userId)
    .where('platform', '==', 'android')
    .limit(1)

  const tokens = await tokensRef.get()

  if (tokens.empty) {
    logger.log(`User (userId: ${userId}) not found / platform not supported.`)
    return
  }

  const token = tokens.docs[0].data()
  const notification = { title, body }
  const headers = {
    'apns-push-type': 'background',
    'apns-priority': '5',
  }

  const message: admin.messaging.TokenMessage = {
    notification,
    data,
    token: token.value,
    apns: {
      payload: { aps: { contentAvailable: true } },
      headers,
    },
  }

  return fcm
    .send(message)
    .then(() => {
      logger.log(`Notification sent to user (userId: ${userId}).\n${body}`)
    })
    .catch((error) => {
      logger.log(`${error}`)
    })
}
