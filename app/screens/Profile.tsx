import React from 'react'
import { Text, View, Image } from 'react-native'
import auth from '@react-native-firebase/auth'
import moment from 'moment'

import Container from '../components/Container'
import Button from '../components/Button'
import CheckCircleIcon from '../icons/CheckCircle'
import RemoveCircleIcon from '../icons/RemoveCircle'
import SignOutIcon from '../icons/SignOut'
import ProfileIcon from '../icons/Profile'
import useToast from '../hooks/useToast'

const Profile = () => {
  const user = auth().currentUser
  const isLoading = user === null || user === undefined

  return (
    <Container header={<Header />} isLoading={isLoading}>
      {!isLoading && (
        <View>
          <Avatar uri={user.photoURL} name={user.displayName} />

          <PersonalInfo
            name={user.displayName}
            email={user.email}
            verified={user.emailVerified}
          />

          <MemberSince createdAt={user.metadata.creationTime} />

          <SignOutButton />
        </View>
      )}
    </Container>
  )
}

const Header = () => (
  <View className='flex-1 flex-row items-center justify-center space-x-2'>
    <ProfileIcon className='h-7 w-7 text-neutral-700' />
    <Text className='text-center font-js-mid text-base text-neutral-900'>
      Profile
    </Text>
  </View>
)

const Avatar = ({ uri, name }: { uri: string | null; name: string | null }) => {
  const getInitials = (name: string) => {
    let initials

    const nameSplit = name.split(' ')
    const nameLength = nameSplit.length

    if (nameLength > 1) {
      initials =
        nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1)
    } else if (nameLength === 1) {
      initials = nameSplit[0].substring(0, 1)
    } else return '-'

    return initials.toUpperCase()
  }

  return uri ? (
    <Image source={{ uri }} className='mx-auto h-24 w-24 rounded-full' />
  ) : (
    <View className='mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white'>
      <Text className='-mb-1 text-center font-js-mid text-4xl leading-none text-neutral-700'>
        {getInitials(name ? name : '-')}
      </Text>
    </View>
  )
}

const PersonalInfo = ({
  name,
  email,
  verified,
}: {
  name: string | null
  email: string | null
  verified: boolean
}) => (
  <View className='mt-3 space-y-1'>
    <Text className='text-center font-js-mid text-xl text-neutral-900'>
      {name ? name : '-'}
    </Text>

    <Text className='mb-1 text-center font-js text-neutral-500'>
      {email ? email : '-'}
    </Text>

    <View className='flex-row items-center justify-center space-x-1'>
      {verified ? (
        <CheckCircleIcon className='h-4 w-4 text-green-600' />
      ) : (
        <RemoveCircleIcon className='h-4 w-4 text-red-600' />
      )}

      <Text
        className={`text-center font-js text-xs ${
          verified ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {verified ? 'Email Verified' : 'Email Not Verified'}
      </Text>
    </View>
  </View>
)

const DATE_FORMAT = 'DD-MM-YYYY'

const MemberSince = ({ createdAt }: { createdAt?: string }) => {
  const today = moment()
  const creationDate = createdAt ? moment(createdAt) : today
  const noOfDays = today.diff(creationDate, 'days')

  return (
    <View className='mt-6'>
      <Text className='mb-0.5 text-center font-js text-xs text-neutral-500'>
        Member Since:
      </Text>
      <Text className='mb-0.5 text-center font-js-mid text-base text-neutral-900'>
        {creationDate.format(DATE_FORMAT)}
      </Text>
      <Text className='text-center font-js text-xs text-neutral-500'>
        - Total {noOfDays} Day{noOfDays > 1 ? 's' : ''} -
      </Text>
    </View>
  )
}

const SignOutButton = () => {
  const toast = useToast()

  const handleSignOut = () =>
    auth()
      .signOut()
      .then(() => toast('Signed out successfully!', true))
      .catch(() => toast('Failed to sign out!', false))

  return (
    <View className='mt-6 items-center justify-center'>
      <Button
        text='Sign Out'
        icon={<SignOutIcon className='h-5 w-5 text-white' />}
        onPress={handleSignOut}
      />
    </View>
  )
}

export default Profile
