import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

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
  const badgeStyles = {
    pickup: {
      bg: '#E8F5E9',
      text: '#10B981',
      label: 'PICKUP',
    },
    delivery: {
      bg: '#EFF6FF',
      text: '#3B82F6',
      label: 'DELIVERY',
    },
    rerouting: {
      bg: '#FFF7ED',
      text: '#F59E0B',
      label: 'REROUTE',
    },
  }[status] || {
    bg: '#E8F5E9',
    text: '#10B981',
    label: 'PICKUP',
  };

  const getIcon = () => {
    if (status === 'pickup') return 'tshirt-crew-outline';
    if (status === 'delivery') return 'hanger';
    return 'truck-delivery-outline';
  };

  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: badgeStyles.text }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Absolute positioned status badge flush in the top-right corner */}
      <View style={[styles.badge, { backgroundColor: badgeStyles.bg }]}>
        <Text style={[styles.badgeText, { color: badgeStyles.text }]}>{badgeStyles.label}</Text>
      </View>

      <View style={styles.cardInner}>
        <View style={styles.contentColumn}>
          {/* Header Row: Large Icon and Order info */}
          <View style={styles.headerRow}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name={getIcon()} size={24} color="#8259D2" />
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.orderLabel}>ORDER ID: {orderNumber}</Text>
              <Text style={styles.customerName} numberOfLines={1}>{customer}</Text>
            </View>
          </View>

          {/* Address Row */}
          <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={16} color="#8E8E93" style={styles.addressIcon} />
            <Text style={styles.addressText} numberOfLines={1}>{address}</Text>
          </View>

          <View style={styles.divider} />

          {/* Footer Row: Timing, Distance & Action Button */}
          <View style={styles.footerRow}>
            <View style={styles.footerLeftColumn}>
              <View style={styles.timeContainer}>
                <Ionicons name="time-outline" size={16} color="#8259D2" style={styles.timeIcon} />
                <Text style={styles.timeText}>By {time}</Text>
              </View>
              <View style={styles.distanceContainer}>
                <MaterialCommunityIcons name="map-marker-distance" size={16} color="#8259D2" style={styles.distanceIcon} />
                <Text style={styles.distanceText}>{distance}</Text>
              </View>
            </View>

            {status === 'pickup' ? (
              <View style={styles.solidButton}>
                <Text style={styles.solidButtonText}>Start Trip</Text>
              </View>
            ) : (
              <View style={styles.greyButton}>
                <Text style={styles.greyButtonText}>View Details</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EBE3FC',
    borderLeftWidth: 5,
    marginTop: 12,
    shadowColor: '#8259D2',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderBottomLeftRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 9,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  cardInner: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  contentColumn: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingRight: 60, // Make sure text doesn't overlap the top-right badge
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F2F0F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    marginLeft: 12,
    justifyContent: 'center',
    flex: 1,
  },
  orderLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    color: '#8E8E93',
    letterSpacing: 0.5,
  },
  customerName: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 15,
    color: '#1A1A1E',
    marginTop: 1,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressIcon: {
    marginRight: 6,
  },
  addressText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#55555A',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F0F7',
    marginVertical: 8,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerLeftColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  timeIcon: {
    marginRight: 6,
  },
  timeText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    color: '#8259D2',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceIcon: {
    marginRight: 6,
  },
  distanceText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11.5,
    color: '#8259D2',
  },
  solidButton: {
    backgroundColor: '#8259D2',
    borderRadius: 16,
    width: 108,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  solidButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11.5,
    color: '#FFFFFF',
  },
  greyButton: {
    backgroundColor: '#F2F0F7',
    borderRadius: 16,
    width: 108,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greyButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11.5,
    color: '#8259D2',
  },
})
