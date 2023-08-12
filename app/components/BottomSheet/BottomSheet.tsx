import React, { useCallback, forwardRef, useImperativeHandle } from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import Constants from 'expo-constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Easing,
  WithTimingConfig,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const { height: WINDOW_SCREEN_HEIGHT } = Dimensions.get('window')
const SCREEN_HEIGHT =
  WINDOW_SCREEN_HEIGHT + (Platform.OS === 'ios' ? 0 : Constants.statusBarHeight)

type BottomSheetProps = {
  setBottomSheetContent: React.Dispatch<React.SetStateAction<React.ReactNode>>
  children?: React.ReactNode
}

export type BottomSheetRefProps = {
  scrollTo: (position: number) => void
  isActive: () => boolean
}

const BottomSheet = forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ setBottomSheetContent, children }, ref) => {
    const { top, bottom } = useSafeAreaInsets()
    const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + top

    const translateY = useSharedValue(0)
    const active = useSharedValue(false)
    const context = useSharedValue({ y: 0 })

    const animationConfig: WithTimingConfig = {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }

    const scrollTo = useCallback((position: number) => {
      active.value = position !== 0
      translateY.value = withTiming(
        position,
        animationConfig,
        () => position === 0 && runOnJS(setBottomSheetContent)(null)
      )
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

    const bottomSheetStyles = useAnimatedStyle(() => {
      const styles = {
        height: Math.abs(translateY.value),
        transform: [{ translateY: translateY.value }],
      }

      console.log() // Used to fix height not updating sometimes in Android

      return styles
    }, [])

    const backdropStyles = useAnimatedStyle(
      () => ({
        opacity: withTiming(active.value ? 0.5 : 0, animationConfig),
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

        <Animated.View
          className='absolute left-0 w-full rounded-3xl rounded-b-none bg-white'
          style={[
            {
              top: SCREEN_HEIGHT,
            },
            bottomSheetStyles,
          ]}
        >
          <GestureDetector gesture={gesture}>
            <View className='px-4 pb-2 pt-4'>
              <View className='h-1 w-20 self-center rounded-full bg-neutral-200' />
            </View>
          </GestureDetector>

          <KeyboardAvoidingView
            className='flex-1'
            behavior='padding'
            keyboardVerticalOffset={96}
          >
            {children}
            <View
              style={{
                height: bottom > 32 ? bottom : 32,
              }}
            />
          </KeyboardAvoidingView>
        </Animated.View>
      </>
    )
  }
)

export default BottomSheet
