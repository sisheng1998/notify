import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

import AppLogo from '../icons/Logo'

const Logo = ({
  onPress,
  colored = false,
}: {
  onPress: () => void
  colored?: boolean
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View className='flex-row items-center space-x-2'>
        <AppLogo className='h-7 w-7' colored={colored} />
        <Text
          className={`font-js-mid text-base ${
            colored ? 'text-neutral-900' : 'text-white'
          }`}
        >
          Notify
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Logo
