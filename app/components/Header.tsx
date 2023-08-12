import React, { useState } from 'react'
import {
  Text,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native'
import Constants from 'expo-constants'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import auth from '@react-native-firebase/auth'

import Logo from './Logo'
import PlusIcon from '../icons/Plus'
import TrashIcon from '../icons/Trash'
import SignOutIcon from '../icons/SignOut'
import useToast from '../hooks/useToast'
import useBottomSheet from '../hooks/useBottomSheet'
import CategoryContent from './Category/CategoryContent'
import ConfirmationModal from './Modal/ConfirmationModal'
import { deleteAllPoliciesInTrash } from '../apis/policy'
import PolicyContent from './Policy/PolicyContent'

const Header = ({ route, navigation }: BottomTabHeaderProps) => {
  let action = null

  switch (route.name) {
    case 'Home':
      action = <AddNewPolicy />
      break

    case 'Category':
      action = <AddNewCategory />
      break

    case 'Trash':
      action = <EmptyTrash />
      break

    case 'Profile':
      action = <SignOut />
      break

    default:
      break
  }

  return (
    <SafeAreaView
      className='bg-primary'
      style={{
        paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
      }}
    >
      <View className='flex-row items-center justify-between px-4 py-3'>
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
      <Text
        className='font-js-mid text-white'
        style={{
          ...Platform.select({
            android: {
              marginBottom: 3,
            },
          }),
        }}
      >
        {text}
      </Text>
    </View>
  </TouchableWithoutFeedback>
)

const AddNewPolicy = () => {
  const { handleOpenBottomSheet, setBottomSheetContent } = useBottomSheet()

  const handleAddNewPolicy = () => {
    setBottomSheetContent(<PolicyContent action='ADD' />)
    handleOpenBottomSheet()
  }

  return (
    <ActionContainer
      icon={<PlusIcon className='h-5 w-5 text-white' />}
      text='New Policy'
      onPress={handleAddNewPolicy}
    />
  )
}

const AddNewCategory = () => {
  const { handleOpenBottomSheet, setBottomSheetContent } = useBottomSheet()

  const handleAddNewCategory = () => {
    setBottomSheetContent(<CategoryContent action='ADD' />)
    handleOpenBottomSheet()
  }

  return (
    <ActionContainer
      icon={<PlusIcon className='h-5 w-5 text-white' />}
      text='New Category'
      onPress={handleAddNewCategory}
    />
  )
}

const EmptyTrash = () => {
  const toast = useToast()

  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleEmptyTrash = async () => {
    setIsLoading(true)

    try {
      await deleteAllPoliciesInTrash()
      setOpen(false)
      toast('Trash emptied!', true)
    } catch (error) {
      toast('Failed to empty trash!', false)
    }

    setIsLoading(false)
  }

  const handleOpenModal = () => setOpen(true)

  const handleCloseModal = () => (isLoading ? {} : setOpen(false))

  return (
    <>
      <ActionContainer
        icon={<TrashIcon className='mr-0.5 h-5 w-5 text-white' />}
        text='Empty Trash'
        onPress={handleOpenModal}
      />

      <ConfirmationModal
        open={open}
        handleClose={handleCloseModal}
        title='Confirm Empty Trash?'
        body='All policies in the trash will be deleted. This action is irreversible!'
        buttonText='Empty Trash'
        buttonAction={handleEmptyTrash}
        buttonLoading={isLoading}
      />
    </>
  )
}

const SignOut = () => {
  const toast = useToast()

  const handleSignOut = () =>
    auth()
      .signOut()
      .then(() => toast('Signed out successfully!', true))
      .catch(() => toast('Failed to sign out!', false))

  return (
    <ActionContainer
      icon={<SignOutIcon className='mr-1 h-5 w-5 text-white' />}
      text='Sign Out'
      onPress={handleSignOut}
    />
  )
}

export default Header
