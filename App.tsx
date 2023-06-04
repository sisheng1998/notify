import React, { useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import 'expo-dev-client'
import 'react-native-gesture-handler'

import { THEME } from './app/constants/theme'

import AuthStack from './app/stacks/AuthStack'
import AppStack from './app/stacks/AppStack'
import useAuth from './app/hooks/useAuth'

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
    <NavigationContainer theme={THEME} onReady={onReady}>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default App
