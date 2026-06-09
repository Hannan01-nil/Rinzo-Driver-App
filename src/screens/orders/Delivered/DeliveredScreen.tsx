import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackActions } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { SuccessAnimation } from '@/components/feedback/success-animation'
import { Button } from '@/components/ui'
import { spacing } from '@/theme'

export function DeliveredSuccessScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

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
            onPress={() => navigation.dispatch(StackActions.popToTop())}
            fullWidth
          />
        </View>
      </View>
    </ScreenWrapper>
  )
}
