import { Text, StyleSheet, type TextStyle, type StyleProp } from 'react-native'
import { colors, typography } from '@/theme'

interface ThemedTextProps {
  children: React.ReactNode
  type?: 'title' | 'subtitle' | 'default' | 'link' | 'small' | 'code' | 'linkPrimary' | 'smallBold'
  style?: StyleProp<TextStyle>
  themeColor?: string
}

function getTypeStyle(type: string) {
  switch (type) {
    case 'title': return styles.title
    case 'subtitle': return styles.subtitle
    case 'link': return styles.link
    case 'small': return styles.small
    case 'code': return styles.code
    case 'linkPrimary': return styles.linkPrimary
    case 'smallBold': return styles.smallBold
    default: return styles.default
  }
}

export function ThemedText({ children, type = 'default', style, themeColor }: ThemedTextProps) {
  return (
    <Text
      style={[
        styles.base,
        getTypeStyle(type),
        themeColor ? { color: (colors as any)[themeColor] || colors.text } : {},
        style,
      ]}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
  title: {
    ...typography.h1,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  default: {
    ...typography.body,
  },
  link: {
    ...typography.body,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 13,
    backgroundColor: colors.backgroundTertiary,
    color: colors.text,
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  linkPrimary: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  smallBold: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
})
