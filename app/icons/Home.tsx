import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const HomeIcon = (props: SvgProps) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M9.157 20.771v-3.066c0-.78.636-1.414 1.424-1.42h2.886c.792 0 1.433.636 1.433 1.42v3.076c0 .662.534 1.204 1.203 1.219h1.924c1.918 0 3.473-1.54 3.473-3.438V9.838a2.44 2.44 0 0 0-.962-1.905l-6.58-5.248a3.18 3.18 0 0 0-3.945 0L3.462 7.943A2.42 2.42 0 0 0 2.5 9.847v8.715C2.5 20.46 4.055 22 5.973 22h1.924c.685 0 1.241-.55 1.241-1.229'
    />
  </Svg>
)
export default HomeIcon