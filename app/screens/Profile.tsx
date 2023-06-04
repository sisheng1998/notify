import React from 'react'
import { Text } from 'react-native'
import auth from '@react-native-firebase/auth'
import Container from '../components/Container'
import Loading from '../components/Loading'

const Profile = () => {
  const user = auth().currentUser

  return (
    <Container>
      {!user ? <Loading /> : <Text className='font-js'>hello</Text>}
    </Container>
  )
}

export default Profile
