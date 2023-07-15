import React from 'react'
import { Text } from 'react-native'

const Label = ({
  text,
  required = false,
}: {
  text: string
  required?: boolean
}) => (
  <Text className='font-js-mid text-sm text-neutral-700'>
    {text}
    {required && <Text className='font-js-mid text-sm text-primary'> *</Text>}
  </Text>
)

export default Label
