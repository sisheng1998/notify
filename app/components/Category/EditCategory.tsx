import React, { useState } from 'react'
import { View, Text } from 'react-native'

import Button, { IconButton } from '../Common/Button'
import useBottomSheet from '../../hooks/useBottomSheet'
import { TextField, ColorField, TagPreviewField } from '../Common/Form'
import useToast from '../../hooks/useToast'
import { editCategory, trashCategory } from '../../apis/category'
import { Category } from '../../types/category'
import ScrollableContainer from '../Common/ScrollableContainer'

const EditCategory = ({ category }: { category: Category }) => {
  const toast = useToast()

  const { handleOpenBottomSheet } = useBottomSheet()

  const [name, setName] = useState<string>(category.name)
  const [color, setColor] = useState<number>(category.color)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isTrashLoading, setIsTrashLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
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

  const handleTrash = async () => {
    setIsTrashLoading(true)

    try {
      await trashCategory(category.id)
      handleOpenBottomSheet()
      toast('Category moved to trash!', true)
    } catch (error) {
      toast('Failed to move category to trash!', false)
    }

    setIsTrashLoading(false)
  }

  return (
    <View className='flex-1 px-6'>
      <Text className='mb-3 font-js-mid text-lg text-neutral-900'>
        Category
      </Text>

      <ScrollableContainer>
        <TextField
          label='Name'
          placeholder='e.g. Life Insurance'
          value={name}
          setValue={setName}
          required
        />

        <View className='h-4' />

        <ColorField label='Color' value={color} setValue={setColor} required />

        <View className='h-1' />

        <TagPreviewField text={name} colorIndex={color} />
      </ScrollableContainer>

      <View className='my-4 h-px bg-neutral-200' />

      <View className='flex-row items-center justify-between'>
        <IconButton
          type='delete'
          onPress={handleTrash}
          loading={isTrashLoading}
        />

        <View className='w-3' />

        <Button
          text='Update'
          onPress={handleSubmit}
          fullWidth
          disabled={
            name === '' || (name === category.name && color === category.color)
          }
          loading={isLoading}
        />

        <View className='w-3' />

        <IconButton type='cancel' onPress={handleOpenBottomSheet} />
      </View>
    </View>
  )
}

export default EditCategory
