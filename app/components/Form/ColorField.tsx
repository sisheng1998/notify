import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'

import useColors from '../../hooks/useColors'
import CheckIcon from '../../icons/Check'
import Label from './Label'
import Spacer from './Spacer'

const ColorField = ({
  label,
  value,
  setValue,
  required = false,
  readOnly = false,
}: {
  label: string
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  required?: boolean
  readOnly?: boolean
}) => {
  const colors = useColors()

  return (
    <View>
      <Label text={label} required={readOnly ? false : required} />

      <Spacer />

      <View className='flex-row flex-wrap'>
        {colors.map((color, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => (readOnly ? {} : setValue(index))}
          >
            <View
              className='mb-2.5 mr-3 rounded-full border p-1.5'
              style={{
                backgroundColor: color.background,
                borderColor: color.text,
              }}
            >
              <CheckIcon
                className='h-6 w-6'
                color={value === index ? color.text : 'transparent'}
              />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  )
}

export default ColorField
