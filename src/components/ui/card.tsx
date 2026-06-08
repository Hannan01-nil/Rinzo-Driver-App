import { View, Text, StyleSheet, type ViewStyle, type StyleProp } from 'react-native'
import { colors, typography, spacing, borderRadius } from '@/theme'

interface CardProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  padded?: boolean
}

export function Card({ children, style, padded = true }: CardProps) {
  return (
    <View style={[styles.card, !padded && styles.noPadding, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  noPadding: {
    padding: 0,
  },
})
