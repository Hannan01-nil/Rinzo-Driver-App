import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card } from '@/components/ui'
import { StatsTile } from '@/components/data-display/stats-tile'
import { colors, typography, spacing } from '@/theme'
import { formatCurrency, formatDate } from '@/utils'
import { mockDailySummaries } from '@/data/profile'

export function DailyDetailsScreen() {
  const route = useRoute()
  const { date } = route.params as { date: string }
  const day = mockDailySummaries.find(d => d.date === date)

  if (!day) {
    return (
      <ScreenWrapper>
        <Header title="Daily Details" />
        <Text style={styles.notFound}>No data for this date</Text>
      </ScreenWrapper>
    )
  }

  return (
    <ScreenWrapper>
      <Header title={formatDate(day.date, 'long')} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.statsGrid}>
          <StatsTile label="Deliveries" value={day.deliveries} color={colors.primary} />
          <View style={{ width: spacing.md }} />
          <StatsTile label="Earnings" value={formatCurrency(day.earnings)} color={colors.success} />
        </View>

        <View style={styles.statsGrid}>
          <StatsTile label="Distance" value={`${day.distance} km`} color={colors.info} />
          <View style={{ width: spacing.md }} />
          <StatsTile label="Hours" value={`${day.hours}h`} color={colors.warning} />
        </View>

        <View style={styles.statsGrid}>
          <StatsTile label="Rating" value={`★ ${day.rating}`} color="#FFC107" />
          <View style={{ width: spacing.md }} />
          <StatsTile label="Tips" value={formatCurrency(day.tips)} color={colors.success} />
        </View>

        {day.bonuses > 0 && (
          <Card style={{ marginTop: spacing.lg }}>
            <Text style={styles.bonusLabel}>Bonuses Earned</Text>
            <Text style={styles.bonusAmount}>{formatCurrency(day.bonuses)}</Text>
          </Card>
        )}
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  notFound: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl },
  statsGrid: { flexDirection: 'row', marginBottom: spacing.md },
  bonusLabel: { ...typography.bodySmall, color: colors.textSecondary },
  bonusAmount: { ...typography.h3, color: colors.warning, marginTop: spacing.xs },
})
