import React from 'react'
import { View, Text } from 'react-native'

import { getColor } from '../hooks/useColors'

const Tag = ({ text, colorIndex }: { text: string; colorIndex: number }) => {
  const color = getColor(colorIndex)

  return (
    <View
      className='self-start rounded-full px-4 py-1.5'
      style={{
        backgroundColor: color.background,
      }}
    >
      <Text
        className='font-js-mid capitalize leading-none'
        style={{ color: color.text }}
      >
        {text}
      </Text>
    </View>
  )
}

export default Tag
