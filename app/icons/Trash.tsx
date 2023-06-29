import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const TrashIcon = (props: SvgProps) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <Path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='m18.4 9.645-.587 8.042a3.184 3.184 0 0 1-3.176 2.952H8.884a3.185 3.185 0 0 1-3.176-2.953l-.587-8.041M19.694 6.626H3.826M15.38 6.625l-.482-2.377a1.198 1.198 0 0 0-1.157-.888H9.784a1.199 1.199 0 0 0-1.163.888l-.478 2.377M9.938 11.79v4.328m3.245-4.328v4.328'
    />
  </Svg>
)

export default TrashIcon
