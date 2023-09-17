import admin from 'firebase-admin'

export const sendNotification = async (
  userId: string,
  title: string,
  body: string,
  data?: { [key: string]: string }
) => {
  const tokensRef = admin
    .firestore()
    .collection('tokens')
    .where('userId', '==', userId)
    .where('platform', '==', 'android')
    .limit(1)

  const tokens = await tokensRef.get()

  if (tokens.empty)
    return `User (userId: ${userId}) not found / platform not supported.`

  const token = tokens.docs[0].data()

  const message: admin.messaging.TokenMessage = {
    notification: { title, body },
    data,
    token: token.value,
    android: {
      notification: {
        channelId: 'default',
        color: '#ED1C24',
      },
    },
    apns: {
      payload: { aps: { contentAvailable: true } },
      headers: {
        'apns-push-type': 'background',
        'apns-priority': '5',
      },
    },
  }

  try {
    await admin.messaging().send(message)
    return `Notification sent to user (userId: ${userId}).\n${body}`
  } catch (error) {
    return `${error}`
  }
}
