import { Platform } from 'react-native';
import { moderateScale } from '../utils/responsive';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'Inter',
});

export const typography = {
  h1: { fontFamily, fontSize: moderateScale(28), lineHeight: moderateScale(34), fontWeight: '700' as const },
  h2: { fontFamily, fontSize: moderateScale(24), lineHeight: moderateScale(30), fontWeight: '700' as const },
  h3: { fontFamily, fontSize: moderateScale(20), lineHeight: moderateScale(26), fontWeight: '600' as const },
  h4: { fontFamily, fontSize: moderateScale(18), lineHeight: moderateScale(24), fontWeight: '600' as const },
  h5: { fontFamily, fontSize: moderateScale(16), lineHeight: moderateScale(22), fontWeight: '600' as const },
  body: { fontFamily, fontSize: moderateScale(14), lineHeight: moderateScale(20), fontWeight: '400' as const },
  bodySmall: { fontFamily, fontSize: moderateScale(12), lineHeight: moderateScale(18), fontWeight: '400' as const },
  caption: { fontFamily, fontSize: moderateScale(11), lineHeight: moderateScale(15), fontWeight: '400' as const },
  button: { fontFamily, fontSize: moderateScale(15), lineHeight: moderateScale(22), fontWeight: '600' as const },
  buttonSmall: { fontFamily, fontSize: moderateScale(13), lineHeight: moderateScale(18), fontWeight: '600' as const },
  label: { fontFamily, fontSize: moderateScale(13), lineHeight: moderateScale(18), fontWeight: '500' as const },
  tab: { fontFamily, fontSize: moderateScale(11), lineHeight: moderateScale(15), fontWeight: '500' as const },
} as const;

export type TTypographyKey = keyof typeof typography;
