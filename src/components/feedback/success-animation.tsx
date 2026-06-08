import { View, Text, StyleSheet } from 'react-native'
import { colors, typography, spacing } from '@/theme'

interface SuccessAnimationProps {
  title: string
  message: string
}

export function SuccessAnimation({ title, message }: SuccessAnimationProps) {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.checkmark}>✓</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
  },
  circle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  checkmark: {
    fontSize: 32,
    color: colors.success,
    fontWeight: '700',
  },
  title: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
})
