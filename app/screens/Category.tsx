import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'

import Container from '../components/Container'
import { Category as CategoryType } from '../types/category'
import { getCategories } from '../apis/category'
import AddNewArea from '../components/AddNewArea'
import AddCategory from '../components/Category/AddCategory'
import useBottomSheet from '../hooks/useBottomSheet'
import Search from '../components/Search'

const Category = () => {
  const { handleOpenBottomSheet, setBottomSheetContent } = useBottomSheet()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    const subscriber = getCategories((categories: CategoryType[]) => {
      setCategories(categories)
      if (isLoading) setIsLoading(false)
    })

    return () => subscriber()
  }, [])

  const handleAddNewCategory = () => {
    setBottomSheetContent(<AddCategory />)
    handleOpenBottomSheet()
  }

  return (
    <Container
      header={
        <Search
          placeholder='Search by Name'
          value={searchQuery}
          setValue={setSearchQuery}
        />
      }
      isLoading={isLoading}
    >
      <AddNewArea text='New Category' onPress={handleAddNewCategory} />

      {categories.map((category) => (
        <Text key={category.id}>{category.name}</Text>
      ))}
    </Container>
  )
}

export default Category
