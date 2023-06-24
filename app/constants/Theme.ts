import { DefaultTheme } from '@react-navigation/native'

export const THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ED1C24',
    heading: '#171717', // neutral-900
    body: '#404040', // neutral-700
    border: '#A3A3A3', // neutral-400
    helperText: '#D4D4D4', // neutral-300
  },
  fonts: {
    heading: 'js-mid',
    body: 'js',
  },
}
