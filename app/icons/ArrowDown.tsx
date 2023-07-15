import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const ArrowDownIcon = (props: SvgProps) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='m19 8.5-7 7-7-7'
    />
  </Svg>
)

export default ArrowDownIcon
