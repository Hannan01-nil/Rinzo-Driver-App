import { Platform } from 'react-native'

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'Inter',
})

export const typography = {
  h1: { fontFamily, fontSize: 32, lineHeight: 40, fontWeight: '700' as const },
  h2: { fontFamily, fontSize: 28, lineHeight: 36, fontWeight: '700' as const },
  h3: { fontFamily, fontSize: 24, lineHeight: 32, fontWeight: '600' as const },
  h4: { fontFamily, fontSize: 20, lineHeight: 28, fontWeight: '600' as const },
  h5: { fontFamily, fontSize: 18, lineHeight: 24, fontWeight: '600' as const },
  body: { fontFamily, fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  bodySmall: { fontFamily, fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
  caption: { fontFamily, fontSize: 12, lineHeight: 16, fontWeight: '400' as const },
  button: { fontFamily, fontSize: 16, lineHeight: 24, fontWeight: '600' as const },
  buttonSmall: { fontFamily, fontSize: 14, lineHeight: 20, fontWeight: '600' as const },
  label: { fontFamily, fontSize: 14, lineHeight: 20, fontWeight: '500' as const },
  tab: { fontFamily, fontSize: 12, lineHeight: 16, fontWeight: '500' as const },
} as const

export type TTypographyKey = keyof typeof typography
