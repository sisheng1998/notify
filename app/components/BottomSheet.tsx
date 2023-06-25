import React, { useCallback, forwardRef, useImperativeHandle } from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

type BottomSheetProps = {
  children?: React.ReactNode
}

export type BottomSheetRefProps = {
  scrollTo: (position: number) => void
  isActive: () => boolean
}

const BottomSheet = forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children }, ref) => {
    const { top } = useSafeAreaInsets()
    const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + top

    const translateY = useSharedValue(0)
    const active = useSharedValue(false)
    const context = useSharedValue({ y: 0 })

    const scrollTo = useCallback((position: number) => {
      active.value = position !== 0
      translateY.value = withSpring(position, { damping: 50 })
    }, [])

    const isActive = useCallback(() => active.value, [])

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ])

    const gesture = Gesture.Pan()
      .runOnJS(true)
      .onStart(() => {
        context.value = { y: translateY.value }
      })
      .onUpdate((event) => {
        const newTranslateY = event.translationY + context.value.y
        translateY.value = Math.max(newTranslateY, MAX_TRANSLATE_Y)
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          scrollTo(0)
        }
      })

    const bottomSheetStyles = useAnimatedStyle(
      () => ({
        transform: [{ translateY: translateY.value }],
      }),
      []
    )

    const backdropStyles = useAnimatedStyle(
      () => ({
        opacity: withTiming(active.value ? 0.5 : 0),
      }),
      []
    )

    const backdropProps = useAnimatedProps(
      () =>
        ({
          pointerEvents: active.value ? 'auto' : 'none',
        } as any),
      []
    )

    return (
      <>
        <Animated.View
          className='bg-black'
          style={[StyleSheet.absoluteFillObject, backdropStyles]}
          animatedProps={backdropProps}
          onTouchStart={() => scrollTo(0)}
        />

        <GestureDetector gesture={gesture}>
          <Animated.View
            className='absolute left-0 w-full rounded-3xl bg-white'
            style={[
              {
                height: SCREEN_HEIGHT,
                top: SCREEN_HEIGHT,
              },
              bottomSheetStyles,
            ]}
          >
            <View className='my-4 h-1 w-20 self-center rounded-full bg-neutral-300' />
            <View className='flex-1 px-6 pb-4'>{children}</View>
          </Animated.View>
        </GestureDetector>
      </>
    )
  }
)

export default BottomSheet
