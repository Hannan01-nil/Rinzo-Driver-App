import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface RequestCardProps {
  orderNumber: string
  time: string
  address: string
  customer: string
  distance: string
  status?: 'pickup' | 'delivery' | 'rerouting'
  onPress?: () => void
}

export function RequestCard({
  orderNumber,
  time,
  address,
  customer,
  distance,
  status = 'pickup',
  onPress,
}: RequestCardProps) {
  // Dynamic styling and text based on status
  const badgeStyles = {
    pickup: {
      bg: '#DEF7EC',
      text: '#15803D',
      label: 'Pickup',
    },
    delivery: {
      bg: '#EFF6FF',
      text: '#1D4ED8',
      label: 'Delivery',
    },
    rerouting: {
      bg: '#FEF3C7',
      text: '#D97706',
      label: 'Rerouting',
    },
  }[status] || {
    bg: '#DEF7EC',
    text: '#15803D',
    label: 'Pickup',
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.topRow}>
        <Text style={styles.orderNumber}>{orderNumber}</Text>
        <View style={[styles.badge, { backgroundColor: badgeStyles.bg }]}>
          <Text style={[styles.badgeText, { color: badgeStyles.text }]}>{badgeStyles.label}</Text>
        </View>
      </View>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.address}>{address}</Text>
      <Text style={styles.customer}>{customer}</Text>
      <Text style={styles.distance}>{distance}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3EEFC',
    padding: 14,
    marginTop: 10,
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
    marginBottom: 4,
  },
  orderNumber: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#1F1F1F',
  },
  badge: {
    backgroundColor: '#DEF7EC',
    height: 24,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    color: '#15803D',
  },
  time: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  address: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  customer: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#1F1F1F',
    marginTop: 4,
  },
  distance: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    color: '#8259D2',
    marginTop: 4,
  },
})
