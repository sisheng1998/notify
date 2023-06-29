import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const ProfileIcon = (props: SvgProps) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M5.941 20c0-2.109 1.664-4.734 6.46-4.734 4.793 0 6.457 2.606 6.457 4.716'
    />
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M16.526 8.126a4.126 4.126 0 1 1-8.251 0 4.126 4.126 0 0 1 8.25 0Z'
      clipRule='evenodd'
    />
  </Svg>
)

export default ProfileIcon
