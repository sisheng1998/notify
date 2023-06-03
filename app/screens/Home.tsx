import React from 'react'
import { Text, Button } from 'react-native'
import auth from '@react-native-firebase/auth'
import Container from '../components/Container'

const Home = () => {
  return (
    <Container>
      <Text className='font-js-mid text-base text-primary'>
        Open up App.js to start working on your app!
      </Text>
      <Text className='font-js'>
        Open up App.js to start working on your app!
      </Text>
      <Button
        title='Sign Out'
        onPress={() =>
          auth()
            .signOut()
            .then(() => console.log('User signed out!'))
        }
      />
    </Container>
  )
}

export default Home
