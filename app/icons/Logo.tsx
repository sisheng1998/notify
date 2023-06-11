import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const Logo = (props: SvgProps & { colored?: boolean }) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 318 318' {...props}>
    <Path
      stroke={props.colored ? '#ED1C24' : '#FFF'}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={18}
      d='M88.719 9h140.578C278.432 9 309 43.687 309 92.773v132.454C309 274.313 278.432 309 229.282 309H88.719C39.584 309 9 274.313 9 225.227V92.773C9 43.687 39.73 9 88.719 9Z'
    />
    <Path
      stroke={props.colored ? '#ED1C24' : '#FFF'}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={18}
      d='M159.015 69.856c-35.918 0-65.042 29.125-65.042 65.044l-.017 13.053a52.642 52.642 0 0 1-4.978 22.347l-4.622 9.81c-7.054 14.983 3.876 32.238 20.449 32.238H213.21c16.573 0 27.52-17.255 20.465-32.238l-4.622-9.81a52.43 52.43 0 0 1-4.995-22.347l-.015-13.053c0-35.92-29.108-65.044-65.028-65.044ZM128.303 217.432c0 16.945 13.752 30.696 30.697 30.696 16.963 0 30.698-13.751 30.698-30.696'
    />
  </Svg>
)
export default Logo
