import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface RequestCardProps {
  orderNumber: string
  time: string
  address: string
  customer: string
  distance: string
  onViewDetails: () => void
  onAccept: () => void
}

export function RequestCard({
  orderNumber,
  time,
  address,
  customer,
  distance,
  onViewDetails,
  onAccept,
}: RequestCardProps) {
  return (
    <View style={styles.card}>
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
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.outlineButton} onPress={onViewDetails} activeOpacity={0.7}>
          <Text style={styles.outlineButtonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filledButton} onPress={onAccept} activeOpacity={0.7}>
          <Text style={styles.filledButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  outlineButton: {
    height: 44,
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#7C4DFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButtonText: {
    fontFamily: 'Poppins_500Medium',
    color: '#7C4DFF',
    fontSize: 14,
  },
  filledButton: {
    height: 44,
    flex: 1,
    backgroundColor: '#7C4DFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filledButtonText: {
    fontFamily: 'Poppins_500Medium',
    color: '#FFFFFF',
    fontSize: 14,
  },
})
