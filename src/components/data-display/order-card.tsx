import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, typography, spacing, borderRadius } from '@/theme'
import { formatCurrency } from '@/utils'
import type { TOrder } from '@/types'

interface OrderCardProps {
  order: TOrder
  onPress: (orderId: string) => void
}

export function OrderCard({ order, onPress }: OrderCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(order.id)}
      activeOpacity={0.7}
    >
      <View style={styles.topRow}>
        <Text style={styles.orderNumber}>{order.orderNumber}</Text>
        <Text style={styles.amount}>{formatCurrency(order.totalAmount)}</Text>
      </View>
      <Text style={styles.customer}>{order.customerName}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.items}>{order.itemsCount} items</Text>
        <Text style={styles.status}>{order.status.replace(/_/g, ' ')}</Text>
      </View>
    </TouchableOpacity>
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  orderNumber: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  amount: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '700',
  },
  customer: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  items: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  status: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
})
