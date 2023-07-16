export const periods = [
  'Monthly',
  'Quarterly',
  'Half Yearly',
  'Yearly',
] as const

export type Period = (typeof periods)[number]

export type PolicyWithoutId = Omit<Policy, 'id'>

export interface Policy extends AddPolicy {
  id: string
  userId: string
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
  inforceDate: string
  period: Period
  getNotified: boolean
}

export interface EditPolicy {
  categoryId?: string
  name?: string
  policyNo?: string
  amount?: string
  plan?: string
  inforceDate?: string
  period?: Period
  getNotified?: boolean
  isTrashed?: boolean
  updatedAt?: string
}
