import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

import PlusIcon from '../../icons/Plus'

const AddNewArea = ({
  text,
  onPress,
}: {
  text: string
  onPress: () => void
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View className='flex-row items-center justify-center space-x-0.5 rounded-lg border border-dashed border-primary bg-primary/5 p-4'>
      <PlusIcon className='h-5 w-5 text-primary' />
      <Text className='font-js-mid text-primary'>{text}</Text>
    </View>
  </TouchableWithoutFeedback>
)

export default AddNewArea
