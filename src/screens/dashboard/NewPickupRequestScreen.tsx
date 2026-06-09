import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'

const MOCK_ORDER = {
  orderNumber: '#471c8b54',
  customer: 'Mira Sharma',
  address: '221B Baker Street',
  city: 'Bangalore - 500001',
  distance: '1.2 Km away',
  pickupTime: 'Today, 2:00PM - 4:00PM',
  items: [
    { name: 'Wash and Fold (4 Kg)', price: 200 },
    { name: 'Iron Only (6 Items)', price: 76 },
    { name: 'Dry Cleaning (2 Items)', price: 240 },
  ],
  total: 700,
}

export function NewPickupRequestScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const handleAccept = () => {
    Alert.alert('Pickup Accepted', 'The pickup request has been accepted successfully.')
  }

  const handleReject = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerSide}>
          <Ionicons name="arrow-back" size={24} color="#1F1F1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Pickup Request</Text>
        <View style={styles.headerSide} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.label}>Order ID</Text>
              <Text style={styles.orderNumber}>{MOCK_ORDER.orderNumber}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Pickup</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.customerRow}>
            <View style={styles.customerInfo}>
              <Text style={styles.label}>Customer</Text>
              <Text style={styles.customerName}>{MOCK_ORDER.customer}</Text>
            </View>
            <TouchableOpacity style={styles.callButton}>
              <Ionicons name="call-outline" size={24} color="#7C4DFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.nameText}>{MOCK_ORDER.customer}</Text>
            <Text style={styles.addressText}>{MOCK_ORDER.address}</Text>
            <Text style={styles.addressText}>{MOCK_ORDER.city}</Text>
            <View style={styles.distanceRow}>
              <Text style={styles.distanceText}>{MOCK_ORDER.distance}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View>
            <Text style={styles.label}>Pickup Time</Text>
            <Text style={styles.timeText}>{MOCK_ORDER.pickupTime}</Text>
          </View>

          <View style={styles.divider} />

          <View>
            <Text style={styles.sectionTitle}>Items</Text>

            {MOCK_ORDER.items.map((item, index) => (
              <View key={index}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                </View>
                {index < MOCK_ORDER.items.length - 1 && <View style={styles.itemDivider} />}
              </View>
            ))}

            <View style={styles.totalDivider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>₹{MOCK_ORDER.total}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept} activeOpacity={0.7}>
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rejectButton} onPress={handleReject} activeOpacity={0.7}>
          <Text style={styles.rejectButtonText}>Reject</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
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
    paddingHorizontal: 16,
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
    fontSize: 17,
    color: '#1F1F1F',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    color: '#1F1F1F',
    marginBottom: 2,
  },
  orderNumber: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
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
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 12,
  },
  customerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: '#1F1F1F',
  },
  callButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: '#1F1F1F',
    marginBottom: 4,
  },
  addressText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#1F1F1F',
    lineHeight: 20,
  },
  distanceRow: {
    marginTop: 6,
    alignItems: 'flex-end',
  },
  distanceText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    color: '#8E8E93',
  },
  timeText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#1F1F1F',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemName: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#1F1F1F',
    flex: 1,
  },
  itemPrice: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#1F1F1F',
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  totalDivider: {
    height: 1,
    backgroundColor: '#1F1F1F',
    marginTop: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  totalLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#1F1F1F',
  },
  totalPrice: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: '#1F1F1F',
  },
  acceptButton: {
    height: 44,
    backgroundColor: '#7C4DFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  acceptButtonText: {
    fontFamily: 'Poppins_500Medium',
    color: '#FFFFFF',
    fontSize: 14,
  },
  rejectButton: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#7C4DFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  rejectButtonText: {
    fontFamily: 'Poppins_500Medium',
    color: '#7C4DFF',
    fontSize: 14,
  },
  bottomSpacer: {
    height: 180,
  },
})
