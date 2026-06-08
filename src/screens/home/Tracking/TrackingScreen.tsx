import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card } from '@/components/ui'
import { ProgressStepper } from '@/components/data-display/progress-stepper'
import { useOrders } from '@/hooks'
import { colors, typography, spacing } from '@/theme'
import { formatCurrency, formatDate, formatTime } from '@/utils'

export function OrderTrackingScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>()
  const { orders } = useOrders()
  const order = orders.find(o => o.id === orderId)

  if (!order) {
    return (
      <ScreenWrapper>
        <Header title="Order Tracking" />
        <Text style={styles.notFound}>Order not found</Text>
      </ScreenWrapper>
    )
  }

  return (
    <ScreenWrapper>
      <Header title={`Order ${order.orderNumber}`} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
          <Text style={styles.amount}>{formatCurrency(order.totalAmount)}</Text>
        </Card>

        <Card style={{ marginTop: spacing.lg }}>
          <Text style={styles.sectionTitle}>Customer</Text>
          <Text style={styles.infoText}>{order.customerName}</Text>
          <Text style={styles.infoText}>{order.customerPhone}</Text>
        </Card>

        <Card style={{ marginTop: spacing.lg }}>
          <Text style={styles.sectionTitle}>Pickup Address</Text>
          <Text style={styles.infoText}>{order.pickupAddress.street}</Text>
          <Text style={styles.infoText}>{order.pickupAddress.city}, {order.pickupAddress.state}</Text>
        </Card>

        <Card style={{ marginTop: spacing.lg }}>
          <Text style={styles.sectionTitle}>Order Progress</Text>
          <ProgressStepper currentStatus={order.status} />
        </Card>

        <Card style={{ marginTop: spacing.lg }}>
          <Text style={styles.sectionTitle}>Timeline</Text>
          {order.timeline.map((entry, index) => (
            <View key={index} style={styles.timelineRow}>
              <View style={styles.timelineDot} />
              <View>
                <Text style={styles.timelineStatus}>{entry.status.replace(/_/g, ' ')}</Text>
                <Text style={styles.timelineTime}>{formatDate(entry.timestamp, 'long')} at {formatTime(entry.timestamp)}</Text>
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  notFound: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl },
  orderNumber: { ...typography.h4, color: colors.text },
  amount: { ...typography.h2, color: colors.primary, marginTop: spacing.xs },
  sectionTitle: { ...typography.label, color: colors.textSecondary, marginBottom: spacing.sm, textTransform: 'uppercase' },
  infoText: { ...typography.body, color: colors.text, marginBottom: spacing.xxs },
  timelineRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.md },
  timelineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginTop: 6, marginRight: spacing.md },
  timelineStatus: { ...typography.bodySmall, color: colors.text, fontWeight: '500', textTransform: 'capitalize' },
  timelineTime: { ...typography.caption, color: colors.textTertiary },
})
