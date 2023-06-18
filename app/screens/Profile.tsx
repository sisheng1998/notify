import React from 'react'
import { Text, View, Image } from 'react-native'
import auth from '@react-native-firebase/auth'
import moment from 'moment'

import Container from '../components/Container'
import Loading from '../components/Loading'
import Button from '../components/Button'
import AvatarIcon from '../icons/Avatar'
import CheckCircleIcon from '../icons/CheckCircle'
import RemoveCircleIcon from '../icons/RemoveCircle'
import SignOutIcon from '../icons/SignOut'
import ProfileIcon from '../icons/Profile'

const Profile = () => {
  const user = auth().currentUser
  const isLoading = user === null || user === undefined

  return (
    <Container header={<Header />} isLoading={isLoading}>
      {isLoading ? (
        <Loading />
      ) : (
        <View className='mt-3'>
          <Avatar uri={user.photoURL} />

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

const Avatar = ({ uri }: { uri: string | null }) =>
  uri ? (
    <Image source={{ uri }} className='mx-auto h-24 w-24 rounded-full' />
  ) : (
    <AvatarIcon className='mx-auto h-24 w-24 scale-125 rounded-full text-neutral-400' />
  )

const PersonalInfo = ({
  name,
  email,
  verified,
}: {
  name: string | null
  email: string | null
  verified: boolean
}) => (
  <View className='mt-4 space-y-1'>
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
    <View className='mt-5'>
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
  const handleSignOut = () => auth().signOut()

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
