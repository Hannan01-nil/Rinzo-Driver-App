import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { SuccessAnimation } from '@/components/feedback/success-animation'
import { Button } from '@/components/ui'
import { spacing } from '@/theme'

export function DeliveredSuccessScreen() {
  const router = useRouter()

  return (
    <ScreenWrapper>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <SuccessAnimation
          title="Delivered Successfully!"
          message="The order has been delivered. Great job!"
        />
        <View style={{ marginTop: spacing.xxl }}>
          <Button
            title="Back to Orders"
            onPress={() => router.push('/(tabs)/orders')}
            fullWidth
          />
        </View>
      </View>
    </ScreenWrapper>
  )
}
