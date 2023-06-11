import React from 'react'
import {
  Text,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import auth from '@react-native-firebase/auth'

import Logo from './Logo'
import SignOutIcon from '../icons/SignOut'

const Header = ({ route, navigation }: BottomTabHeaderProps) => {
  let action = null

  switch (route.name) {
    case 'Profile':
      action = <SignOut />
      break

    default:
      break
  }

  return (
    <SafeAreaView className='bg-primary'>
      <View className='flex-row items-center justify-between px-6 py-3'>
        <Logo onPress={() => navigation.navigate('Home')} />

        {action}
      </View>
    </SafeAreaView>
  )
}

const ActionContainer = ({
  icon,
  text,
  onPress,
}: {
  icon: React.ReactNode
  text: string
  onPress: () => void
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View className='flex-row items-center space-x-1.5'>
      {icon}
      <Text className='font-js-mid text-white'>{text}</Text>
    </View>
  </TouchableWithoutFeedback>
)

const SignOut = () => {
  const handleSignOut = () => auth().signOut()

  return (
    <ActionContainer
      icon={<SignOutIcon className='h-5 w-5 text-white' />}
      text='Sign Out'
      onPress={handleSignOut}
    />
  )
}

export default Header
