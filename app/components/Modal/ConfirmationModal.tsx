import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

import Button from '../Common/Button'
import Modal from './Modal'

const ConfirmationModal = ({
  open,
  handleClose,
  title,
  body,
  buttonText,
  buttonAction,
  buttonLoading,
}: {
  open: boolean
  handleClose: () => void
  title: string
  body: string
  buttonText: string
  buttonAction: () => void
  buttonLoading: boolean
}) => (
  <Modal open={open} handleClose={handleClose}>
    <Text className='mb-2 font-js-mid text-lg text-neutral-900'>{title}</Text>

    <Text className='font-js text-neutral-500'>{body}</Text>

    <View className='mt-16 flex-row items-center justify-end'>
      {!buttonLoading && (
        <TouchableWithoutFeedback onPress={handleClose}>
          <View className='mr-6'>
            <Text className='font-js text-neutral-700'>Cancel</Text>
          </View>
        </TouchableWithoutFeedback>
      )}

      <Button
        text={buttonText}
        onPress={buttonAction}
        loading={buttonLoading}
      />
    </View>
  </Modal>
)

export default ConfirmationModal
