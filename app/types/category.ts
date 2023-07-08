export type CategoryWithoutId = Omit<Category, 'id'>

export interface Category extends AddCategory {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface AddCategory {
  name: string
  color: number
}

export interface EditCategory {
  name?: string
  color?: number
  updatedAt?: string
}
