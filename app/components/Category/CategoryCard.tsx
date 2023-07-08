import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

import { Category } from '../../types/category'
import { getColor } from '../../hooks/useColors'
import EditIcon from '../../icons/Edit'

const CategoryCard = ({
  category,
  handleEditCategory,
}: {
  category: Category
  handleEditCategory: (category: Category) => void
}) => {
  const color = getColor(category.color)

  return (
    <TouchableWithoutFeedback onPress={() => handleEditCategory(category)}>
      <View
        className='mb-3 flex-row items-center justify-between space-x-2 rounded-lg border border-solid p-4 pr-3.5'
        style={{
          backgroundColor: color.background,
          borderColor: color.text,
        }}
      >
        <Text
          className='flex-1 font-js-mid capitalize leading-none'
          style={{ color: color.text }}
        >
          {category.name}
        </Text>

        <EditIcon className='h-5 w-5' color={color.text} />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default CategoryCard
