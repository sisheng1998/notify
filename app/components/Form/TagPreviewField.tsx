import React from 'react'
import { View, Text } from 'react-native'

import Label from './Label'
import Spacer from './Spacer'
import Tag from '../Common/Tag'

const TagPreviewField = ({
  text,
  colorIndex,
}: {
  text: string
  colorIndex: number
}) => (
  <View>
    <Label text='Preview' />

    <Spacer />

    {text === '' ? (
      <Text className='font-js text-neutral-700'>-</Text>
    ) : (
      <Tag text={text} colorIndex={colorIndex} />
    )}
  </View>
)

export default TagPreviewField
