import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui'
import { DocumentItem } from '@/components/data-display/document-item'
import { useDocuments } from '@/hooks'
import { colors, typography, spacing } from '@/theme'

export function DocumentsScreen() {
  const router = useRouter()
  const { documents } = useDocuments()

  return (
    <ScreenWrapper>
      <Header title="Documents" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {documents.length === 0 ? (
          <Text style={styles.empty}>No documents uploaded yet</Text>
        ) : (
          documents.map(doc => (
            <View key={doc.id} style={{ marginBottom: spacing.md }}>
              <DocumentItem
                document={doc}
                onPress={(id) => router.push({ pathname: '/(tabs)/profile/documents/[id]', params: { id } })}
              />
            </View>
          ))
        )}

        <View style={{ marginTop: spacing.xl }}>
          <Button
            title="Upload New Document"
            onPress={() => router.push('/(tabs)/profile/documents/upload')}
            fullWidth
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  empty: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl },
})
