import React, { useState } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native'
import moment from 'moment'
import { TextInputMask } from 'react-native-masked-text'

import { THEME } from '../../constants/theme'
import CheckIcon from '../../icons/Check'
import useColors from '../../hooks/useColors'
import { DATETIME_FORMAT } from '../../constants/time'
import Tag from './Tag'
import useCategory from '../../hooks/useCategory'
import SelectModal from '../Modal/SelectModal'
import ArrowDownIcon from '../../icons/ArrowDown'
import InfoMessage from './InfoMessage'
import { Period, periods } from '../../types/policy'

const Spacer = () => <View className='h-1.5 w-full' />

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

const TextInputField = ({
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

export const TagPreviewField = ({
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

export const DateTimePreviewField = ({
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
  <View>
    <Label text={label} required={readOnly ? false : required} />

    <Spacer />

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
  </View>
)

export interface Option {
  label: string
  value: string
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
        <TouchableWithoutFeedback onPress={handleOpenModal}>
          <View className='flex-row items-center justify-between space-x-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4'>
            <Text className='font-js text-neutral-700'>
              {selectedOption ? selectedOption.label : 'Select'}
            </Text>

            <ArrowDownIcon className='h-4 w-4 scale-125 text-neutral-700' />
          </View>
        </TouchableWithoutFeedback>
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

export const CategoryField = ({
  value,
  setValue,
  required = false,
  readOnly = false,
}: {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  required?: boolean
  readOnly?: boolean
}) => {
  const { categories } = useCategory()

  return (
    <SelectField
      label='Category'
      value={value}
      setValue={setValue}
      options={categories.map((category) => ({
        label: category.name,
        value: category.id,
      }))}
      required={required}
      readOnly={readOnly}
      isSearchable
    />
  )
}

export const PeriodField = ({
  value,
  setValue,
  required = false,
  readOnly = false,
}: {
  value: Period | ''
  setValue: React.Dispatch<React.SetStateAction<Period | ''>>
  required?: boolean
  readOnly?: boolean
}) => (
  <SelectField
    label='Period'
    value={value}
    setValue={setValue as React.Dispatch<React.SetStateAction<string>>}
    options={periods.map((period) => ({
      label: period,
      value: period,
    }))}
    required={required}
    readOnly={readOnly}
  />
)
