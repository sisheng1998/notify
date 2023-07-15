import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native'

import Modal from './Modal'
import { Option } from '../Common/Form'
import Button from '../Common/Button'
import Search from '../Common/Search'
import InfoMessage from '../Common/InfoMessage'
import CheckIcon from '../../icons/Check'
import useDebounce from '../../hooks/useDebounce'

const SelectModal = ({
  open,
  handleClose,
  title,
  options,
  value,
  setValue,
  isSearchable = false,
}: {
  open: boolean
  handleClose: () => void
  title: string
  options: Option[]
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  isSearchable?: boolean
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedValue = useDebounce<string>(searchQuery, 500)

  const selectedOption = options.find((option) => option.value === value)

  const results =
    debouncedValue === ''
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(debouncedValue.toLowerCase())
        )

  const handleCloseModal = () => {
    setSearchQuery('')
    handleClose()
  }

  return (
    <Modal open={open} handleClose={handleCloseModal}>
      <Text className='mb-2 font-js-mid text-lg text-neutral-900'>{title}</Text>

      {isSearchable && (
        <View className='mb-2 h-12 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 shadow-lg'>
          <Search
            placeholder='Search'
            value={searchQuery}
            setValue={setSearchQuery}
          />
        </View>
      )}

      <ScrollView className='-mb-2 -mr-6 mt-1 max-h-80 pr-6'>
        {results.length === 0 ? (
          <InfoMessage text={`${title} not found.`} />
        ) : (
          results.map((option, index) => {
            const isSelected = selectedOption
              ? selectedOption.value === option.value
              : false

            const handleSelect = () =>
              setValue((prev) => (prev === option.value ? '' : option.value))

            return (
              <OptionCard
                key={index}
                label={option.label}
                onPress={handleSelect}
                isSelected={isSelected}
              />
            )
          })
        )}
      </ScrollView>

      <View className='mt-6'>
        <Button
          text='Select'
          onPress={handleCloseModal}
          disabled={value === ''}
        />
      </View>
    </Modal>
  )
}

const OptionCard = ({
  label,
  onPress,
  isSelected,
}: {
  label: string
  onPress: () => void
  isSelected: boolean
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      className={`mb-2 flex-row items-center justify-between space-x-2 rounded-lg border p-3.5 pl-4 ${
        isSelected
          ? 'border-primary bg-primary/5'
          : 'border-neutral-300 bg-transparent'
      }`}
    >
      <Text
        className={`flex-1 font-js ${
          isSelected ? 'text-primary' : 'text-neutral-700'
        }`}
      >
        {label}
      </Text>

      <View
        className={`rounded-full border p-1 ${
          isSelected
            ? 'border-primary bg-white'
            : 'border-neutral-300 bg-transparent'
        }`}
      >
        <CheckIcon
          className={`h-3 w-3 scale-150 ${
            isSelected ? 'text-primary' : 'text-transparent'
          }`}
        />
      </View>
    </View>
  </TouchableWithoutFeedback>
)

export default SelectModal
