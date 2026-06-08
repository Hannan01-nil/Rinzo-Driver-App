import { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card, Button, TextInput } from '@/components/ui'
import { useEarnings } from '@/hooks'
import { colors, typography, spacing } from '@/theme'
import { formatCurrency, isValidAmount } from '@/utils'

export function WithdrawScreen() {
  const { summary, requestWithdrawal } = useEarnings()
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const available = summary?.availableForWithdrawal ?? 0
  const amountNum = parseFloat(amount) || 0

  const handleWithdraw = async () => {
    if (!isValidAmount(amountNum) || amountNum > available) return
    setIsLoading(true)
    await requestWithdrawal(amountNum, 'bank_acc_001')
    setIsLoading(false)
  }

  return (
    <ScreenWrapper>
      <Header title="Withdraw" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <Text style={styles.availableText}>Available Balance</Text>
          <Text style={styles.availableAmount}>{formatCurrency(available)}</Text>
        </Card>

        <TextInput
          label="Withdrawal Amount"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          keyboardType="numeric"
          error={
            amountNum > available ? 'Amount exceeds available balance' :
            amountNum > 0 && !isValidAmount(amountNum) ? 'Enter a valid amount' : undefined
          }
        />

        <Text style={styles.info}>
          Amounts are transferred to your registered bank account within 24-48 hours.
        </Text>

        <Button
          title={`Withdraw ${amount ? formatCurrency(amountNum) : ''}`}
          onPress={handleWithdraw}
          disabled={!isValidAmount(amountNum) || amountNum > available}
          loading={isLoading}
          fullWidth
        />
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  availableText: { ...typography.bodySmall, color: colors.textSecondary },
  availableAmount: { ...typography.h2, color: colors.text, marginTop: spacing.xs },
  info: { ...typography.caption, color: colors.textTertiary, marginBottom: spacing.xl, lineHeight: 18 },
})
