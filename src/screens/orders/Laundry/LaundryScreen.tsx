import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card, Button } from '@/components/ui'
import { useOrders } from '@/hooks'
import { colors, typography, spacing } from '@/theme'
import { formatCurrency } from '@/utils'

export function OrderAtLaundryScreen() {
  const router = useRouter()
  const { orderId } = useLocalSearchParams<{ orderId: string }>()
  const { orders } = useOrders()
  const order = orders.find(o => o.id === orderId)

  return (
    <ScreenWrapper>
      <Header title="Order At Laundry" />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <Text style={styles.status}>🧺 At Laundry</Text>
          <Text style={styles.info}>
            Order {order?.orderNumber} has been dropped off at the laundry. Awaiting processing.
          </Text>
        </Card>

        <View style={{ marginTop: spacing.xxl }}>
          <Button
            title="Mark as Delivered"
            onPress={() => router.push({ pathname: '/(tabs)/orders/delivered-success', params: { orderId } })}
            fullWidth
          />
        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  status: { ...typography.h3, color: colors.text, textAlign: 'center', marginBottom: spacing.md },
  info: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
})
