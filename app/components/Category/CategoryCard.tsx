import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

import { Category } from '../../types/category'
import { getColor } from '../../hooks/useColors'
import EditIcon from '../../icons/Edit'
import { Action } from '../../types/action'

const CategoryCard = ({
  category,
  handleCategoryAction,
}: {
  category: Category
  handleCategoryAction: (category: Category, action: Action) => void
}) => {
  const color = getColor(category.color)

  return (
    <TouchableWithoutFeedback
      onPress={() => handleCategoryAction(category, 'VIEW')}
    >
      <View
        className='mb-2 flex-row items-start justify-between rounded-lg border'
        style={{
          backgroundColor: color.background,
          borderColor: color.text,
        }}
      >
        <Text
          className='flex-1 self-center p-4 font-js-mid capitalize leading-none'
          style={{ color: color.text }}
        >
          {category.name}
        </Text>

        <TouchableWithoutFeedback
          onPress={(e) => {
            e.stopPropagation()
            handleCategoryAction(category, 'EDIT')
          }}
        >
          <View className='p-4'>
            <EditIcon className='-mr-0.5 h-5 w-5' color={color.text} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default CategoryCard
