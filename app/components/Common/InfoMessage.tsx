import React from 'react'
import { View, Text } from 'react-native'

import InfoIcon from '../../icons/Info'

const InfoMessage = ({ text }: { text: string }) => (
  <View className='mb-3 flex-row items-center justify-start space-x-1.5 rounded-lg bg-primary/5 px-4 py-3'>
    <InfoIcon className='h-5 w-5 text-primary' />
    <Text className='font-js-mid text-primary'>{text}</Text>
  </View>
)

export default InfoMessage
