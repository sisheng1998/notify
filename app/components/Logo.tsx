import React from 'react'
import { View, Text } from 'react-native'

import AppLogo from '../icons/Logo'

const Logo = () => {
  return (
    <View className='flex-row items-center justify-center space-x-2'>
      <AppLogo className='h-6 w-6' />
      <Text className='font-js-mid text-base text-neutral-900'>Notify</Text>
    </View>
  )
}

export default Logo
