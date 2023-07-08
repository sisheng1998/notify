import React, { useRef, useEffect, ReactNode } from 'react'
import { View, Text, Animated, Easing } from 'react-native'

import LoadingIcon from '../../icons/Loading'

const Loading = () => (
  <View className='mb-8 flex-1 items-center justify-center space-y-0.5'>
    <LoadingIconContainer>
      <LoadingIcon className='h-16 w-16 text-primary opacity-75' />
    </LoadingIconContainer>

    <Text className='font-js-mid text-sm text-neutral-500'>Loading...</Text>
  </View>
)

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

export const LoadingIconContainer = ({ children }: { children: ReactNode }) => {
  const rotationDegree = useRef(new Animated.Value(0)).current

  useEffect(() => {
    startRotationAnimation(1000, rotationDegree)
    return () => rotationDegree.setValue(0)
  }, [rotationDegree])

  return (
    <Animated.View
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
    >
      {children}
    </Animated.View>
  )
}

export default Loading
