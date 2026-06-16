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
  const [notes, setNotes] = useState('')

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
                  const parentNav = navigation.getParent && navigation.getParent();
                  if (parentNav && typeof parentNav.navigate === 'function') {
                    parentNav.navigate('home', {
                      screen: 'order-tracking',
                      params: { orderId },
                    });
                  } else {
                    navigation.navigate('order-tracking' as any, { orderId } as any);
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
                const parentNav = navigation.getParent && navigation.getParent();
                if (parentNav && typeof parentNav.navigate === 'function') {
                  parentNav.navigate('home', {
                    screen: 'order-tracking',
                    params: { orderId },
                  });
                } else {
                  navigation.navigate('order-tracking' as any, { orderId } as any);
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
          {FALLBACK_ITEMS.map((item, index) => (
            <View key={index}>
              <View style={styles.itemRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>

              {index < FALLBACK_ITEMS.length - 1 && (
                <View style={styles.itemDivider} />
              )}
            </View>
          ))}
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
              navigation.navigate('order-collected-success', {
                orderId,
              })
            }
          >
            <Text style={styles.confirmButtonText}>Confirm collection</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
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

  bottomSpacer: {
    height: 110,
  },
})