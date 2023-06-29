import React from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

import Logo from '../icons/Logo'
import useToast from '../hooks/useToast'

const Login = () => {
  const toast = useToast()

  GoogleSignin.configure({
    webClientId:
      '575004097402-533d90dtph3r7cpk5j9mmj0fqj53m86s.apps.googleusercontent.com',
  })

  const onGoogleButtonPress = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn()

      const googleCredential = auth.GoogleAuthProvider.credential(idToken)

      return auth()
        .signInWithCredential(googleCredential)
        .then(() => toast('Signed in successfully!', true))
        .catch(() => toast('Sign in failed!', false))
    } catch (error) {
      toast('Sign in failed!', false)
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 items-center justify-center p-4'>
        <Logo className='h-14 w-14' colored />

        <View className='my-6 space-y-1'>
          <Text className='text-center font-js-mid text-2xl text-neutral-900'>
            Welcome to Notify!
          </Text>

          <Text className='text-center font-js text-neutral-500'>
            Sign in with your google account to continue.
          </Text>
        </View>

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
