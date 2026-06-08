import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card, Badge, Button } from '@/components/ui'
import { useDocuments } from '@/hooks'
import { colors, typography, spacing } from '@/theme'
import { formatDate, formatTime } from '@/utils'
import { DOCUMENT_TYPE_LABELS } from '@/constants'

export function DocumentViewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { documents } = useDocuments()
  const doc = documents.find(d => d.id === id)

  if (!doc) {
    return (
      <ScreenWrapper>
        <Header title="Document" />
        <Text style={styles.notFound}>Document not found</Text>
      </ScreenWrapper>
    )
  }

  return (
    <ScreenWrapper>
      <Header title={doc.label} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <View style={styles.headerRow}>
            <Text style={styles.documentIcon}>{doc.fileType === 'pdf' ? '📄' : '🖼️'}</Text>
            <View style={styles.documentInfo}>
              <Text style={styles.documentTitle}>{doc.label}</Text>
              <Text style={styles.documentType}>{DOCUMENT_TYPE_LABELS[doc.type]}</Text>
            </View>
            <Badge
              label={doc.status}
              variant={doc.status === 'approved' ? 'success' : doc.status === 'rejected' ? 'error' : 'warning'}
            />
          </View>

          <View style={styles.divider} />
          <Text style={styles.label}>Uploaded</Text>
          <Text style={styles.value}>{formatDate(doc.uploadedAt, 'long')} at {formatTime(doc.uploadedAt)}</Text>

          {doc.verifiedAt && (
            <>
              <Text style={styles.label}>Verified</Text>
              <Text style={styles.value}>{formatDate(doc.verifiedAt, 'long')}</Text>
            </>
          )}

          {doc.expiresAt && (
            <>
              <Text style={styles.label}>Expires</Text>
              <Text style={styles.value}>{formatDate(doc.expiresAt, 'long')}</Text>
            </>
          )}

          {doc.rejectionReason && (
            <>
              <Text style={styles.label}>Rejection Reason</Text>
              <Text style={[styles.value, styles.rejection]}>{doc.rejectionReason}</Text>
            </>
          )}
        </Card>

        {doc.status === 'rejected' && (
          <View style={{ marginTop: spacing.xl }}>
            <Button title="Re-upload Document" onPress={() => {}} fullWidth />
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  notFound: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  documentIcon: { fontSize: 36, marginRight: spacing.md },
  documentInfo: { flex: 1 },
  documentTitle: { ...typography.h5, color: colors.text },
  documentType: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.divider, marginVertical: spacing.md },
  label: { ...typography.caption, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: spacing.xxs, marginTop: spacing.md },
  value: { ...typography.body, color: colors.text },
  rejection: { color: colors.error },
})
