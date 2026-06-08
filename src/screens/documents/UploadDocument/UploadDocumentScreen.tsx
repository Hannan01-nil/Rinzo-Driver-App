import { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card, Button } from '@/components/ui'
import { colors, typography, spacing } from '@/theme'
import { DOCUMENT_TYPE_LABELS, DOCUMENT_TYPE_DESCRIPTIONS } from '@/constants'
import type { DocumentType } from '@/types'

const DOCUMENT_TYPES = Object.entries(DOCUMENT_TYPE_LABELS) as [DocumentType, string][]

export function UploadDocumentScreen() {
  const [selectedType, setSelectedType] = useState<DocumentType | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async () => {
    if (!selectedType) return
    setIsUploading(true)
    setIsUploading(false)
  }

  return (
    <ScreenWrapper>
      <Header title="Upload Document" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.instruction}>Select the document type you want to upload:</Text>

        {DOCUMENT_TYPES.map(([type, label]) => {
          const isSelected = selectedType === type
          return (
            <Card
              key={type}
              style={[styles.typeCard, isSelected && styles.typeCardSelected]}
            >
              <Text
                style={[styles.typeLabel, isSelected && styles.typeLabelSelected]}
                onPress={() => setSelectedType(type)}
              >
                {label}
              </Text>
              <Text style={styles.typeDesc}>{DOCUMENT_TYPE_DESCRIPTIONS[type]}</Text>
            </Card>
          )
        })}

        <View style={{ marginTop: spacing.xxl }}>
          <Button
            title="Choose File & Upload"
            onPress={handleUpload}
            disabled={!selectedType}
            loading={isUploading}
            fullWidth
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  instruction: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.xl, marginTop: spacing.md },
  typeCard: { marginBottom: spacing.md, borderWidth: 1.5, borderColor: colors.cardBorder },
  typeCardSelected: { borderColor: colors.primary },
  typeLabel: { ...typography.body, color: colors.text, fontWeight: '600' },
  typeLabelSelected: { color: colors.primary },
  typeDesc: { ...typography.caption, color: colors.textTertiary, marginTop: spacing.xs },
})
