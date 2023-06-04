import * as React from 'react'
import Svg, {
  SvgProps,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg'

const PlusBackground = (props: SvgProps) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' {...props}>
    <Circle cx={40} cy={40} r={40} fill='url(#plus-background)' />
    <Defs>
      <LinearGradient
        id='plus-background'
        x1={40}
        x2={40}
        y1={0}
        y2={80}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor='#F5F5F5' stopOpacity={0} />
        <Stop offset={0.5} stopColor='#F5F5F5' stopOpacity={0} />
        <Stop offset={0.5} stopColor='#F5F5F5' />
        <Stop offset={1} stopColor='#F5F5F5' />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default PlusBackground
