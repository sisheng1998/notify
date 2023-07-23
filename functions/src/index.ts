import { logger } from 'firebase-functions'
import { onRequest } from 'firebase-functions/v2/https'
import { onSchedule } from 'firebase-functions/v2/scheduler'
import * as admin from 'firebase-admin'

import {
  getNextPaymentDate,
  isOneOrTwoWeeksBefore,
} from '../../app/utils/dueDate'

admin.initializeApp()

export const helloWorld = onRequest(async (request, response) => {
  const collectionRef = admin
    .firestore()
    .collection('policies')
    .where('getNotified', '==', true)
    .where('isTrashed', '==', false)

  const snapshot = await collectionRef.get()

  snapshot.forEach((doc) => {
    const { inForceDate, paymentFrequency, amount, name, policyNo, userId } =
      doc.data()

    const paymentDueDate = getNextPaymentDate(inForceDate, paymentFrequency)

    if (isOneOrTwoWeeksBefore(paymentDueDate)) {
      console.log(paymentDueDate, amount, name, policyNo, userId)
    }
  })

  response.send('Hello from Firebase!')
})

exports.scheduler = onSchedule('* * * * *', async () => {
  console.log('Hello from scheduler')
  logger.log('Hello from scheduler')
})
