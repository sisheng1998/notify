export type CategoryWithoutId = Omit<Category, 'id'>

export interface Category extends AddCategory {
  id: string
  userId: string
  isTrashed: boolean
  createdAt: string
  updatedAt: string
}

export interface AddCategory {
  name: string
  color: number
}

export interface UpdateCategory {
  name?: string
  color?: number
  isTrashed?: boolean
  updatedAt: string
}
