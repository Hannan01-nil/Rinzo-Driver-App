import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, typography, spacing, borderRadius } from '@/theme'
import { formatCurrency } from '@/utils'
import type { TOrder } from '@/types'

interface OrderCardProps {
  order: TOrder
  onPress: (orderId: string) => void
}

export function OrderCard({ order, onPress }: OrderCardProps) {
  // Determine if this is a Pickup or Delivery card based on status
  const isPickup = ['pending', 'assigned', 'pickup_scheduled', 'collected'].includes(order.status)
  
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(order.id)}
      activeOpacity={0.7}
    >
      {/* Top Row: Order Number and Badge */}
      <View style={styles.topRow}>
        <Text style={styles.orderNumber}>{order.orderNumber}</Text>
        <View style={[styles.badge, isPickup ? styles.pickupBadge : styles.deliveryBadge]}>
          <Text style={[styles.badgeText, isPickup ? styles.pickupBadgeText : styles.deliveryBadgeText]}>
            {isPickup ? 'Pickup' : 'Delivery'}
          </Text>
        </View>
      </View>

      {/* Content Row */}
      <View style={styles.contentRow}>
        {/* Details Column */}
        <View style={styles.detailsCol}>
          <Text style={styles.timeLabel}>Pickup</Text>
          <Text style={styles.timeVal}>2:00 PM - 4:00 PM</Text>
          <Text style={styles.address}>{order.pickupAddress.street}</Text>
        </View>

        {/* Right Info Column (Price & Chevron) */}
        <View style={styles.rightCol}>
          <Text style={styles.amount}>{formatCurrency(200)}</Text>
          <Ionicons name="chevron-forward" size={22} color="#1F1A3C" style={styles.chevron} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FEFEFE',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderNumber: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#111111',
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickupBadge: {
    backgroundColor: '#E9E6FD',
  },
  deliveryBadge: {
    backgroundColor: '#E6F7ED',
  },
  badgeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
  },
  pickupBadgeText: {
    color: '#633CA5',
  },
  deliveryBadgeText: {
    color: '#16A34A',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  detailsCol: {
    flex: 1,
    marginRight: 12,
  },
  timeLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 2,
  },
  timeVal: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: '#7E8794',
    marginBottom: 4,
  },
  address: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: '#999999',
  },
  rightCol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  amount: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1F1A3C',
    marginRight: 4,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  chevron: {
    alignSelf: 'center',
  },
})
