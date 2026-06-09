import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card } from '@/components/ui'
import { StatsTile } from '@/components/data-display/stats-tile'
import { colors, typography, spacing } from '@/theme'
import { formatCurrency, formatDate } from '@/utils'
import { mockDailySummaries } from '@/data/profile'

export function DailySummaryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const summaries = mockDailySummaries

  return (
    <ScreenWrapper>
      <Header title="Daily Summary" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {summaries.map((day) => (
          <Card
            key={day.date}
            style={{ marginBottom: spacing.md }}
          >
            <Text
              style={styles.date}
              onPress={() => navigation.navigate('performance/daily-details', { date: day.date })}
            >
              {formatDate(day.date, 'long')}
            </Text>

            <View style={styles.statsGrid}>
              <StatsTile label="Deliveries" value={day.deliveries} color={colors.primary} />
              <View style={{ width: spacing.sm }} />
              <StatsTile label="Earnings" value={formatCurrency(day.earnings)} color={colors.success} />
            </View>

            <View style={styles.statsGrid}>
              <StatsTile label="Rating" value={`★ ${day.rating}`} color="#FFC107" />
              <View style={{ width: spacing.sm }} />
              <StatsTile label="Distance" value={`${day.distance} km`} color={colors.info} />
            </View>
          </Card>
        ))}
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  date: { ...typography.h5, color: colors.text, marginBottom: spacing.md },
  statsGrid: { flexDirection: 'row', marginBottom: spacing.sm },
})
