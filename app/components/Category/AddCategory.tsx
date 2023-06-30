import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'

import Button, { IconButton } from '../Button'
import useBottomSheet from '../../hooks/useBottomSheet'
import { TextField, ColorField, TagPreviewField } from '../FormComponent'

const AddCategory = () => {
  const { handleOpenBottomSheet } = useBottomSheet()

  const [name, setName] = useState<string>('')
  const [color, setColor] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <View className='flex-1 px-6'>
      <Text className='mb-3 font-js-mid text-lg text-neutral-900'>
        New Category
      </Text>

      <ScrollView className='flex-1'>
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
      </ScrollView>

      <View className='my-4 h-px bg-neutral-200' />

      <View className='flex-row items-center justify-between'>
        <Button
          text='Create'
          onPress={() => {
            setIsLoading(true)
            setTimeout(() => {
              setIsLoading(false)
            }, 1000)
          }}
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
