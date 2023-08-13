import moment from 'moment'

const DATE_FORMAT = 'DD-MM-YYYY'

const paymentFrequencies = [
  'Monthly',
  'Quarterly',
  'Half Yearly',
  'Yearly',
] as const

type PaymentFrequency = (typeof paymentFrequencies)[number]

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

export const isOneOrTwoWeeksBefore = (date: string) => {
  const givenDate = moment(date, DATE_FORMAT).startOf('day')
  const today = moment().startOf('day')

  const difference = givenDate.diff(today, 'weeks')

  return difference === 1 || difference === 2
}
