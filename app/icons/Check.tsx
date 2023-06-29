import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const CheckIcon = (props: SvgProps) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='m19 7.188-9.625 9.625L5 12.438'
    />
  </Svg>
)

export default CheckIcon
