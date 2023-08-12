import React from 'react'
import { SafeAreaView, View, TouchableWithoutFeedback } from 'react-native'
import RNModal from 'react-native-modal'

const Modal = ({
  open,
  handleClose,
  children,
}: {
  open: boolean
  handleClose: () => void
  children: React.ReactNode
}) => (
  <RNModal
    className='m-4'
    isVisible={open}
    animationIn='fadeIn'
    animationInTiming={250}
    animationOut='fadeOut'
    animationOutTiming={250}
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
      <View className='rounded-lg bg-white p-5'>{children}</View>
    </SafeAreaView>
  </RNModal>
)

export default Modal
