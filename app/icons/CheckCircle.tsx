import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const CheckCircleIcon = (props: SvgProps) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M21 12a9 9 0 0 0-9-9 9 9 0 1 0 9 9Z'
    />
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='m8.535 12 2.31 2.31 4.618-4.619'
    />
  </Svg>
)

export default CheckCircleIcon
