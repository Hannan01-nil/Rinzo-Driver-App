import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

import { useOrders } from '@/hooks'
import { colors, typography } from '@/theme'
import { HeaderBackButton } from '@/components/layout/header-back-button'

const FALLBACK_ITEMS = [
  { name: 'Wash and Fold', price: '₹200' },
  { name: 'Iron Only', price: '₹15/Item' },
  { name: 'Dry Cleaning', price: '₹125/Item' },
]

export function CollectClothesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const route = useRoute()
  const { orderId } = (route.params || {}) as { orderId: string }

  const { orders } = useOrders()
  const order = orders.find(o => o.id === orderId || o.orderNumber === orderId)
  
  const [items, setItems] = useState([
    { id: '1', name: 'Wash and Fold', price: '₹200/kg', verified: false, isKg: true },
    { id: '2', name: 'Iron Only', price: '₹15/Item', verified: false, isKg: false },
    { id: '3', name: 'Dry Cleaning', price: '₹125/Item', verified: false, isKg: false },
  ])
  const [weight, setWeight] = useState('')
  const [notes, setNotes] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItemName, setNewItemName] = useState('')
  const [newItemPrice, setNewItemPrice] = useState('')
  const [newItemIsKg, setNewItemIsKg] = useState(false)

  const toggleVerifyItem = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, verified: !item.verified }
      }
      return item
    }))
  }

  const handleAddItem = () => {
    if (!newItemName.trim() || !newItemPrice.trim()) return

    const priceLabel = newItemPrice.startsWith('₹') ? newItemPrice : `₹${newItemPrice}`
    const suffix = newItemIsKg ? '/kg' : '/Item'

    const newItem = {
      id: Date.now().toString(),
      name: newItemName,
      price: priceLabel + suffix,
      verified: false,
      isKg: newItemIsKg,
    }

    setItems(prev => [...prev, newItem])
    setNewItemName('')
    setNewItemPrice('')
    setNewItemIsKg(false)
    setShowAddForm(false)
  }

  const buttonScale = useSharedValue(1)

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  const handleCall = () => {
    if (order?.customerPhone) {
      Linking.openURL(`tel:${order.customerPhone}`)
    } else {
      Linking.openURL('tel:+919999999999')
    }
  }

  if (!order) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.headerSide}>
            <HeaderBackButton
              onPress={() => {
                const fromScreen = (route.params as any)?.fromScreen;
                if (fromScreen === 'order-tracking') {
                  try {
                    navigation.navigate('order-tracking' as any, { orderId } as any);
                  } catch (e) {
                    const parentNav = navigation.getParent && navigation.getParent();
                    if (parentNav && typeof parentNav.navigate === 'function') {
                      parentNav.navigate('home', {
                        screen: 'order-tracking',
                        params: { orderId },
                      });
                    }
                  }
                } else {
                  navigation.goBack();
                }
              }}
            />
          </View>
          <Text style={styles.headerTitle} pointerEvents="none">Collect Clothes</Text>
          <View style={styles.headerSide} />
        </View>
        <Text style={styles.notFound}>Order not found</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <HeaderBackButton
            onPress={() => {
              const fromScreen = (route.params as any)?.fromScreen;
              if (fromScreen === 'order-tracking') {
                try {
                  navigation.navigate('order-tracking' as any, { orderId } as any);
                } catch (e) {
                  const parentNav = navigation.getParent && navigation.getParent();
                  if (parentNav && typeof parentNav.navigate === 'function') {
                    parentNav.navigate('home', {
                      screen: 'order-tracking',
                      params: { orderId },
                    });
                  }
                }
              } else {
                navigation.goBack();
              }
            }}
          />
        </View>

        <Text style={styles.headerTitle} pointerEvents="none">
          {order.orderNumber}
        </Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Pickup</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.customerCard}>
          <View style={styles.customerLeft}>
            <Text style={styles.customerLabel}>Customer</Text>
            <Text style={styles.customerName}>{order.customerName}</Text>
          </View>

          <TouchableOpacity
            style={styles.callButton}
            onPress={handleCall}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="call-outline" size={20} color="#1F1F1F" />
          </TouchableOpacity>
        </View>

        <View style={styles.verifySection}>
          <Text style={styles.verifyTitle}>Verify Items</Text>
          <Text style={styles.verifySubtitle}>
            Please verify the items with customer
          </Text>
        </View>

        <View style={styles.itemsCard}>
          {items.map((item, index) => (
            <View key={item.id}>
              <TouchableOpacity
                style={styles.itemRow}
                activeOpacity={0.7}
                onPress={() => toggleVerifyItem(item.id)}
              >
                <View style={styles.itemLeftRow}>
                  <Ionicons
                    name={item.verified ? "checkbox" : "square-outline"}
                    size={20}
                    color={item.verified ? "#8259D2" : "#B8B8B8"}
                    style={styles.checkboxIcon}
                  />
                  <Text style={[styles.itemName, item.verified && styles.itemNameVerified]}>
                    {item.name}
                  </Text>
                </View>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </TouchableOpacity>

              {index < items.length - 1 && (
                <View style={styles.itemDivider} />
              )}
            </View>
          ))}
        </View>

        {/* Add More Items button & form */}
        {!showAddForm ? (
          <TouchableOpacity
            style={styles.addMoreButton}
            activeOpacity={0.7}
            onPress={() => setShowAddForm(true)}
          >
            <Ionicons name="add-circle-outline" size={18} color="#8259D2" />
            <Text style={styles.addMoreText}>Add More Items</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.addFormContainer}>
            <Text style={styles.addFormTitle}>Add Custom Item</Text>
            
            <TextInput
              style={styles.addInput}
              placeholder="Item name (e.g. Blanket)"
              placeholderTextColor="#B8B8B8"
              value={newItemName}
              onChangeText={setNewItemName}
            />

            <View style={styles.addFormRow}>
              <TextInput
                style={[styles.addInput, { flex: 1, marginBottom: 0 }]}
                placeholder="Rate (e.g. 150)"
                placeholderTextColor="#B8B8B8"
                keyboardType="numeric"
                value={newItemPrice}
                onChangeText={setNewItemPrice}
              />
              
              <View style={styles.unitToggleContainer}>
                <TouchableOpacity
                  style={[styles.unitToggleBtn, !newItemIsKg && styles.unitToggleBtnActive]}
                  onPress={() => setNewItemIsKg(false)}
                >
                  <Text style={[styles.unitToggleText, !newItemIsKg && styles.unitToggleTextActive]}>
                    Per Item
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.unitToggleBtn, newItemIsKg && styles.unitToggleBtnActive]}
                  onPress={() => setNewItemIsKg(true)}
                >
                  <Text style={[styles.unitToggleText, newItemIsKg && styles.unitToggleTextActive]}>
                    Per kg
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.addFormButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setShowAddForm(false)
                  setNewItemName('')
                  setNewItemPrice('')
                  setNewItemIsKg(false)
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleAddItem}
              >
                <Text style={styles.submitBtnText}>Add to List</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Weight input section */}
        <View style={styles.weightCard}>
          <View style={styles.weightHeader}>
            <Ionicons name="scale-outline" size={18} color="#8259D2" style={{ marginRight: 8 }} />
            <Text style={styles.weightTitle}>Weight Details</Text>
          </View>
          <Text style={styles.weightSubtitle}>
            Enter total weight of the wash & fold items
          </Text>
          <View style={styles.weightInputRow}>
            <TextInput
              style={styles.weightInput}
              keyboardType="numeric"
              placeholder="0.0"
              placeholderTextColor="#B8B8B8"
              value={weight}
              onChangeText={setWeight}
            />
            <View style={styles.weightUnitContainer}>
              <Text style={styles.weightUnitText}>kg</Text>
            </View>
          </View>
        </View>

        <View style={styles.notesSection}>
          <Text style={styles.notesLabel}>Notes ( Optional )</Text>

          <TextInput
            style={styles.notesInput}
            placeholder="E.g handle with care"
            placeholderTextColor="#B8B8B8"
            value={notes}
            onChangeText={setNotes}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Animated.View style={animatedButtonStyle}>
          <TouchableOpacity
            style={styles.confirmButton}
            activeOpacity={0.85}
            onPressIn={() => {
              buttonScale.value = withSpring(0.97, {
                damping: 15,
                stiffness: 200,
              })
            }}
            onPressOut={() => {
              buttonScale.value = withSpring(1, {
                damping: 10,
                stiffness: 150,
              })
            }}
            onPress={() =>
              navigation.navigate('customer-otp', {
                orderId,
                customerName: order?.customerName ?? "Rahul Sharma",
                status: "At Doorstep",
              })
            }
          >
            <Text style={styles.confirmButtonText}>Confirm collection</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  scrollContent: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 180,
  },

  notFound: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: '#FAFAFA',
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
    color: '#1F1F1F',
    textAlign: 'center',
  },

  badge: {
    backgroundColor: '#DDF4E8',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 11,
    color: '#5D9C74',
  },

  customerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginTop: 12,
    marginBottom: 24,
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
    marginTop: 4,
  },

  callButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  verifySection: {
    marginTop: 20,
    marginBottom: 16,
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
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 24,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
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
    marginHorizontal: 20,
  },

  notesSection: {
    marginBottom: 32,
  },

  notesLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#1F1F1F',
    marginBottom: 8,
  },

  notesInput: {
    height: 52,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#1F1F1F',
    backgroundColor: '#FFFFFF',
  },

  confirmButton: {
    height: 52,
    backgroundColor: '#8259D2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  confirmButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },

  buttonContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 110,
    backgroundColor: 'transparent',
    zIndex: 999,
  },

  itemLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  checkboxIcon: {
    marginRight: 12,
  },

  itemNameVerified: {
    color: '#8E8E93',
    textDecorationLine: 'line-through',
  },

  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#8259D2',
    borderRadius: 16,
    marginBottom: 24,
    backgroundColor: '#FAF8FF',
  },

  addMoreText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#8259D2',
    marginLeft: 8,
  },

  addFormContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },

  addFormTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: '#1F1F1F',
    marginBottom: 12,
  },

  addInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#1F1F1F',
    backgroundColor: '#FAFAFA',
    marginBottom: 12,
  },

  addFormRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },

  unitToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    padding: 3,
    width: 160,
  },

  unitToggleBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  unitToggleBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  unitToggleText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#7E8794',
  },

  unitToggleTextActive: {
    color: '#8259D2',
  },

  addFormButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },

  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelBtnText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#8E8E93',
  },

  submitBtn: {
    backgroundColor: '#8259D2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitBtnText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },

  weightCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },

  weightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  weightTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: '#1F1F1F',
  },

  weightSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 14,
  },

  weightInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  weightInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: '#EAEAEA',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 16,
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#1F1F1F',
    backgroundColor: '#FAFAFA',
  },

  weightUnitContainer: {
    height: 48,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#EAEAEA',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  weightUnitText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#1F1F1F',
  },
})