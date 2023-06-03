import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home'
import Category from '../screens/Category'
import AddRecord from '../screens/AddRecord'
import Trash from '../screens/Trash'
import Profile from '../screens/Profile'

import HomeIcon from '../icons/Home'
import CategoryIcon from '../icons/Category'
import PlusIcon from '../icons/Plus'
import TrashIcon from '../icons/Trash'
import ProfileIcon from '../icons/Profile'

type TabList = {
  Home: undefined
  Category: undefined
  AddRecord: undefined
  Trash: undefined
  Profile: undefined
}

const Tab = createBottomTabNavigator<TabList>()

const AppStack = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ED1C24',
        tabBarInactiveTintColor: '#A3A3A3',
        tabBarStyle: {
          position: 'absolute',
          bottom: 32,
          marginHorizontal: 24,
          height: 64,
          paddingTop: 8,
          paddingHorizontal: 8,
          paddingBottom: 10,
          borderRadius: 12,
          backgroundColor: 'white',
          shadowColor: 'black',
          shadowOpacity: 0.05,
          shadowOffset: {
            width: 8,
            height: 8,
          },
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontFamily: 'js-mid',
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
        name='AddRecord'
        component={AddRecord}
        options={{
          tabBarLabelStyle: {
            display: 'none',
          },
          tabBarIcon: () => (
            <View className='relative bottom-8 rounded-full bg-neutral-100 p-3'>
              <View className='rounded-full bg-primary p-3'>
                <PlusIcon color='white' width={32} height={32} />
              </View>
            </View>
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
  )
}

export default AppStack
