import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card, Button, Badge } from '@/components/ui'
import { useOrders } from '@/hooks'
import { colors, typography, spacing } from '@/theme'
import { formatCurrency, formatTime, formatDistance } from '@/utils'
import { ORDER_STATUS_LABELS } from '@/constants'

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
    <ScreenWrapper>
      <Header title="Collect Clothes" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <View style={styles.headerRow}>
            <Text style={styles.orderNumber}>{order.orderNumber}</Text>
            <Badge label={ORDER_STATUS_LABELS[order.status]} variant="info" />
          </View>

          <View style={styles.divider} />
          <Text style={styles.label}>Customer</Text>
          <Text style={styles.value}>{order.customerName}</Text>
          <Text style={styles.value}>{order.customerPhone}</Text>

          <View style={styles.divider} />
          <Text style={styles.label}>Pickup Address</Text>
          <Text style={styles.value}>{order.pickupAddress.street}</Text>
          <Text style={styles.value}>{order.pickupAddress.city}, {order.pickupAddress.state}</Text>

          <View style={styles.divider} />
          <Text style={styles.label}>Items</Text>
          <Text style={styles.value}>{order.itemsCount} items · {order.totalWeight ? `${order.totalWeight} kg` : 'N/A'}</Text>

          <View style={styles.divider} />
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.amount}>{formatCurrency(order.totalAmount)}</Text>
        </Card>

        <View style={{ marginTop: spacing.xxl }}>
          <Button
            title="Mark as Collected"
            onPress={() => navigation.navigate('order-collected-success', { orderId })}
            fullWidth
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  notFound: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderNumber: { ...typography.h5, color: colors.text },
  divider: { height: 1, backgroundColor: colors.divider, marginVertical: spacing.md },
  label: { ...typography.caption, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: spacing.xxs },
  value: { ...typography.body, color: colors.text, marginBottom: spacing.xs },
  amount: { ...typography.h3, color: colors.primary },
})
