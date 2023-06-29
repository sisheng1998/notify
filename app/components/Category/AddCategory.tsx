import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'

import Button from '../Button'
import CloseIcon from '../../icons/Close'
import useBottomSheet from '../../hooks/useBottomSheet'
import { TextField, ColorField, TagPreviewField } from '../FormComponent'

const AddCategory = () => {
  const { handleOpenBottomSheet } = useBottomSheet()

  const [name, setName] = useState<string>('')
  const [color, setColor] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <View className='flex-1 px-6'>
      <View className='flex-row items-start justify-between space-x-2'>
        <Text className='font-js-mid text-lg text-neutral-900'>
          Add New Category
        </Text>

        <CloseIcon
          className='-mr-1 h-6 w-6 text-neutral-400'
          onPress={handleOpenBottomSheet}
        />
      </View>

      <View className='my-4 h-px bg-neutral-200' />

      <ScrollView className='flex-1'>
        <TextField
          label='Name'
          placeholder='e.g. Life Insurance'
          value={name}
          setValue={setName}
        />

        <View className='h-4' />

        <ColorField label='Color' value={color} setValue={setColor} />

        <View className='h-1' />

        <TagPreviewField text={name} colorIndex={color} />
      </ScrollView>

      <View className='my-4 h-px bg-neutral-200' />

      <Button
        text='Add'
        onPress={() => {
          setIsLoading(true)
          setTimeout(() => {
            setIsLoading(false)
          }, 1000)
        }}
        disabled={name === ''}
        loading={isLoading}
      />
    </View>
  )
}

export default AddCategory
