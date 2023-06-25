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
import PlusIcon from '../icons/Plus'
import SignOutIcon from '../icons/SignOut'
import useToast from '../hooks/useToast'
import useBottomSheet from '../hooks/useBottomSheet'

const Header = ({ route, navigation }: BottomTabHeaderProps) => {
  const { onPress } = useBottomSheet()

  let action = null

  switch (route.name) {
    case 'Category':
      action = <AddNewCategory onPress={() => onPress(<Text>Hello</Text>)} />
      break

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
    <View className='flex-row items-center space-x-0.5'>
      {icon}
      <Text className='font-js-mid text-white'>{text}</Text>
    </View>
  </TouchableWithoutFeedback>
)

const AddNewCategory = ({ onPress }: { onPress: () => void }) => {
  const toast = useToast()

  const handleAddNewCategory = () => {
    toast('Failed to add new category!', false)
  }

  return (
    <ActionContainer
      icon={<PlusIcon className='h-5 w-5 text-white' />}
      text='New Category'
      onPress={onPress}
    />
  )
}

const SignOut = () => {
  const handleSignOut = () => auth().signOut()

  return (
    <ActionContainer
      icon={<SignOutIcon className='mr-1 h-5 w-5 text-white' />}
      text='Sign Out'
      onPress={handleSignOut}
    />
  )
}

export default Header
