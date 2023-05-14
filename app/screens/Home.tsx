import React from 'react'
import { Text, SafeAreaView, Button } from 'react-native'
import auth from '@react-native-firebase/auth'

const Home = () => {
  return (
    <SafeAreaView>
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
    </SafeAreaView>
  )
}

export default Home
