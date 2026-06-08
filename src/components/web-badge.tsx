import { Text, StyleSheet } from 'react-native'
import { colors } from '@/theme'

interface WebBadgeProps {
  children?: React.ReactNode
}

export function WebBadge({ children }: WebBadgeProps) {
  return <Text style={styles.badge}>{children ?? 'WEB'}</Text>
}

const styles = StyleSheet.create({
  badge: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
})
