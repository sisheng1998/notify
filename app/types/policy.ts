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
  amount: number
  plan: string
  inforceDate: string
  period: number
  getNotified: boolean
}

export interface EditPolicy {
  categoryId?: string
  name?: string
  policyNo?: string
  amount?: number
  plan?: string
  inforceDate?: string
  period?: number
  getNotified?: boolean
  isTrashed?: boolean
  updatedAt?: string
}
