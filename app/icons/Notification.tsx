import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const NotificationIcon = (props: SvgProps) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M12.001 17.356c-4.745 0-6.94-.635-7.152-3.183 0-2.546 1.53-2.383 1.53-5.507 0-2.442 2.219-5.218 5.622-5.218 3.404 0 5.622 2.776 5.622 5.217 0 3.124 1.53 2.96 1.53 5.508-.212 2.557-2.407 3.183-7.152 3.183Z'
      clipRule='evenodd'
    />
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M9.984 20c.492.614 1.23 1 2.045 1 .825 0 1.562-.386 2.054-1M6.072 3.008a8.04 8.04 0 0 0-2.027 3.194M19.956 6.212A8.09 8.09 0 0 0 17.92 3'
    />
  </Svg>
)

export default NotificationIcon
