import React, { useEffect, useState } from 'react'

import Container from '../components/Common/Container'
import { Category as CategoryType } from '../types/category'
import { getCategories } from '../apis/category'
import AddNewArea from '../components/Common/AddNewArea'
import AddCategory from '../components/Category/AddCategory'
import useBottomSheet from '../hooks/useBottomSheet'
import Search from '../components/Common/Search'
import CategoryCard from '../components/Category/CategoryCard'
import EditCategory from '../components/Category/EditCategory'
import ScrollableContainer from '../components/Common/ScrollableContainer'

const Category = () => {
  const { handleOpenBottomSheet, setBottomSheetContent } = useBottomSheet()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [resetScroll, setResetScroll] = useState<boolean>(false)

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

  const handleEditCategory = (category: CategoryType) => {
    setBottomSheetContent(<EditCategory category={category} />)
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
      <ScrollableContainer
        resetScroll={resetScroll}
        setResetScroll={setResetScroll}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            handleEditCategory={handleEditCategory}
          />
        ))}

        <AddNewArea text='New Category' onPress={handleAddNewCategory} />
      </ScrollableContainer>
    </Container>
  )
}

export default Category
