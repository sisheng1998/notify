import React from 'react'
import { SafeAreaView, View } from 'react-native'

import Loading from './Loading'

const Container = ({
  header,
  isLoading = false,
  children,
}: {
  header: React.ReactNode
  isLoading?: boolean
  children: React.ReactNode
}) => (
  <SafeAreaView className='flex-1 bg-neutral-100'>
    <View className='relative z-10 bg-primary px-4 pt-2'>
      <View className='-mb-6 h-12 rounded-lg bg-white shadow-sm'>{header}</View>
    </View>

    <View className='flex-1 overflow-hidden px-4 pb-12 pt-9'>
      {isLoading ? <Loading /> : children}
    </View>
  </SafeAreaView>
)

export default Container
