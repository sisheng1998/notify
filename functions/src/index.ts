import admin from 'firebase-admin'
import { logger } from 'firebase-functions'
const functions = require('firebase-functions')

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
    const db = admin.firestore()

    return db
      .collection('policies')
      .where('getNotified', '==', true)
      .where('isTrashed', '==', false)
      .get()
      .then((results) => {
        if (results.size > 0) {
          let promises: Promise<void>[] = []

          results.forEach((doc) => {
            const {
              inForceDate,
              paymentFrequency,
              amount,
              name,
              policyNo,
              userId,
            } = doc.data()

            const paymentDueDate = getNextPaymentDate(
              inForceDate,
              paymentFrequency
            )

            if (isOneOrTwoWeeksBefore(paymentDueDate)) {
              promises.push(
                sendNotification(
                  userId,
                  'Premium Payment Due Soon',
                  `Policy #${policyNo} (${name}) ${formatAmount(
                    amount
                  )} due on ${paymentDueDate}.`
                )
              )
            }
          })

          return promises.length !== 0
            ? Promise.all(promises)
                .then(() => {
                  logger.log('All notifications sent!')
                })
                .catch((error) => {
                  logger.log(`${error}`)
                })
            : logger.log('No notification need to be sent.')
        } else {
          return logger.log(`No policy need to be notified.`)
        }
      })
      .catch((error) => {
        logger.log(`${error}`)
      })
  })
