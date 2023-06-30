import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const CloseIcon = (props: SvgProps) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='m6 6 12 12M18 6 6 18'
    />
  </Svg>
)

export default CloseIcon
