import React, { createContext, useEffect, useState, ReactNode } from 'react'

import { Category } from '../../types/category'
import { getCategories } from '../../apis/category'

type CategoryContextProps = {
  categories: Category[]
  isLoading: boolean
}

const CategoryContext = createContext<CategoryContextProps>({
  categories: [],
  isLoading: true,
})

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const subscriber = getCategories((categories: Category[]) => {
      setCategories(categories)
      if (isLoading) setIsLoading(false)
    })

    return () => subscriber()
  }, [])

  return (
    <CategoryContext.Provider
      value={{
        categories,
        isLoading,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContext
