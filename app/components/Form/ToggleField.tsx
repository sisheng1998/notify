import React from 'react'
import { View, Text, Switch } from 'react-native'

import { THEME } from '../../constants/theme'
import NotificationIcon from '../../icons/Notification'

const ToggleField = ({
  label,
  value,
  setValue,
  readOnly = false,
}: {
  label: string
  value: boolean
  setValue: React.Dispatch<React.SetStateAction<boolean>>
  readOnly?: boolean
}) => {
  const toggleSwitch = () => setValue((prev) => !prev)

  return (
    <View className='flex-row items-center justify-between space-x-2 rounded-lg bg-primary/5 py-3 pl-3.5 pr-2.5'>
      <View className='flex-row items-center space-x-1.5'>
        <NotificationIcon className='h-6 w-6 text-primary' />
        <Text className='font-js-mid text-primary'>{label}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={toggleSwitch}
        style={{ transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }] }}
        trackColor={{
          true: THEME.colors.primary,
        }}
        disabled={readOnly}
      />
    </View>
  )
}

export default ToggleField
