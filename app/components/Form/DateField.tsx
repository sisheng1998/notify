import React, { useState } from 'react'
import { View } from 'react-native'
import moment from 'moment'
import DatePicker from 'react-native-date-picker'

import Label from './Label'
import Spacer from './Spacer'
import { TextInputField } from './TextField'
import { DisplayField } from './SelectField'
import { DATE_FORMAT } from '../../constants/time'

const DateField = ({
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
  const [open, setOpen] = useState<boolean>(false)

  const today = moment().startOf('day').toDate()

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  return (
    <View>
      <Label text={label} required={readOnly ? false : required} />

      <Spacer />

      {readOnly ? (
        <TextInputField
          placeholder=''
          value={value ? value : '-'}
          setValue={setValue}
          readOnly={readOnly}
        />
      ) : (
        <DisplayField
          text={value ? value : 'Select'}
          onPress={handleOpenModal}
          isFilled={value !== ''}
        />
      )}

      <DatePicker
        modal
        mode='date'
        theme='light'
        title={null}
        open={open}
        date={value === '' ? today : moment(value, DATE_FORMAT).toDate()}
        maximumDate={today}
        androidVariant='iosClone'
        onConfirm={(date) => {
          setValue(moment(date).format(DATE_FORMAT))
          handleCloseModal()
        }}
        onCancel={handleCloseModal}
      />
    </View>
  )
}

export default DateField
