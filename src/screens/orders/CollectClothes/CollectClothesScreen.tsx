import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'

import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card, Button, Badge } from '@/components/ui'
import { useOrders } from '@/hooks'
import { colors, typography, spacing } from '@/theme'
import { formatCurrency } from '@/utils'
import { ORDER_STATUS_LABELS } from '@/constants'

const FALLBACK_ITEMS = [
  { name: 'Wash and Fold', price: '₹200' },
  { name: 'Iron Only', price: '₹75/item' },
  { name: 'Dry Cleaning', price: '₹125/item' },
]

export function CollectClothesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const route = useRoute()
  const { orderId } = route.params as { orderId: string }

  const { orders } = useOrders()
  const order = orders.find(o => o.id === orderId)

  if (!order) {
    return (
      <ScreenWrapper>
        <Header title="Collect Clothes" />
        <Text style={styles.notFound}>Order not found</Text>
      </ScreenWrapper>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerSide}
        >
          <Ionicons name="chevron-back" size={22} color="#1F1F1F" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{order.orderNumber}</Text>

        <Badge
          label={ORDER_STATUS_LABELS[order.status]}
          variant="info"
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.customerCard}>
          <View style={styles.customerLeft}>
            <Text style={styles.customerLabel}>Customer</Text>
            <Text style={styles.customerName}>{order.customerName}</Text>
            <Text style={styles.customerPhone}>{order.customerPhone}</Text>
          </View>

          <TouchableOpacity style={styles.callButton}>
            <Ionicons name="call-outline" size={22} color="#1F1F1F" />
          </TouchableOpacity>
        </View>

        <Card>
          <Text style={styles.sectionTitle}>Pickup Address</Text>

          <Text style={styles.value}>
            {order.pickupAddress.street}
          </Text>

          <Text style={styles.value}>
            {order.pickupAddress.city}, {order.pickupAddress.state}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Order Summary</Text>

          <Text style={styles.value}>
            {order.itemsCount} items ·{' '}
            {order.totalWeight
              ? `${order.totalWeight} kg`
              : 'Weight not available'}
          </Text>

          <Text style={styles.amount}>
            {formatCurrency(order.totalAmount)}
          </Text>
        </Card>

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
          <Text style={styles.notesLabel}>Notes (Optional)</Text>

          <TextInput
            style={styles.notesInput}
            placeholder="E.g handle with care"
            placeholderTextColor="#B8B8B8"
            multiline
          />
        </View>

        <Button
          title="Confirm Collection"
          fullWidth
          onPress={() =>
            navigation.navigate('order-collected-success', {
              orderId,
            })
          }
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  notFound: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    backgroundColor: '#FFFFFF',
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

  customerPhone: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },

  callButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sectionTitle: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },

  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.md,
  },

  value: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },

  amount: {
    ...typography.h3,
    color: colors.primary,
    marginTop: spacing.sm,
  },

  verifySection: {
    marginTop: 20,
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
    marginBottom: 24,
  },

  notesLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#1F1F1F',
    marginBottom: 8,
  },

  notesInput: {
    minHeight: 56,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#1F1F1F',
    textAlignVertical: 'top',
  },
})