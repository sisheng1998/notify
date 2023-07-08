import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const EditIcon = (props: SvgProps) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M11.36 3H7.781C4.846 3 3.004 5.081 3.004 8.026v7.947C3.004 18.919 4.837 21 7.782 21h8.435c2.948 0 4.78-2.081 4.78-5.027v-3.581'
    />
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='m11.891 14.52 1.27-.212a3.048 3.048 0 0 0 1.768-.974l5.475-5.975a1.743 1.743 0 0 0-.095-2.464L19.14 3.813a1.745 1.745 0 0 0-2.465.095l-5.535 6.043a3.051 3.051 0 0 0-.758 1.703l-.142 1.31a1.424 1.424 0 0 0 1.65 1.557Z'
    />
  </Svg>
)

export default EditIcon
