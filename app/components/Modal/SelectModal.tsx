import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native'

import Modal from './Modal'
import { Option } from '../Form'
import Button from '../Common/Button'
import Search from '../Common/Search'
import InfoMessage from '../Common/InfoMessage'
import CheckIcon from '../../icons/Check'
import useDebounce from '../../hooks/useDebounce'
import { getColor } from '../../hooks/useColors'

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

      <ScrollView className='-mb-2 -mr-4 mt-1 max-h-80 pr-4'>
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
                option={option}
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
  option,
  onPress,
  isSelected,
}: {
  option: Option
  onPress: () => void
  isSelected: boolean
}) => {
  const color = getColor(option.color)

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        className='mb-2 flex-row items-center justify-between space-x-2 rounded-lg border p-3.5 pl-4'
        style={{
          backgroundColor: color.background,
          borderColor: isSelected ? color.text : 'transparent',
        }}
      >
        <Text className='flex-1 font-js-mid' style={{ color: color.text }}>
          {option.label}
        </Text>

        <View
          className='rounded-full border p-1'
          style={{
            backgroundColor: isSelected ? color.text : 'transparent',
            borderColor: color.text,
          }}
        >
          <CheckIcon
            className={`h-3 w-3 scale-150 ${
              isSelected ? 'text-white' : 'text-transparent'
            }`}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default SelectModal
