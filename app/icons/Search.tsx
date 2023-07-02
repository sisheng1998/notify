import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const SearchIcon = (props: SvgProps) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M11.632 3a8.418 8.418 0 1 1-.001 16.836A8.418 8.418 0 0 1 11.632 3Z'
      clipRule='evenodd'
    />
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M17.361 17.584 20.786 21'
    />
  </Svg>
)

export default SearchIcon
