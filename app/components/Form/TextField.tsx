import React from 'react'
import { View, TextInput } from 'react-native'

import { THEME } from '../../constants/theme'
import Label from './Label'
import Spacer from './Spacer'

const TextField = ({
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
  <View>
    <Label text={label} required={readOnly ? false : required} />

    <Spacer />

    <TextInputField
      placeholder={placeholder}
      value={value}
      setValue={setValue}
      readOnly={readOnly}
    />
  </View>
)

export const TextInputField = ({
  placeholder,
  value,
  setValue,
  readOnly = false,
}: {
  placeholder: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  readOnly?: boolean
}) => (
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
)

export default TextField
