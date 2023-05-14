import React from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

const Login = () => {
  GoogleSignin.configure({
    webClientId:
      '575004097402-533d90dtph3r7cpk5j9mmj0fqj53m86s.apps.googleusercontent.com',
  })

  const onGoogleButtonPress = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn()

      const googleCredential = auth.GoogleAuthProvider.credential(idToken)

      return auth().signInWithCredential(googleCredential)
    } catch (error) {}
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 items-center justify-center p-4'>
        <Text className='font-js-mid text-xl'>Notify</Text>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />
      </View>
    </SafeAreaView>
  )
}

export default Login
