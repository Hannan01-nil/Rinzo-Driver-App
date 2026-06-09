import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import mapImage from '@/assets/images/DriverAppImages/map.png'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export function OrderTrackingScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { orderId } = route.params as { orderId: string }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerSide}>
          <Ionicons name="chevron-back" size={22} color="#1F1F1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{orderId}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Pickup</Text>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <Image source={mapImage} style={styles.mapImage} resizeMode="cover" />
      </View>

      <View style={styles.bottomCard}>
        <Text style={styles.title}>Order Tracking</Text>
        <View style={styles.driverRow}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?u=driver_tracking' }}
            style={styles.avatar}
          />
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>Cameron Williamson</Text>
            <Text style={styles.driverRole}>Delivery Man</Text>
          </View>
          <TouchableOpacity style={styles.callButton} activeOpacity={0.7}>
            <Ionicons name="call-outline" size={20} color="#7C4DFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.timelineSection}>
          <View style={styles.timelineLine} />

          <View style={styles.trackingRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="location-outline" size={16} color="#7C4DFF" />
            </View>
            <View style={styles.trackingContent}>
              <Text style={styles.trackingLabel}>Pickup</Text>
              <Text style={styles.trackingValue}>221b baker street, bangalore - 500001</Text>
            </View>
          </View>

          <View style={styles.trackingRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="flag-outline" size={16} color="#7C4DFF" />
            </View>
            <View style={styles.trackingContent}>
              <Text style={styles.trackingLabel}>Dropoff</Text>
              <Text style={styles.trackingValue}>03:00PM (Max 20 min)</Text>
            </View>
          </View>
        </View>
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  headerSide: {
    width: 32,
    height: 32,
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1F1F1F',
  },
  badge: {
    backgroundColor: '#DDF4E8',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 11,
    color: '#5D9C74',
  },
  mapContainer: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.58,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  bottomCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 16,
    marginTop: -35,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    color: '#1F1F1F',
    marginBottom: 10,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 18,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
  },
  driverInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  driverName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#1F1F1F',
    lineHeight: 22,
    marginBottom: 2,
  },
  driverRole: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#8E8E93',
    lineHeight: 16,
  },
  callButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F7F3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 18,
  },
  timelineSection: {
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 17,
    top: 36,
    width: 2,
    height: 34,
    backgroundColor: '#EAEAEA',
  },
  trackingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  trackingContent: {
    flex: 1,
    marginLeft: 16,
  },
  trackingLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 1,
  },
  trackingValue: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#1F1F1F',
    lineHeight: 16,
  },
})
