import { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { OrderCard } from '@/components/data-display/order-card'
import { useOrders } from '@/hooks'
import { colors, typography, spacing } from '@/theme'
import type { OrderStatus } from '@/types'

const FILTERS: { label: string; value: OrderStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'assigned' },
  { label: 'Completed', value: 'delivered' },
]

export function OrdersListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const { orders } = useOrders()
  const [activeFilter, setActiveFilter] = useState<OrderStatus | 'all'>('all')

  const filtered = activeFilter === 'all' ? orders : orders.filter(o => o.status === activeFilter)

  return (
    <ScreenWrapper>
      <View style={styles.filterRow}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f.label}
            onPress={() => setActiveFilter(f.value)}
            style={[styles.filterChip, activeFilter === f.value && styles.filterChipActive]}
          >
            <Text style={[styles.filterText, activeFilter === f.value && styles.filterTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        ) : (
          filtered.map(order => (
            <View key={order.id} style={{ marginBottom: spacing.md }}>
              <OrderCard
                order={order}
                onPress={(id) => {
                  if (order.status === 'collected') navigation.navigate('in-transit', { orderId: id })
                  else navigation.navigate('collect-clothes', { orderId: id })
                }}
              />
            </View>
          ))
        )}
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  filterRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md, marginBottom: spacing.lg },
  filterChip: { paddingVertical: spacing.xs, paddingHorizontal: spacing.lg, borderRadius: 20, backgroundColor: colors.backgroundTertiary },
  filterChipActive: { backgroundColor: colors.primary },
  filterText: { ...typography.bodySmall, color: colors.textSecondary },
  filterTextActive: { color: colors.textInverse },
  scroll: { paddingBottom: spacing.xxl },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: spacing.xxxxl },
  emptyText: { ...typography.body, color: colors.textSecondary },
})
