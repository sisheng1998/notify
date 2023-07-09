import React from 'react'
import { View, Text } from 'react-native'

import InfoIcon from '../../icons/Info'

const InfoMessage = ({ text }: { text: string }) => (
  <View className='mb-2 flex-row items-center justify-center space-x-1.5 rounded-lg border border-primary bg-primary/5 p-4'>
    <InfoIcon className='h-5 w-5 text-primary' />
    <Text className='font-js-mid text-primary'>{text}</Text>
  </View>
)

export default InfoMessage
