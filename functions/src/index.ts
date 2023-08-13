import { logger } from 'firebase-functions'
import { onSchedule } from 'firebase-functions/v2/scheduler'
import * as admin from 'firebase-admin'

import {
  getNextPaymentDate,
  isOneOrTwoWeeksBefore,
  sendNotification,
  formatAmount,
} from './utils'

admin.initializeApp()

// Everyday 9 am
exports.scheduler = onSchedule('0 9 * * *', async () => {
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
        'Premium Payment Due Soon',
        `Policy #${policyNo} (${name}) ${formatAmount(
          amount
        )} due on ${paymentDueDate}.`
      )

      logger.log(result)
    }
  }
})
