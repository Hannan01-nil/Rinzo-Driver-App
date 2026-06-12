import { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeaderBackButton } from '@/components/layout/header-back-button'
import { OrderCard } from '@/components/data-display/order-card'
import { useOrders } from '@/hooks'
import { colors, typography, spacing } from '@/theme'
import type { OrderStatus } from '@/types'

type ActiveFilterType = 'all' | 'pickup' | 'delivery' | 'completed'

const FILTERS: { label: string; value: ActiveFilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pickup', value: 'pickup' },
  { label: 'Delivery', value: 'delivery' },
  { label: 'Completed', value: 'completed' },
]

export function OrdersListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const { orders } = useOrders()
  const [activeFilter, setActiveFilter] = useState<ActiveFilterType>('all')

  const filtered = orders.filter(o => {
    if (activeFilter === 'all') return true
    
    const isPickup = ['pending', 'assigned', 'pickup_scheduled', 'collected'].includes(o.status)
    
    if (activeFilter === 'pickup') {
      return isPickup
    }
    if (activeFilter === 'delivery') {
      return !isPickup
    }
    if (activeFilter === 'completed') {
      return o.status === 'delivered'
    }
    return true
  })

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header with Circular Back Button */}
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <HeaderBackButton />
        </View>
        <Text style={styles.headerTitle} pointerEvents="none">All Orders</Text>
        <View style={styles.headerSide} />
      </View>
      <View style={styles.headerDivider} />

      {/* Filter Row with Pills */}
      <View style={styles.filterRow}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f.label}
            onPress={() => setActiveFilter(f.value)}
            style={[styles.filterChip, activeFilter === f.value && styles.filterChipActive]}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterText, activeFilter === f.value && styles.filterTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders List */}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        ) : (
          filtered.map(order => (
            <View key={order.id} style={{ marginBottom: 12 }}>
              <OrderCard
                order={order}
                onPress={() => {}}
              />
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: '#FFFFFF',
  },
  headerSide: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 10,
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#111111',
    textAlign: 'center',
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#EFEFEF',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
  },
  filterChip: {
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterChipActive: {
    backgroundColor: '#8259D2',
  },
  filterText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    color: '#111111',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
})
