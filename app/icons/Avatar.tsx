import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const AvatarIcon = (props: SvgProps) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1}
      d='M21.15 12a9 9 0 0 0-9-9 9 9 0 1 0 9 9Z'
    />
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1}
      d='M7.002 19.374c.204-1.586 1.615-3.347 5.118-3.347 3.541 0 4.943 1.771 5.137 3.377'
    />
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1}
      d='M15.418 10.327a3.295 3.295 0 1 1-6.592 0 3.296 3.296 0 0 1 6.592 0Z'
      clipRule='evenodd'
    />
  </Svg>
)

export default AvatarIcon
