import React from 'react'
import { SafeAreaView, View } from 'react-native'

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className='flex-1 bg-neutral-100'>
      <View className='mb-24 flex-1 p-6'>{children}</View>
    </SafeAreaView>
  )
}

export default Container
