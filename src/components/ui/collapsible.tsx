import { View, Text, StyleSheet } from 'react-native'
import { colors, typography, spacing } from '@/theme'

interface CollapsibleProps {
  title: string
  children: React.ReactNode
}

export function Collapsible({ title, children }: CollapsibleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h5,
    color: colors.text,
    marginBottom: spacing.sm,
  },
})
