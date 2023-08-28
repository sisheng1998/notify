import moment from 'moment'

import { DATE_FORMAT } from '../constants/time'
import { PaymentFrequency } from '../types/policy'

export const getNextPaymentDate = (
  inForceDate: string,
  paymentFrequency: PaymentFrequency
) => {
  const inForceDateObj = moment(inForceDate, DATE_FORMAT)

  const interval: moment.DurationInputArg2 = getInterval(paymentFrequency)

  const today = moment()
  const monthsPassed = today.diff(inForceDateObj, 'months')
  const numberOfPayments = Math.floor(
    monthsPassed / getFrequencyMultiplier(paymentFrequency)
  )

  const nextPaymentDate = inForceDateObj
    .add(numberOfPayments + 1, interval)
    .format(DATE_FORMAT)

  return nextPaymentDate
}

const getInterval = (paymentFrequency: PaymentFrequency) => {
  switch (paymentFrequency) {
    case 'Quarterly':
      return 'quarters'
    case 'Yearly':
      return 'years'
    default:
      // Monthly + Half Yearly
      return 'months'
  }
}

const getFrequencyMultiplier = (paymentFrequency: PaymentFrequency) => {
  switch (paymentFrequency) {
    case 'Quarterly':
      return 3
    case 'Half Yearly':
      return 6
    case 'Yearly':
      return 12
    default:
      // Monthly
      return 1
  }
}
