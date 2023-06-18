import React, { useEffect, useRef } from 'react'
import { SafeAreaView, View, ScrollView } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

const Container = ({
  header,
  isLoading = false,
  children,
}: {
  header: React.ReactNode
  isLoading?: boolean
  children: React.ReactNode
}) => {
  const isFocused = useIsFocused()

  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    if (isFocused) {
      scrollViewRef.current?.scrollTo({
        x: 0,
        y: 0,
        animated: true,
      })
    }
  }, [isFocused])

  return (
    <SafeAreaView className='flex-1 bg-neutral-100'>
      <View className='relative z-10 bg-primary px-6 pt-2'>
        <View className='-mb-6 h-12 rounded-lg bg-white shadow-lg'>
          {header}
        </View>
      </View>

      {isLoading ? (
        <View className='flex-1 p-6 pt-10'>{children}</View>
      ) : (
        <ScrollView ref={scrollViewRef} className='flex-1 p-6 pt-10'>
          {children}
          <View className='h-32' />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

export default Container
