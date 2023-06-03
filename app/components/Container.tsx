import React from 'react'
import { SafeAreaView } from 'react-native'

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className='flex-1 bg-neutral-100'>{children}</SafeAreaView>
  )
}

export default Container
