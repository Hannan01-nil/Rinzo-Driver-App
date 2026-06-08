import { colors as lightColors } from './colors'

export const darkColors = {
  ...lightColors,
  primary: '#4DA3FF',
  primaryDark: '#208AEF',
  primaryLight: '#80BFFF',

  background: '#121212',
  backgroundSecondary: '#1E1E1E',
  backgroundTertiary: '#2C2C2C',

  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textTertiary: '#707070',
  textInverse: '#1A1A2E',

  border: '#2C2C2C',
  borderLight: '#383838',
  divider: '#2C2C2C',

  card: '#1E1E1E',
  cardBorder: '#2C2C2C',
  inputBackground: '#2C2C2C',
  inputBorder: '#383838',
  inputFocusBorder: '#4DA3FF',
  placeholder: '#707070',

  overlay: 'rgba(0, 0, 0, 0.7)',
  shadow: 'rgba(0, 0, 0, 0.3)',
} as const
