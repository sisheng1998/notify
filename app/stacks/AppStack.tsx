import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/Home'

type StackList = {
  Home: undefined
}

const Stack = createNativeStackNavigator<StackList>()

const AppStack = () => {
  return (
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
  )
}

export default AppStack
