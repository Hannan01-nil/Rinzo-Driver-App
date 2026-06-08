import { View, Text, StyleSheet } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card, Button } from '@/components/ui'
import { useOrders } from '@/hooks'
import { colors, typography, spacing } from '@/theme'
import { formatCurrency } from '@/utils'

export function InTransitScreen() {
  const router = useRouter()
  const { orderId } = useLocalSearchParams<{ orderId: string }>()
  const { orders } = useOrders()
  const order = orders.find(o => o.id === orderId)

  return (
    <ScreenWrapper>
      <Header title="In Transit" />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <Text style={styles.status}>🚚 In Transit</Text>
          <Text style={styles.info}>
            You are heading to the laundry with {order?.itemsCount ?? 0} items.
          </Text>
        </Card>

        <View style={{ marginTop: spacing.xxl }}>
          <Button
            title="Reached Laundry"
            onPress={() => router.push({ pathname: '/(tabs)/orders/order-at-laundry', params: { orderId } })}
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
