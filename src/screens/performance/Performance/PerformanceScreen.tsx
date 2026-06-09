import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Card, Button } from '@/components/ui'
import { StatsTile } from '@/components/data-display/stats-tile'
import { colors, typography, spacing } from '@/theme'
import { mockPerformance } from '@/data/profile'

export function PerformanceScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const perf = mockPerformance

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Performance</Text>

        <View style={styles.statsGrid}>
          <StatsTile label="Rating" value={`★ ${perf.rating}`} color="#FFC107" />
          <View style={{ width: spacing.md }} />
          <StatsTile label="Deliveries" value={perf.totalDeliveries} color={colors.primary} />
        </View>

        <View style={styles.statsGrid}>
          <StatsTile label="On Time" value={`${perf.onTimeRate}%`} color={colors.success} />
          <View style={{ width: spacing.md }} />
          <StatsTile label="Acceptance" value={`${perf.acceptanceRate}%`} color={colors.info} />
        </View>

        <View style={styles.statsGrid}>
          <StatsTile label="Cancellation" value={`${perf.cancellationRate}%`} color={colors.error} />
          <View style={{ width: spacing.md }} />
          <StatsTile label="Streak" value={`${perf.currentStreak} days`} color={colors.warning} />
        </View>

        <Card style={{ marginTop: spacing.lg }}>
          <Text style={styles.sectionTitle}>Badges</Text>
          {perf.badges.length === 0 ? (
            <Text style={styles.emptyText}>No badges earned yet</Text>
          ) : (
            perf.badges.map((badge, index) => (
              <View key={badge.id} style={[styles.badgeRow, index < perf.badges.length - 1 && styles.badgeBorder]}>
                <Text style={styles.badgeIcon}>🏆</Text>
                <View>
                  <Text style={styles.badgeName}>{badge.name}</Text>
                  <Text style={styles.badgeDate}>Earned {badge.earnedAt}</Text>
                </View>
              </View>
            ))
          )}
        </Card>

        <View style={{ marginTop: spacing.xl, gap: spacing.md }}>
          <Button title="Daily Summary" onPress={() => navigation.navigate('performance/daily-summary')} variant="outline" fullWidth />
          <Button title="Bonus & Incentives" onPress={() => navigation.navigate('performance/bonus-incentives')} variant="outline" fullWidth />
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  title: { ...typography.h3, color: colors.text, marginTop: spacing.lg, marginBottom: spacing.xl },
  statsGrid: { flexDirection: 'row', marginBottom: spacing.md },
  sectionTitle: { ...typography.h5, color: colors.text, marginBottom: spacing.md },
  emptyText: { ...typography.bodySmall, color: colors.textSecondary },
  badgeRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md },
  badgeBorder: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  badgeIcon: { fontSize: 24, marginRight: spacing.md },
  badgeName: { ...typography.bodySmall, color: colors.text, fontWeight: '500' },
  badgeDate: { ...typography.caption, color: colors.textTertiary },
})
