import React from 'react'

import { Period, periods } from '../../types/policy'
import SelectField from './SelectField'

const PeriodField = ({
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
    options={periods.map((period, index) => ({
      label: period,
      value: period,
      color: index,
    }))}
    required={required}
    readOnly={readOnly}
  />
)

export default PeriodField
