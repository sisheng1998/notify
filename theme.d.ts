import { THEME } from './app/constants/Theme'

declare module '@react-navigation/native' {
  export type ExtendedTheme = typeof THEME
  export function useTheme(): ExtendedTheme
}
