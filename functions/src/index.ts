import { logger } from 'firebase-functions'
import { onRequest } from 'firebase-functions/v2/https'
import { onSchedule } from 'firebase-functions/v2/scheduler'
import * as admin from 'firebase-admin'

import {
  getNextPaymentDate,
  isOneOrTwoWeeksBefore,
  sendNotification,
  formatAmount,
} from './utils'

admin.initializeApp()

export const sendNotifications = onRequest(async (request, response) => {
  let results = ''

  const policiesRef = admin
    .firestore()
    .collection('policies')
    .where('getNotified', '==', true)
    .where('isTrashed', '==', false)

  const policies = await policiesRef.get()

  for (const doc of policies.docs) {
    const { inForceDate, paymentFrequency, amount, name, policyNo, userId } =
      doc.data()

    const paymentDueDate = getNextPaymentDate(inForceDate, paymentFrequency)

    if (isOneOrTwoWeeksBefore(paymentDueDate)) {
      const result = await sendNotification(
        userId,
        'Policy Payment Due Soon',
        `Policy No.: ${policyNo}\nClient: ${name}\nAmount: ${formatAmount(
          amount
        )}\nDue Date: ${paymentDueDate}`
      )

      results += `${result}\n\n`
    }
  }

  response.send(
    results !== ''
      ? `<p style="white-space: pre-wrap;">${results}</p>`
      : 'No notifications sent.'
  )
})

// Everyday 9 am
exports.scheduler = onSchedule('0 9 * * *', async () => {
  console.log('Hello from scheduler')
  logger.log('Hello from scheduler')
})
