import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackActions } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { SuccessAnimation } from '@/components/feedback/success-animation'
import { Button } from '@/components/ui'
import { spacing } from '@/theme'

export function OrderCollectedSuccessScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

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
            onPress={() => navigation.navigate('in-transit')}
            fullWidth
          />
          <View style={{ height: spacing.md }} />
          <Button
            title="Back to Orders"
            onPress={() => navigation.dispatch(StackActions.popToTop())}
            variant="outline"
            fullWidth
          />
        </View>
      </View>
    </ScreenWrapper>
  )
}
