import React from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast, { ToastConfig, BaseToastProps } from 'react-native-toast-message'

import CheckCircleIcon from '../../icons/CheckCircle'
import RemoveCircleIcon from '../../icons/RemoveCircle'

const ToastProvider = () => {
  const { top } = useSafeAreaInsets()

  const config: ToastConfig = {
    success: ({ text1 }: BaseToastProps) => (
      <ToastMessage title={text1} isSuccess />
    ),
    error: ({ text1 }: BaseToastProps) => <ToastMessage title={text1} />,
  }

  return <Toast config={config} topOffset={top} visibilityTime={3000} />
}

const ToastMessage = ({
  title,
  isSuccess = false,
}: {
  title: string | undefined
  isSuccess?: boolean
}) => (
  <View className='mx-6 mt-1.5 flex-row items-center space-x-1.5 rounded-lg bg-white px-3 py-2.5 shadow-lg'>
    {isSuccess ? (
      <CheckCircleIcon className='h-5 w-5 text-green-600' />
    ) : (
      <RemoveCircleIcon className='h-5 w-5 text-red-600' />
    )}

    <Text
      className={`mr-1 font-js-mid text-xs ${
        isSuccess ? 'text-green-600' : 'text-red-600'
      }`}
    >
      {title ? title : ''}
    </Text>
  </View>
)

export default ToastProvider
