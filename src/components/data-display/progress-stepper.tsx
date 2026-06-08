import { View, Text, StyleSheet } from 'react-native'
import { colors, typography, spacing, borderRadius } from '@/theme'
import { ORDER_STATUS_LABELS, ORDER_STATUS_STEPS } from '@/constants'
import type { OrderStatus } from '@/types'

interface ProgressStepperProps {
  currentStatus: OrderStatus
}

export function ProgressStepper({ currentStatus }: ProgressStepperProps) {
  const currentIndex = ORDER_STATUS_STEPS.indexOf(currentStatus)

  return (
    <View style={styles.container}>
      {ORDER_STATUS_STEPS.map((status, index) => {
        const isCompleted = index <= currentIndex
        const isActive = index === currentIndex
        const isLast = index === ORDER_STATUS_STEPS.length - 1

        return (
          <View key={status} style={styles.stepRow}>
            <View style={styles.stepColumn}>
              <View
                style={[
                  styles.dot,
                  isActive && styles.dotActive,
                  isCompleted && styles.dotCompleted,
                ]}
              />
              {!isLast && (
                <View
                  style={[
                    styles.line,
                    isCompleted && styles.lineCompleted,
                  ]}
                />
              )}
            </View>
            <Text
              style={[
                styles.label,
                isActive && styles.labelActive,
                isCompleted && styles.labelCompleted,
              ]}
              numberOfLines={1}
            >
              {ORDER_STATUS_LABELS[status]}
            </Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepColumn: {
    alignItems: 'center',
    width: 24,
    marginRight: spacing.md,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.backgroundTertiary,
    borderWidth: 2,
    borderColor: colors.border,
  },
  dotActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  dotCompleted: {
    borderColor: colors.success,
    backgroundColor: colors.success,
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: 20,
    backgroundColor: colors.border,
    marginVertical: 2,
  },
  lineCompleted: {
    backgroundColor: colors.success,
  },
  label: {
    ...typography.caption,
    color: colors.textTertiary,
    paddingTop: 0,
    flex: 1,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  labelCompleted: {
    color: colors.success,
  },
})
