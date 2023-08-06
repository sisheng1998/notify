export type TokenWithoutId = Omit<Token, 'id'>

export interface Token extends AddToken {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface AddToken {
  value: string
}

export interface UpdateToken {
  value?: string
  updatedAt?: string
}
