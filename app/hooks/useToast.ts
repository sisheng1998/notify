import Toast from 'react-native-toast-message'

const useToast = () => (message: string, isSuccess: boolean) =>
  Toast.show({
    type: isSuccess ? 'success' : 'error',
    text1: message,
  })

export default useToast
