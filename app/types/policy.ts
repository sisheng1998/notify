export type PolicyWithoutId = Omit<Policy, 'id'>

export interface Policy extends AddPolicy {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface AddPolicy {
  categoryId: string
  name: string
  policyNo: string
  amount: number
  plan: string
  inForceDate: string
  period: number
  notification: boolean
  isTrashed: boolean
}

export interface EditPolicy {
  categoryId?: string
  name?: string
  policyNo?: string
  amount?: number
  plan?: string
  inForceDate?: string
  period?: number
  notification?: boolean
  isTrashed?: boolean
  updatedAt?: string
}
