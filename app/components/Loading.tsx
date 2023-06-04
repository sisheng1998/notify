import React, { useRef, useEffect } from 'react'
import { View, Text, Animated, Easing } from 'react-native'

const startRotationAnimation = (
  durationMs: number,
  rotationDegree: Animated.Value
): void => {
  Animated.loop(
    Animated.timing(rotationDegree, {
      toValue: 360,
      duration: durationMs,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start()
}

const Loading = () => {
  const rotationDegree = useRef(new Animated.Value(0)).current

  useEffect(() => {
    startRotationAnimation(1000, rotationDegree)
    return () => rotationDegree.setValue(0)
  }, [rotationDegree])

  return (
    <View className='flex-1 items-center justify-center space-y-3'>
      <View className='h-14 w-14 shrink-0 items-center justify-center'>
        <View className='h-full w-full rounded-full border-[8px] border-primary opacity-25' />
        <Animated.View
          className='absolute left-0 top-0 h-full w-full rounded-full border-[8px] border-transparent border-t-primary'
          style={{
            transform: [
              {
                rotateZ: rotationDegree.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}
        />
      </View>

      <Text className='font-js text-neutral-500'>Loading...</Text>
    </View>
  )
}

export default Loading
