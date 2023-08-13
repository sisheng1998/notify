import * as admin from 'firebase-admin'
import {
  getNextPaymentDate,
  isOneOrTwoWeeksBefore,
} from '../../app/utils/dueDate'

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

  try {
    await admin.messaging().send(message)
    return `Notification sent to user (userId: ${userId}).\n${body}`
  } catch (error) {
    return `${error}`
  }
}

export const formatAmount = (amount: string) => {
  const parsedAmount = parseFloat(amount)

  if (isNaN(parsedAmount)) return amount

  const formattedAmount = parsedAmount.toLocaleString('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return formattedAmount
}

export { getNextPaymentDate, isOneOrTwoWeeksBefore }
