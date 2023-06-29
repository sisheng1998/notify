import React, { ReactNode } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native'

import { THEME } from '../constants/theme'
import CheckIcon from '../icons/Check'
import useColors, { getColor } from '../hooks/useColors'

const Container = ({ children }: { children: ReactNode }) => (
  <View className='space-y-1.5'>{children}</View>
)

const Label = ({ text }: { text: string }) => (
  <Text className='font-js-mid text-sm text-neutral-700'>{text}</Text>
)

export const TextField = ({
  label,
  placeholder,
  value,
  setValue,
}: {
  label: string
  placeholder: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}) => (
  <Container>
    <Label text={label} />

    <TextInput
      className='rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-js text-neutral-700'
      placeholder={placeholder}
      placeholderTextColor={THEME.colors.border}
      selectionColor={THEME.colors.body}
      value={value}
      onChangeText={setValue}
    />
  </Container>
)

export const ColorField = ({
  label,
  value,
  setValue,
}: {
  label: string
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}) => {
  const colors = useColors()

  return (
    <Container>
      <Label text={label} />

      <View className='flex-row flex-wrap'>
        {colors.map((color, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => setValue(index)}>
            <View
              className='mb-2.5 mr-3 rounded-full border p-1.5'
              style={{
                backgroundColor: color.background,
                borderColor: color.text,
              }}
            >
              <CheckIcon
                className='h-7 w-7'
                color={value === index ? color.text : 'transparent'}
              />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </Container>
  )
}

export const TagPreviewField = ({
  text,
  colorIndex,
}: {
  text: string
  colorIndex: number
}) => {
  const color = getColor(colorIndex)

  return (
    <Container>
      <Label text='Preview' />

      {text === '' ? (
        <Text className='font-js-mid leading-none text-neutral-700'>-</Text>
      ) : (
        <View className='flex-row'>
          <View
            className='rounded-full px-4 py-1.5'
            style={{
              backgroundColor: color.background,
            }}
          >
            <Text
              className='font-js-mid capitalize leading-none'
              style={{ color: color.text }}
            >
              {text}
            </Text>
          </View>
        </View>
      )}
    </Container>
  )
}
