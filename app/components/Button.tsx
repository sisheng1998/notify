import React from 'react'
import { TouchableWithoutFeedback, View, Text } from 'react-native'
import LoadingIcon from '../icons/Loading'
import { LoadingIconContainer } from './Loading'

const Button = ({
  text,
  icon,
  onPress,
  disabled = false,
  loading = false,
}: {
  text: string
  icon?: React.ReactNode
  onPress: () => void
  disabled?: boolean
  loading?: boolean
}) => {
  const isDisabled = loading || disabled

  return (
    <TouchableWithoutFeedback onPress={isDisabled ? () => {} : onPress}>
      <View
        className={`flex-row items-center justify-center space-x-2 rounded-lg bg-primary px-9 py-3 shadow shadow-primary/25 ${
          isDisabled ? 'opacity-50' : 'opacity-100'
        }`}
      >
        {loading ? (
          <LoadingIconContainer>
            <LoadingIcon className='h-5 w-5 text-white' />
          </LoadingIconContainer>
        ) : (
          icon
        )}

        <Text className='font-js-mid text-base text-white'>
          {loading ? 'Loading...' : text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Button
