import { View, Text } from 'react-native'
import React from 'react'

const Title = ({ text, number = -1 }: { text: string; number?: number }) => (
  <View className='mb-3 flex-row items-baseline justify-between'>
    <Text className='font-js-mid text-neutral-700'>{text}</Text>

    {number !== -1 && (
      <Text className='font-js text-xs text-neutral-500'>
        {number} Result{number > 1 ? 's' : ''}
      </Text>
    )}
  </View>
)

export default Title
