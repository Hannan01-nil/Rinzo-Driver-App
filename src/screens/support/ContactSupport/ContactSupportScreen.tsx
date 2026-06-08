import { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card, Button, TextInput } from '@/components/ui'
import { colors, typography, spacing } from '@/theme'

export function ContactSupportScreen() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [orderId, setOrderId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!subject.trim() || !message.trim()) return
    setIsLoading(true)
    setIsLoading(false)
  }

  return (
    <ScreenWrapper>
      <Header title="Contact Support" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <TextInput label="Subject" value={subject} onChangeText={setSubject} placeholder="Brief title" />
          <TextInput label="Message" value={message} onChangeText={setMessage} placeholder="Describe your issue..." multiline />
          <TextInput label="Order ID (optional)" value={orderId} onChangeText={setOrderId} placeholder="e.g. RZ-2024-001" />

          <Button
            title="Submit"
            onPress={handleSubmit}
            disabled={!subject.trim() || !message.trim()}
            loading={isLoading}
            fullWidth
          />
        </Card>

        <Card style={{ marginTop: spacing.lg }}>
          <Text style={styles.otherTitle}>Other ways to reach us</Text>
          <Text style={styles.otherText}>📞 +91 1800-123-4567</Text>
          <Text style={styles.otherText}>✉️ support@rinzo.com</Text>
          <Text style={styles.otherText}>💬 Live chat: rinzo.com/chat</Text>
        </Card>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  otherTitle: { ...typography.label, color: colors.textSecondary, marginBottom: spacing.md },
  otherText: { ...typography.body, color: colors.text, marginBottom: spacing.sm },
})
