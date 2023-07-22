import React from 'react'

import { PaymentFrequency, paymentFrequencies } from '../../types/policy'
import SelectField from './SelectField'

const PaymentFrequencyField = ({
  value,
  setValue,
  required = false,
  readOnly = false,
}: {
  value: PaymentFrequency | ''
  setValue: React.Dispatch<React.SetStateAction<PaymentFrequency | ''>>
  required?: boolean
  readOnly?: boolean
}) => (
  <SelectField
    label='Payment Frequency'
    value={value}
    setValue={setValue as React.Dispatch<React.SetStateAction<string>>}
    options={paymentFrequencies.map((PaymentFrequency, index) => ({
      label: PaymentFrequency,
      value: PaymentFrequency,
      color: index,
    }))}
    required={required}
    readOnly={readOnly}
  />
)

export default PaymentFrequencyField
