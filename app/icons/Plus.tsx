import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const PlusIcon = (props: SvgProps) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M6 12h12M12 6v12'
    />
  </Svg>
)

export default PlusIcon
