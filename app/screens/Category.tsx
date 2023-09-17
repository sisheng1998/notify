import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import Container from '../components/Common/Container'
import { Category as CategoryType } from '../types/category'
import AddNewArea from '../components/Common/AddNewArea'
import CategoryContent from '../components/Category/CategoryContent'
import useBottomSheet from '../hooks/useBottomSheet'
import Search from '../components/Common/Search'
import CategoryCard from '../components/Category/CategoryCard'
import ScrollableContainer from '../components/Common/ScrollableContainer'
import InfoMessage from '../components/Common/InfoMessage'
import Title from '../components/Common/Title'
import useDebounce from '../hooks/useDebounce'
import { Action } from '../types/action'
import useCategory from '../hooks/useCategory'

const Category = () => {
  const { handleOpenBottomSheet, setBottomSheetContent } = useBottomSheet()

  const { isLoading, categories } = useCategory()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedValue = useDebounce<string>(searchQuery, 500)

  const [resetScroll, setResetScroll] = useState<boolean>(false)

  useEffect(() => {
    setResetScroll(true)
  }, [debouncedValue])

  const results =
    debouncedValue === ''
      ? categories
      : categories.filter((category) =>
          category.name.toLowerCase().includes(debouncedValue.toLowerCase())
        )

  const handleAddNewCategory = () => {
    setBottomSheetContent(<CategoryContent action='ADD' />)
    handleOpenBottomSheet()
  }

  const handleCategoryAction = (category: CategoryType, action: Action) => {
    setBottomSheetContent(
      <CategoryContent category={category} action={action} />
    )
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
      <Title text='Category' number={results.length} />

      <AddNewArea text='New Category' onPress={handleAddNewCategory} />

      <ScrollableContainer
        resetScroll={resetScroll}
        setResetScroll={setResetScroll}
      >
        {categories.length === 0 || results.length === 0 ? (
          <InfoMessage
            text={
              categories.length === 0
                ? 'No category yet.'
                : 'Category not found.'
            }
          />
        ) : (
          results.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              handleCategoryAction={handleCategoryAction}
            />
          ))
        )}

        <View className='h-12' />
      </ScrollableContainer>
    </Container>
  )
}

export default Category
