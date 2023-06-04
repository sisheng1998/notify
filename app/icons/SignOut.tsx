import * as React from 'react'
import Svg, { SvgProps, G, Path } from 'react-native-svg'

const SignOutIcon = (props: SvgProps) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <G
      fill='none'
      fillRule='evenodd'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
    >
      <Path d='M15.016 7.39v-.933a3.685 3.685 0 0 0-3.685-3.685H6.456a3.685 3.685 0 0 0-3.684 3.685v11.13a3.685 3.685 0 0 0 3.684 3.684h4.885a3.675 3.675 0 0 0 3.675-3.674v-.943M21.809 12.021H9.769M18.881 9.106l2.928 2.915-2.928 2.916' />
    </G>
  </Svg>
)
export default SignOutIcon
