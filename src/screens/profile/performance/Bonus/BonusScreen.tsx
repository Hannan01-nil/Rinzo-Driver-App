import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card, Badge } from '@/components/ui'
import { colors, typography, spacing } from '@/theme'
import { formatCurrency } from '@/utils'
import { mockBonuses } from '@/data/profile'

export function BonusScreen() {
  const bonuses = mockBonuses

  return (
    <ScreenWrapper>
      <Header title="Bonus & Incentives" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {bonuses.length === 0 ? (
          <Text style={styles.empty}>No active bonuses or incentives</Text>
        ) : (
          bonuses.map(bonus => (
            <Card key={bonus.id} style={{ marginBottom: spacing.md }}>
              <View style={styles.headerRow}>
                <Text style={styles.bonusTitle}>{bonus.title}</Text>
                <Badge label={bonus.type} variant={bonus.type === 'bonus' ? 'success' : bonus.type === 'challenge' ? 'info' : 'warning'} />
              </View>
              <Text style={styles.description}>{bonus.description}</Text>

              <View style={styles.progressSection}>
                <View style={styles.progressRow}>
                  <Text style={styles.progressText}>
                    {bonus.progress} / {bonus.target}
                  </Text>
                  <Text style={styles.rewardText}>{formatCurrency(bonus.reward)}</Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${(bonus.progress / bonus.target) * 100}%` }]} />
                </View>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  empty: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bonusTitle: { ...typography.h5, color: colors.text, flex: 1 },
  description: { ...typography.bodySmall, color: colors.textSecondary, marginTop: spacing.sm },
  progressSection: { marginTop: spacing.lg },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs },
  progressText: { ...typography.caption, color: colors.textSecondary },
  rewardText: { ...typography.caption, color: colors.primary, fontWeight: '600' },
  progressBarBg: { height: 8, backgroundColor: colors.backgroundTertiary, borderRadius: 4 },
  progressBarFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
})
