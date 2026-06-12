import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface RequestCardProps {
  orderNumber: string
  time: string
  address: string
  customer: string
  distance: string
  onPress?: () => void
}

export function RequestCard({
  orderNumber,
  time,
  address,
  customer,
  distance,
  onPress,
}: RequestCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.topRow}>
        <Text style={styles.orderNumber}>{orderNumber}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Pickup</Text>
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
    borderColor: '#EAEAEA',
    padding: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#000000',
  },
  badge: {
    backgroundColor: '#DDF4E8',
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    color: '#5D9C74',
  },
  time: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 6,
  },
  address: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#1F1F1F',
    marginTop: 6,
  },
  customer: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: '#1F1F1F',
    marginTop: 6,
  },
  distance: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 4,
  },
})
