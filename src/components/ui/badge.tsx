import { View, Text, StyleSheet } from 'react-native'
import { colors, typography, spacing, borderRadius } from '@/theme'

interface BadgeProps {
  label: string
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default'
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[`variant_${variant}`]]}>
      <Text style={[styles.text, styles[`text_${variant}`]]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.xs,
    alignSelf: 'flex-start',
  },
  variant_success: {
    backgroundColor: colors.successLight,
  },
  variant_warning: {
    backgroundColor: colors.warningLight,
  },
  variant_error: {
    backgroundColor: colors.errorLight,
  },
  variant_info: {
    backgroundColor: '#D1ECF1',
  },
  variant_default: {
    backgroundColor: colors.backgroundTertiary,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  text_success: {
    color: colors.success,
  },
  text_warning: {
    color: '#856404',
  },
  text_error: {
    color: colors.error,
  },
  text_info: {
    color: '#0C5460',
  },
  text_default: {
    color: colors.textSecondary,
  },
})
