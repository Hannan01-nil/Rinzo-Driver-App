import { Stack } from 'expo-router'
import { colors } from '@/theme'

export default function OrdersLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Orders' }} />
      <Stack.Screen name="collect-clothes" options={{ title: 'Collect Clothes' }} />
      <Stack.Screen name="order-collected-success" options={{ title: 'Collected', headerBackVisible: false }} />
      <Stack.Screen name="in-transit" options={{ title: 'In Transit' }} />
      <Stack.Screen name="order-at-laundry" options={{ title: 'At Laundry' }} />
      <Stack.Screen name="delivered-success" options={{ title: 'Delivered', headerBackVisible: false }} />
    </Stack>
  )
}
