import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import RNModal from 'react-native-modal'
import Button from './Button'

const Modal = ({
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
  <RNModal
    className='m-6'
    isVisible={open}
    animationIn='fadeIn'
    animationInTiming={500}
    animationOut='fadeOut'
    animationOutTiming={500}
    hasBackdrop
    backdropOpacity={0.5}
    backdropTransitionOutTiming={0}
    customBackdrop={
      <TouchableWithoutFeedback onPress={handleClose}>
        <View className='flex-1 bg-black' />
      </TouchableWithoutFeedback>
    }
  >
    <SafeAreaView>
      <View className='rounded-lg bg-white p-6'>
        <Text className='mb-2 font-js-mid text-lg text-neutral-900'>
          {title}
        </Text>

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
      </View>
    </SafeAreaView>
  </RNModal>
)

export default Modal
