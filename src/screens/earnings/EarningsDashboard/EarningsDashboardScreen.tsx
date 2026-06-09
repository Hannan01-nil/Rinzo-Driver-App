import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Card, Button } from '@/components/ui'
import { EarningsCard } from '@/components/data-display/earnings-card'
import { BarChart } from '@/components/charts/bar-chart'
import { useEarnings } from '@/hooks'
import { colors, typography, spacing } from '@/theme'
import { formatCurrency } from '@/utils'

export function EarningsDashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const { summary, weekly } = useEarnings()

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Earnings Dashboard</Text>

        <View style={styles.summaryGrid}>
          <EarningsCard title="Today" amount={summary?.today ?? 0} />
          <View style={{ width: spacing.md }} />
          <EarningsCard title="This Week" amount={summary?.thisWeek ?? 0} />
        </View>

        <View style={styles.summaryGrid}>
          <EarningsCard title="This Month" amount={summary?.thisMonth ?? 0} />
          <View style={{ width: spacing.md }} />
          <EarningsCard title="Total" amount={summary?.total ?? 0} />
        </View>

        <Card style={{ marginTop: spacing.lg }}>
          <Text style={styles.availableLabel}>Available for Withdrawal</Text>
          <Text style={styles.availableAmount}>{formatCurrency(summary?.availableForWithdrawal ?? 0)}</Text>
          <Button
            title="Withdraw"
            onPress={() => navigation.navigate('withdraw')}
            fullWidth
          />
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <Button title="Details" onPress={() => navigation.navigate('last-7-days')} variant="ghost" size="sm" />
        </View>

        <Card>
          <BarChart
            data={weekly.map(w => ({ label: w.day.slice(0, 3), value: w.amount }))}
            barColor={colors.primary}
          />
        </Card>

        <View style={{ marginTop: spacing.lg }}>
          <Button
            title="View Full History"
            onPress={() => navigation.navigate('earnings-history')}
            variant="outline"
            fullWidth
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  title: { ...typography.h3, color: colors.text, marginTop: spacing.lg, marginBottom: spacing.xl },
  summaryGrid: { flexDirection: 'row', marginBottom: spacing.md },
  availableLabel: { ...typography.bodySmall, color: colors.textSecondary },
  availableAmount: { ...typography.h2, color: colors.text, marginVertical: spacing.md },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xl, marginBottom: spacing.md },
  sectionTitle: { ...typography.h5, color: colors.text },
})
