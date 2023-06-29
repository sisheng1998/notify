import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const LoadingIcon = (props: SvgProps) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='m3.36 14.69 1.806-2.695 2.68 1.796M20.64 9.299l-1.806 2.694-2.679-1.796'
    />
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M5.196 12.141a6.807 6.807 0 0 0 12.41 3.72M18.805 11.847a6.807 6.807 0 0 0-12.41-3.72'
    />
  </Svg>
)

export default LoadingIcon
