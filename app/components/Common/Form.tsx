import React, { ReactNode } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native'
import moment from 'moment'
import { TextInputMask } from 'react-native-masked-text'

import { THEME } from '../../constants/theme'
import CheckIcon from '../../icons/Check'
import useColors from '../../hooks/useColors'
import { DATETIME_FORMAT } from '../../constants/time'
import Tag from './Tag'
import useCategory from '../../hooks/useCategory'

const Container = ({ children }: { children: ReactNode }) => (
  <View className='space-y-1.5'>{children}</View>
)

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

export const TextField = ({
  label,
  placeholder,
  value,
  setValue,
  required = false,
  readOnly = false,
}: {
  label: string
  placeholder: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  required?: boolean
  readOnly?: boolean
}) => (
  <Container>
    <Label text={label} required={readOnly ? false : required} />

    <TextInput
      className='rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-js text-neutral-700'
      placeholder={placeholder}
      placeholderTextColor={THEME.colors.border}
      selectionColor={THEME.colors.body}
      value={readOnly && value === '' ? '-' : value}
      onChangeText={setValue}
      autoComplete='off'
      autoCorrect={false}
      spellCheck={false}
      editable={!readOnly}
    />
  </Container>
)

export const ColorField = ({
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
    <Container>
      <Label text={label} required={readOnly ? false : required} />

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
    </Container>
  )
}

export const TagPreviewField = ({
  text,
  colorIndex,
}: {
  text: string
  colorIndex: number
}) => (
  <Container>
    <Label text='Preview' />

    {text === '' ? (
      <Text className='font-js text-neutral-700'>-</Text>
    ) : (
      <View>
        <Tag text={text} colorIndex={colorIndex} />
      </View>
    )}
  </Container>
)

export const DateTimePreviewField = ({
  label,
  time,
}: {
  label: string
  time: string
}) => (
  <Container>
    <Label text={label} />

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
  </Container>
)

export const AmountField = ({
  label,
  value,
  setValue,
  required = false,
  readOnly = false,
}: {
  label: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  required?: boolean
  readOnly?: boolean
}) => (
  <Container>
    <Label text={label} required={readOnly ? false : required} />

    <TextInputMask
      className='rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-js text-neutral-700'
      selectionColor={THEME.colors.body}
      type='money'
      options={{
        precision: 2,
        separator: '.',
        delimiter: ',',
        unit: 'RM ',
        suffixUnit: '',
      }}
      includeRawValueInChangeText
      keyboardType='numeric'
      value={value}
      onChangeText={(_, rawText) => setValue(rawText ? rawText : '0')}
      editable={!readOnly}
    />
  </Container>
)

export const CategoryField = ({
  label,
  value,
  setValue,
  required = false,
  readOnly = false,
}: {
  label: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  required?: boolean
  readOnly?: boolean
}) => {
  const { categories } = useCategory()

  return (
    <Container>
      <Label text={label} required={readOnly ? false : required} />
    </Container>
  )
}
