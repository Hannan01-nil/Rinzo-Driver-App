import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { SuccessAnimation } from '@/components/feedback/success-animation'
import { Button } from '@/components/ui'
import { spacing } from '@/theme'

export function OrderCollectedSuccessScreen() {
  const router = useRouter()

  return (
    <ScreenWrapper>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <SuccessAnimation
          title="Order Collected!"
          message="The clothes have been picked up. Head to the laundry."
        />
        <View style={{ marginTop: spacing.xxl }}>
          <Button
            title="Start Transit"
            onPress={() => router.push('/(tabs)/orders/in-transit')}
            fullWidth
          />
          <View style={{ height: spacing.md }} />
          <Button
            title="Back to Orders"
            onPress={() => router.push('/(tabs)/orders')}
            variant="outline"
            fullWidth
          />
        </View>
      </View>
    </ScreenWrapper>
  )
}
