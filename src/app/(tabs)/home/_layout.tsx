import { Stack } from 'expo-router'
import { colors } from '@/theme'

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="new-pickup-request" options={{ title: 'New Pickup Request' }} />
      <Stack.Screen name="order-tracking" options={{ title: 'Order Tracking' }} />
    </Stack>
  )
}
