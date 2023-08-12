import React, { ReactNode } from 'react'
import { TouchableWithoutFeedback, View, Text, Platform } from 'react-native'

import { LoadingIconContainer } from './Loading'
import LoadingIcon from '../../icons/Loading'
import CloseIcon from '../../icons/Close'
import TrashIcon from '../../icons/Trash'

const Button = ({
  text,
  icon,
  onPress,
  fullWidth = false,
  disabled = false,
  loading = false,
}: {
  text: string
  icon?: ReactNode
  onPress: () => void
  fullWidth?: boolean
  disabled?: boolean
  loading?: boolean
}) => {
  const isDisabled = loading || disabled

  return (
    <TouchableWithoutFeedback onPress={isDisabled ? () => {} : onPress}>
      <View
        className={`flex-row items-center justify-center space-x-2 rounded-lg bg-primary px-9 py-3 shadow shadow-primary/25 ${
          isDisabled ? 'opacity-50' : 'opacity-100'
        }${fullWidth ? ' flex-1' : ''}`}
      >
        {loading ? (
          <LoadingIconContainer>
            <LoadingIcon className='h-5 w-5 text-white' />
          </LoadingIconContainer>
        ) : (
          icon
        )}

        <Text
          className='font-js-mid text-base text-white'
          style={{
            ...Platform.select({
              android: {
                marginBottom: 3,
              },
            }),
          }}
        >
          {loading ? 'Loading...' : text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Button

type ButtonType = 'cancel' | 'delete'

export const IconButton = ({
  type,
  onPress,
  disabled = false,
  loading = false,
}: {
  type: ButtonType
  onPress: () => void
  fullWidth?: boolean
  disabled?: boolean
  loading?: boolean
}) => {
  const isDisabled = loading || disabled

  return (
    <TouchableWithoutFeedback onPress={isDisabled ? () => {} : onPress}>
      <View
        className={`items-center justify-center rounded-lg bg-neutral-100 px-4 py-3.5 ${
          isDisabled ? 'opacity-50' : 'opacity-100'
        }`}
      >
        {loading ? (
          <LoadingIconContainer>
            <LoadingIcon className='h-5 w-5 text-neutral-600' />
          </LoadingIconContainer>
        ) : type === 'delete' ? (
          <TrashIcon className='h-5 w-5 text-neutral-600' />
        ) : (
          <CloseIcon className='h-5 w-5 text-neutral-600' />
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}
