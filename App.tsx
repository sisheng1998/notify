import React, { useCallback } from 'react'
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

const App = () => {
  const isLoggedIn = useAuth()

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
          <BottomSheetProvider>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
          </BottomSheetProvider>
        </NavigationContainer>

        <ToastProvider />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default App
