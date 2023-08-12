import React, { useRef } from 'react'
import {
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { THEME } from '../../constants/theme'
import SearchIcon from '../../icons/Search'
import CloseIcon from '../../icons/Close'

const Search = ({
  placeholder,
  value,
  setValue,
}: {
  placeholder: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}) => {
  const ref = useRef<TextInput>(null)

  const handleFocusInput = () => ref.current?.focus()

  const handleClearInput = () => setValue('')

  return (
    <View className='flex-1 flex-row items-center'>
      <IconContainer onPress={handleFocusInput}>
        <SearchIcon className='ml-1.5 h-5 w-5 text-neutral-400' />
      </IconContainer>

      <TextInput
        ref={ref}
        className='flex-1 px-0.5 py-4 font-js text-neutral-700'
        placeholder={placeholder}
        placeholderTextColor={THEME.colors.border}
        selectionColor={THEME.colors.body}
        value={value}
        onChangeText={setValue}
        autoComplete='off'
        autoCorrect={false}
        spellCheck={false}
        style={{
          ...Platform.select({
            android: {
              paddingTop: 18,
              paddingBottom: 14,
            },
          }),
        }}
      />

      <IconContainer
        onPress={value !== '' ? handleClearInput : handleFocusInput}
      >
        <CloseIcon
          className={`mr-1 h-5 w-5 ${
            value !== '' ? 'text-neutral-400' : 'text-transparent'
          }`}
        />
      </IconContainer>
    </View>
  )
}

const IconContainer = ({
  children,
  onPress,
}: {
  children: React.ReactNode
  onPress: () => void
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View className='h-full items-center justify-center p-2'>{children}</View>
  </TouchableWithoutFeedback>
)

export default Search
