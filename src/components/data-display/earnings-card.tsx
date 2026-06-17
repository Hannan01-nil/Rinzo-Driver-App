import { View, Text, StyleSheet } from 'react-native'
import { colors, typography, spacing, borderRadius } from '@/theme'
import { formatCurrency } from '@/utils'

interface EarningsCardProps {
  title: string
  amount: number
  subtitle?: string
}

export function EarningsCard({ title, amount, subtitle }: EarningsCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>{formatCurrency(amount)}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#F3EEFC',
    shadowColor: '#8259D2',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1.5,
  },
  title: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  amount: {
    ...typography.h4,
    color: colors.text,
    fontWeight: '700',
  },
  subtitle: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: spacing.xxs,
  },
})
