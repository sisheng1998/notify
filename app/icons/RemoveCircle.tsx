import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const RemoveCircleIcon = (props: SvgProps) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M21 12a9 9 0 0 0-9-9 9 9 0 1 0 9 9ZM14.33 9.666 9.668 14.33m4.668.006-4.67-4.67'
    />
  </Svg>
)

export default RemoveCircleIcon
