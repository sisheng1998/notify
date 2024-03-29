export const paymentFrequencies = [
  'Monthly',
  'Quarterly',
  'Half Yearly',
  'Yearly',
] as const

export type PaymentFrequency = (typeof paymentFrequencies)[number]

export type OmittedPolicy = Omit<Policy, 'id' | 'paymentDueDate'>

export interface Policy extends AddPolicy {
  id: string
  userId: string
  paymentDueDate: string
  isTrashed: boolean
  createdAt: string
  updatedAt: string
}

export interface AddPolicy {
  categoryId: string
  name: string
  policyNo: string
  amount: string
  plan: string
  inForceDate: string
  paymentFrequency: PaymentFrequency
  getNotified: boolean
}

export interface EditPolicy {
  categoryId?: string
  name?: string
  policyNo?: string
  amount?: string
  plan?: string
  inForceDate?: string
  paymentFrequency?: PaymentFrequency
  getNotified?: boolean
  isTrashed?: boolean
  updatedAt?: string
}
