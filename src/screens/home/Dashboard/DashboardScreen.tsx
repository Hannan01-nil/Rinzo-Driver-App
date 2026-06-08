import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Card, Button } from '@/components/ui'
import { StatsTile } from '@/components/data-display/stats-tile'
import { OrderCard } from '@/components/data-display/order-card'
import { useOrders, useEarnings } from '@/hooks'
import { colors, typography, spacing } from '@/theme'
import { formatCurrency } from '@/utils'

export function DashboardScreen() {
  const router = useRouter()
  const { orders } = useOrders()
  const { summary } = useEarnings()

  const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled')

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.greeting}>Good morning,</Text>
        <Text style={styles.name}>Mohamed</Text>

        <View style={styles.summaryRow}>
          <StatsTile label="Today" value={formatCurrency(summary?.today ?? 0)} color={colors.primary} />
          <View style={{ width: spacing.md }} />
          <StatsTile label="This Week" value={formatCurrency(summary?.thisWeek ?? 0)} color={colors.success} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Deliveries</Text>
        </View>

        {activeOrders.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>No active deliveries. New pickup requests will appear here.</Text>
          </Card>
        ) : (
          activeOrders.map(order => (
            <View key={order.id} style={{ marginBottom: spacing.md }}>
              <OrderCard order={order} onPress={(id) => router.push({ pathname: '/(tabs)/home/order-tracking', params: { orderId: id } })} />
            </View>
          ))
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        <Button
          title="New Pickup Request"
          onPress={() => router.push('/(tabs)/home/new-pickup-request')}
          fullWidth
        />
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  greeting: { ...typography.body, color: colors.textSecondary, marginTop: spacing.lg },
  name: { ...typography.h2, color: colors.text, marginBottom: spacing.xl },
  summaryRow: { flexDirection: 'row', marginBottom: spacing.xxl },
  sectionHeader: { marginBottom: spacing.md, marginTop: spacing.lg },
  sectionTitle: { ...typography.h5, color: colors.text },
  emptyText: { ...typography.bodySmall, color: colors.textSecondary, textAlign: 'center', paddingVertical: spacing.lg },
})
