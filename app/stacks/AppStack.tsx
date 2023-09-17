import React from 'react'
import { Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '@react-navigation/native'

import Home from '../screens/Home'
import Category from '../screens/Category'
import Trash from '../screens/Trash'
import Profile from '../screens/Profile'

import HomeIcon from '../icons/Home'
import CategoryIcon from '../icons/Category'
import TrashIcon from '../icons/Trash'
import ProfileIcon from '../icons/Profile'

import Header from '../components/Header'

type TabList = {
  Home: undefined
  Category: undefined
  Trash: undefined
  Profile: undefined
}

const Tab = createBottomTabNavigator<TabList>()

const AppStack = () => {
  const { colors, fonts } = useTheme()

  return (
    <>
      <StatusBar style='light' backgroundColor='transparent' translucent />

      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{
          header: (props) => <Header {...props} />,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.border,
          tabBarStyle: {
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 32 : 16,
            marginHorizontal: 16,
            height: 64,
            paddingTop: 8,
            paddingHorizontal: 8,
            paddingBottom: 10,
            borderRadius: 8,
            backgroundColor: 'white',
            shadowColor: Platform.OS === 'ios' ? 'black' : 'rgba(0, 0, 0, 0.2)',
            shadowOpacity: 0.05,
            shadowOffset: {
              width: 8,
              height: 8,
            },
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            fontFamily: fonts.heading,
          },
        }}
      >
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <HomeIcon color={color} width={size} height={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Category'
          component={Category}
          options={{
            tabBarIcon: ({ color, size }) => (
              <CategoryIcon color={color} width={size} height={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Trash'
          component={Trash}
          options={{
            tabBarIcon: ({ color, size }) => (
              <TrashIcon color={color} width={size} height={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Profile'
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <ProfileIcon color={color} width={size} height={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  )
}

export default AppStack
