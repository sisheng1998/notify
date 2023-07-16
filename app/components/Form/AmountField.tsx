import React from 'react'
import { View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

import { THEME } from '../../constants/theme'
import Label from './Label'
import Spacer from './Spacer'

export const moneyOptions = {
  precision: 2,
  separator: '.',
  delimiter: ',',
  unit: 'RM ',
  suffixUnit: '',
}

const AmountField = ({
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
  <View>
    <Label text={label} required={readOnly ? false : required} />

    <Spacer />

    <TextInputMask
      className={`rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-js ${
        value === '0' ? 'text-neutral-400' : 'text-neutral-700'
      }`}
      selectionColor={THEME.colors.body}
      type='money'
      options={moneyOptions}
      includeRawValueInChangeText
      keyboardType='numeric'
      value={value}
      onChangeText={(_, rawText) => setValue(rawText ? rawText : '0')}
      editable={!readOnly}
    />
  </View>
)

export default AmountField
