import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

import InfoMessage from '../Common/InfoMessage'
import SelectModal from '../Modal/SelectModal'
import ArrowDownIcon from '../../icons/ArrowDown'
import Label from './Label'
import Spacer from './Spacer'
import { TextInputField } from './TextField'

export interface Option {
  label: string
  value: string
  color: number
}

const SelectField = ({
  label,
  value,
  setValue,
  options,
  required = false,
  readOnly = false,
  isSearchable = false,
}: {
  label: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  options: Option[]
  required?: boolean
  readOnly?: boolean
  isSearchable?: boolean
}) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const selectedOption = options.find((option) => option.value === value)

  return (
    <View>
      <Label text={label} required={readOnly ? false : required} />

      <Spacer />

      {options.length === 0 ? (
        <View className='-mb-2'>
          <InfoMessage text={`${label} not found. Kindly add one first.`} />
        </View>
      ) : readOnly ? (
        <TextInputField
          placeholder=''
          value={selectedOption ? selectedOption.label : '-'}
          setValue={setValue}
          readOnly={readOnly}
        />
      ) : (
        <DisplayField
          text={selectedOption ? selectedOption.label : 'Select'}
          onPress={handleOpenModal}
          isFilled={selectedOption !== undefined}
        />
      )}

      <SelectModal
        open={open}
        handleClose={handleCloseModal}
        title={label}
        options={options}
        value={value}
        setValue={setValue}
        isSearchable={isSearchable}
      />
    </View>
  )
}

export const DisplayField = ({
  text,
  onPress,
  isFilled,
}: {
  text: string
  onPress: () => void
  isFilled: boolean
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View className='flex-row items-center justify-between space-x-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4'>
      <Text
        className={`font-js ${
          isFilled ? 'text-neutral-700' : 'text-neutral-400'
        }`}
      >
        {text}
      </Text>

      <ArrowDownIcon className='h-4 w-4 scale-125 text-neutral-700' />
    </View>
  </TouchableWithoutFeedback>
)

export default SelectField
