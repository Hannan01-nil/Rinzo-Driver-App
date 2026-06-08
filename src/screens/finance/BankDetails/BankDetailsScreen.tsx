import { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card, Button, TextInput, Badge } from '@/components/ui'
import { colors, typography, spacing } from '@/theme'

export function BankDetailsScreen() {
  const [bankName, setBankName] = useState('HDFC Bank')
  const [accountHolder, setAccountHolder] = useState('Mohamed Hannan')
  const [accountNumber, setAccountNumber] = useState('****1234')
  const [ifscCode, setIfscCode] = useState('HDFC0001234')

  return (
    <ScreenWrapper>
      <Header title="Bank Details" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <View style={styles.verifiedRow}>
            <Text style={styles.sectionLabel}>Default Account</Text>
            <Badge label="Verified" variant="success" />
          </View>

          <TextInput label="Bank Name" value={bankName} onChangeText={setBankName} />
          <TextInput label="Account Holder Name" value={accountHolder} onChangeText={setAccountHolder} />
          <TextInput label="Account Number" value={accountNumber} onChangeText={setAccountNumber} keyboardType="numeric" />
          <TextInput label="IFSC Code" value={ifscCode} onChangeText={setIfscCode} />

          <Button title="Save Bank Details" onPress={() => {}} fullWidth />
        </Card>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  verifiedRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  sectionLabel: { ...typography.label, color: colors.text },
})
