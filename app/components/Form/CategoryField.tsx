import React from 'react'

import useCategory from '../../hooks/useCategory'
import SelectField from './SelectField'

const CategoryField = ({
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
        color: category.color,
      }))}
      required={required}
      readOnly={readOnly}
      isSearchable
    />
  )
}

export default CategoryField
