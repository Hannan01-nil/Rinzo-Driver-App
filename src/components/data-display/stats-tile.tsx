import { View, Text, StyleSheet } from 'react-native'
import { colors, typography, spacing, borderRadius } from '@/theme'

interface StatsTileProps {
  label: string
  value: string | number
  color?: string
}

export function StatsTile({ label, value, color = colors.primary }: StatsTileProps) {
  return (
    <View style={styles.tile}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
  },
  value: {
    ...typography.h4,
    fontWeight: '700',
    marginBottom: spacing.xxs,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
  },
})
