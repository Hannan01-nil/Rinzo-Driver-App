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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#F3EEFC',
    shadowColor: '#8259D2',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: '#1F1F1F',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickupBadge: {
    backgroundColor: '#F3E8FF',
  },
  deliveryBadge: {
    backgroundColor: '#DEF7EC',
  },
  badgeText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
  },
  pickupBadgeText: {
    color: '#8259D2',
  },
  deliveryBadgeText: {
    color: '#15803D',
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
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2,
  },
  timeVal: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    color: '#4B4B4B',
    marginBottom: 4,
  },
  address: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  rightCol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  amount: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#8259D2',
    marginRight: 4,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  chevron: {
    alignSelf: 'center',
  },
})
