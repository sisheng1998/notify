import React, { useCallback, useEffect } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'expo-dev-client'
import 'react-native-gesture-handler'

import { THEME } from './app/constants/theme'

import AuthStack from './app/stacks/AuthStack'
import AppStack from './app/stacks/AppStack'
import useAuth from './app/hooks/useAuth'
import ToastProvider from './app/components/Toast/ToastProvider'
import { BottomSheetProvider } from './app/components/BottomSheet/BottomSheetProvider'
import { CategoryProvider } from './app/components/Category/CategoryProvider'
import {
  requestFCMPermission,
  subscribeNotifeeEvent,
  subscribeOnMessage,
} from './app/apis/fcm'

const App = () => {
  const isLoggedIn = useAuth()

  useEffect(() => {
    if (!isLoggedIn) return

    requestFCMPermission()
    const onMessage = subscribeOnMessage()
    const notifeeEvent = subscribeNotifeeEvent()

    return () => {
      onMessage()
      notifeeEvent()
    }
  }, [isLoggedIn])

  const [isFontsLoaded] = useFonts({
    js: require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'js-mid': require('./assets/fonts/PlusJakartaSans-Medium.ttf'),
  })

  const onReady = useCallback(async () => {
    if (isFontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [isFontsLoaded])

  if (!isFontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView className='flex-1'>
      <SafeAreaProvider>
        <NavigationContainer theme={THEME} onReady={onReady}>
          {isLoggedIn ? (
            <CategoryProvider>
              <BottomSheetProvider>
                <AppStack />
              </BottomSheetProvider>
            </CategoryProvider>
          ) : (
            <AuthStack />
          )}
        </NavigationContainer>

        <ToastProvider />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default App
