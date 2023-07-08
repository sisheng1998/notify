import React, { useState } from 'react'
import { View, Text } from 'react-native'

import Button, { IconButton } from '../Button'
import useBottomSheet from '../../hooks/useBottomSheet'
import { TextField, ColorField, TagPreviewField } from '../FormComponent'
import useToast from '../../hooks/useToast'
import { addCategory } from '../../apis/category'
import ScrollableContainer from '../ScrollableContainer'

const AddCategory = () => {
  const toast = useToast()

  const { handleOpenBottomSheet } = useBottomSheet()

  const [name, setName] = useState<string>('')
  const [color, setColor] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
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

  return (
    <View className='flex-1 px-6'>
      <Text className='mb-3 font-js-mid text-lg text-neutral-900'>
        New Category
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
        <Button
          text='Add'
          onPress={handleSubmit}
          fullWidth
          disabled={name === ''}
          loading={isLoading}
        />

        <View className='w-3' />

        <IconButton type='cancel' onPress={handleOpenBottomSheet} />
      </View>
    </View>
  )
}

export default AddCategory
