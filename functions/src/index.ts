const functions = require('firebase-functions')
import { logger } from 'firebase-functions'
import admin from 'firebase-admin'

import { getNextPaymentDate, isOneOrTwoWeeksBefore } from './utils/dueDate'
import { formatAmount } from './utils/formatAmount'
import { sendNotification } from './utils/notification'

admin.initializeApp()

// Everyday 9 am
exports.sendNotifications = functions
  .region('asia-southeast1')
  .pubsub.schedule('0 9 * * *')
  .timeZone('Asia/Kuala_Lumpur')
  .onRun(async () => {
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
