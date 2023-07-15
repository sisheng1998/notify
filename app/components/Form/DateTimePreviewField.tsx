import React from 'react'
import { View, Text } from 'react-native'
import moment from 'moment'

import { DATETIME_FORMAT } from '../../constants/time'
import Label from './Label'
import Spacer from './Spacer'

const DateTimePreviewField = ({
  label,
  time,
}: {
  label: string
  time: string
}) => (
  <View>
    <Label text={label} />

    <Spacer />

    {time === '-' ? (
      <Text className='font-js text-neutral-700'>-</Text>
    ) : (
      <View className='flex-row items-baseline space-x-1'>
        <Text className='font-js text-neutral-900'>
          {moment(time).format(DATETIME_FORMAT)}
        </Text>

        <Text className='font-js text-xs text-neutral-500'>
          - {moment(time).fromNow()}
        </Text>
      </View>
    )}
  </View>
)

export default DateTimePreviewField
