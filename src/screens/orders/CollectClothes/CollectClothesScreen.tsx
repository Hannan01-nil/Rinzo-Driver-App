import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'

const ITEMS = [
  { name: 'Wash and Fold', price: '₹200' },
  { name: 'Iron Only', price: '₹75/item' },
  { name: 'Dry Cleaning', price: '₹125/item' },
]

export function CollectClothesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const route = useRoute()
  const { orderId } = route.params as { orderId: string }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerSide}>
          <Ionicons name="chevron-back" size={22} color="#1F1F1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{orderId}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Pickup</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.upperSections}>
          <View style={styles.customerCard}>
            <View style={styles.customerLeft}>
              <Text style={styles.customerLabel}>Customer</Text>
              <Text style={styles.customerName}>Mira Sharma</Text>
            </View>
            <TouchableOpacity style={styles.callButton}>
              <Ionicons name="call-outline" size={22} color="#1F1F1F" />
            </TouchableOpacity>
          </View>

          <View style={styles.verifySection}>
            <Text style={styles.verifyTitle}>Verify Items</Text>
            <Text style={styles.verifySubtitle}>Please verify the items with customer</Text>
          </View>

          <View style={styles.itemsCard}>
            {ITEMS.map((item, index) => (
              <View key={index}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
                {index < ITEMS.length - 1 && <View style={styles.itemDivider} />}
              </View>
            ))}
          </View>

          <View style={styles.notesSection}>
            <Text style={styles.notesLabel}>Notes (Optional)</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="E.g handle with care"
              placeholderTextColor="#B8B8B8"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('order-collected-success', { orderId })}
        >
          <Text style={styles.confirmButtonText}>Confirm Collection</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 170,
  },
  upperSections: {
    flex: 1,
  },
  customerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  customerLeft: {
    flex: 1,
  },
  customerLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  customerName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: '#1F1F1F',
    marginTop: 2,
  },
  callButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifySection: {
    marginBottom: 20,
  },
  verifyTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#1F1F1F',
  },
  verifySubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  itemsCard: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
  },
  itemName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#1F1F1F',
  },
  itemPrice: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#8259D2',
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#F2F2F2',
  },
  notesSection: {
    marginBottom: 20,
  },
  notesLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#1F1F1F',
    marginBottom: 8,
  },
  notesInput: {
    height: 56,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#1F1F1F',
  },
  confirmButton: {
    height: 52,
    backgroundColor: '#8259D2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
})