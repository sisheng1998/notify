import auth from '@react-native-firebase/auth'

export const getUserId = () => {
  const user = auth().currentUser
  return user ? user.uid : ''
}
