import moment from 'moment'

import { DATE_FORMAT } from '../constants/time'
import { Policy } from '../types/policy'

export const sortByPaymentDueDate = (policies: Policy[]): Policy[] => {
  const currentMoment = moment()

  const compareDates = (policyA: Policy, policyB: Policy) => {
    const paymentDueDateA = moment(policyA.paymentDueDate, DATE_FORMAT)
    const paymentDueDateB = moment(policyB.paymentDueDate, DATE_FORMAT)

    const diffA = Math.abs(currentMoment.diff(paymentDueDateA, 'days'))
    const diffB = Math.abs(currentMoment.diff(paymentDueDateB, 'days'))

    return diffA - diffB
  }

  const sortedPolicies = policies.sort(compareDates)

  return sortedPolicies
}
