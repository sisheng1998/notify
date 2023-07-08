import React, { useState } from 'react'
import { View, Text } from 'react-native'

import Button, { IconButton } from '../Common/Button'
import { TextField, ColorField, TagPreviewField } from '../Common/Form'
import ScrollableContainer from '../Common/ScrollableContainer'
import useBottomSheet from '../../hooks/useBottomSheet'
import useToast from '../../hooks/useToast'
import { addCategory, editCategory, deleteCategory } from '../../apis/category'
import { Category } from '../../types/category'
import { Action } from '../../types/action'

const CategoryContent = ({
  category,
  action,
}: {
  category?: Category
  action: Action
}) => {
  const toast = useToast()

  const { handleOpenBottomSheet } = useBottomSheet()

  const [name, setName] = useState<string>(category ? category.name : '')
  const [color, setColor] = useState<number>(category ? category.color : 0)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isTrashLoading, setIsTrashLoading] = useState<boolean>(false)

  const handleAddCategory = async () => {
    setIsLoading(true)

    try {
      await addCategory({
        name,
        color,
      })
      handleOpenBottomSheet()
      toast('New category added!', true)
    } catch (error) {
      toast('Failed to add new category!', false)
    }

    setIsLoading(false)
  }

  const handleEditCategory = async () => {
    if (!category) return

    setIsLoading(true)

    try {
      await editCategory(category.id, {
        name,
        color,
      })
      handleOpenBottomSheet()
      toast('Category updated!', true)
    } catch (error) {
      toast('Failed to update category!', false)
    }

    setIsLoading(false)
  }

  const handleDeleteCategory = async () => {
    if (!category) return

    setIsTrashLoading(true)

    try {
      await deleteCategory(category.id)
      handleOpenBottomSheet()
      toast('Category deleted!', true)
    } catch (error) {
      toast('Failed to delete category!', false)
    }

    setIsTrashLoading(false)
  }

  const content = {
    title: '',
    readOnly: false,
    showDeleteIcon: false,
    deleteIconAction: () => {},
    buttonText: '',
    buttonAction: () => {},
    buttonDisabled: false,
    showXIcon: false,
  }

  switch (action) {
    case 'ADD':
      content.title = 'New Category'
      content.readOnly = false
      content.showDeleteIcon = false
      content.deleteIconAction = () => {}
      content.buttonText = 'Add'
      content.buttonAction = handleAddCategory
      content.buttonDisabled = name === ''
      content.showXIcon = true
      break

    case 'EDIT':
      content.title = 'Edit Category'
      content.readOnly = false
      content.showDeleteIcon = true
      content.deleteIconAction = handleDeleteCategory
      content.buttonText = 'Update'
      content.buttonAction = handleEditCategory
      content.buttonDisabled =
        name === '' ||
        (category !== undefined &&
          name === category.name &&
          color === category.color)
      content.showXIcon = true
      break

    default: // VIEW
      content.title = 'Category'
      content.readOnly = true
      content.showDeleteIcon = false
      content.deleteIconAction = () => {}
      content.buttonText = 'Close'
      content.buttonAction = handleOpenBottomSheet
      content.buttonDisabled = false
      content.showXIcon = false
      break
  }

  return (
    <View className='flex-1 px-6'>
      <Text className='mb-3 font-js-mid text-lg text-neutral-900'>
        {content.title}
      </Text>

      <ScrollableContainer>
        <TextField
          label='Name'
          placeholder='e.g. Life Insurance'
          value={name}
          setValue={setName}
          required
          readOnly={content.readOnly}
        />

        <View className='h-4' />

        <ColorField
          label='Color'
          value={color}
          setValue={setColor}
          required
          readOnly={content.readOnly}
        />

        <View className='h-1' />

        <TagPreviewField text={name} colorIndex={color} />
      </ScrollableContainer>

      <View className='my-4 h-px bg-neutral-200' />

      <View className='flex-row items-center justify-between'>
        {content.showDeleteIcon && (
          <>
            <IconButton
              type='delete'
              onPress={content.deleteIconAction}
              loading={isTrashLoading}
            />

            <View className='w-3' />
          </>
        )}

        <Button
          text={content.buttonText}
          onPress={content.buttonAction}
          fullWidth
          disabled={content.buttonDisabled}
          loading={isLoading}
        />

        {content.showXIcon && (
          <>
            <View className='w-3' />

            <IconButton type='cancel' onPress={handleOpenBottomSheet} />
          </>
        )}
      </View>
    </View>
  )
}

export default CategoryContent
