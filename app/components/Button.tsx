import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const Button = ({
  text,
  icon,
  onPress,
}: {
  text: string
  icon?: React.ReactNode
  onPress: () => void
}) => {
  return (
    <TouchableOpacity
      className='flex-row items-center justify-center space-x-2 rounded-full bg-primary px-9 py-3 shadow shadow-primary/25'
      onPress={onPress}
    >
      {icon}
      <Text className='font-js-mid text-base text-white'>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button
