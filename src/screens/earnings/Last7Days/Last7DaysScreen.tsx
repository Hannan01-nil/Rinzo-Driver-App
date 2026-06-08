import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card } from '@/components/ui'
import { BarChart } from '@/components/charts/bar-chart'
import { useEarnings } from '@/hooks'
import { colors, typography, spacing } from '@/theme'
import { formatCurrency } from '@/utils'

export function Last7DaysScreen() {
  const { summary, weekly } = useEarnings()

  return (
    <ScreenWrapper>
      <Header title="Last 7 Days" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <Text style={styles.totalLabel}>Week Total</Text>
          <Text style={styles.totalAmount}>{formatCurrency(summary?.thisWeek ?? 0)}</Text>
        </Card>

        <Card style={{ marginTop: spacing.lg }}>
          <BarChart
            data={weekly.map(w => ({ label: w.day.slice(0, 3), value: w.amount }))}
            barColor={colors.primary}
          />
        </Card>

        {weekly.map((day, index) => (
          <View key={index} style={styles.dayRow}>
            <View>
              <Text style={styles.dayName}>{day.day}</Text>
              <Text style={styles.dayDeliveries}>{day.deliveries} deliveries</Text>
            </View>
            <View style={styles.dayEarnings}>
              <Text style={styles.dayAmount}>{formatCurrency(day.amount)}</Text>
              {day.tips > 0 && <Text style={styles.dayTips}>+{formatCurrency(day.tips)} tips</Text>}
            </View>
          </View>
        ))}
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  totalLabel: { ...typography.bodySmall, color: colors.textSecondary },
  totalAmount: { ...typography.h2, color: colors.text, marginTop: spacing.xs },
  dayRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.divider },
  dayName: { ...typography.body, color: colors.text, fontWeight: '500' },
  dayDeliveries: { ...typography.caption, color: colors.textTertiary },
  dayEarnings: { alignItems: 'flex-end' },
  dayAmount: { ...typography.body, color: colors.success, fontWeight: '600' },
  dayTips: { ...typography.caption, color: colors.textTertiary },
})
