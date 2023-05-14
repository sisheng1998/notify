import React, { useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './app/screens/Home'

type StackList = {
  Home: undefined
}

const Stack = createNativeStackNavigator<StackList>()

const App = () => {
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
    <NavigationContainer onReady={onReady}>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontFamily: 'js-mid',
          },
        }}
        initialRouteName='Home'
      >
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
