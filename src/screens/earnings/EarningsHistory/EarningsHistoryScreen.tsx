import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card, Badge } from '@/components/ui'
import { useEarnings } from '@/hooks'
import { colors, typography, spacing } from '@/theme'
import { formatCurrency, formatDate, formatTime } from '@/utils'

export function EarningsHistoryScreen() {
  const { history } = useEarnings()

  return (
    <ScreenWrapper>
      <Header title="Earnings History" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {history.length === 0 ? (
          <Text style={styles.empty}>No earnings history yet</Text>
        ) : (
          history.map(entry => (
            <View key={entry.id} style={styles.entryRow}>
              <View style={styles.entryLeft}>
                <Text style={styles.entryDescription}>{entry.description}</Text>
                <Text style={styles.entryDate}>
                  {formatDate(entry.createdAt, 'long')} at {formatTime(entry.createdAt)}
                </Text>
              </View>
              <View style={styles.entryRight}>
                <Text style={[styles.entryAmount, entry.type === 'bonus' && styles.bonusAmount]}>
                  {entry.type === 'adjustment' ? '-' : '+'}{formatCurrency(entry.amount)}
                </Text>
                <Badge label={entry.status} variant={entry.status === 'settled' ? 'success' : 'warning'} />
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  empty: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl },
  entryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.divider },
  entryLeft: { flex: 1, marginRight: spacing.md },
  entryRight: { alignItems: 'flex-end' },
  entryDescription: { ...typography.bodySmall, color: colors.text },
  entryDate: { ...typography.caption, color: colors.textTertiary, marginTop: 2 },
  entryAmount: { ...typography.body, fontWeight: '600', color: colors.success, marginBottom: spacing.xs },
  bonusAmount: { color: colors.warning },
})
