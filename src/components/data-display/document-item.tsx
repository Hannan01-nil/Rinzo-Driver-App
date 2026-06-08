import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, typography, spacing, borderRadius } from '@/theme'
import type { TDocument } from '@/types'

interface DocumentItemProps {
  document: TDocument
  onPress: (id: string) => void
}

export function DocumentItem({ document: doc, onPress }: DocumentItemProps) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onPress(doc.id)}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>{doc.fileType === 'pdf' ? '📄' : '🖼️'}</Text>
      <View style={styles.info}>
        <Text style={styles.label}>{doc.label}</Text>
        <Text style={styles.type}>{doc.type.replace(/_/g, ' ')}</Text>
      </View>
      <View style={[styles.statusDot, styles[`status_${doc.status}`]]} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  icon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  label: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  type: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
    textTransform: 'capitalize',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: spacing.sm,
  },
  status_pending: {
    backgroundColor: colors.warning,
  },
  status_approved: {
    backgroundColor: colors.success,
  },
  status_rejected: {
    backgroundColor: colors.error,
  },
  status_expired: {
    backgroundColor: colors.textTertiary,
  },
})
