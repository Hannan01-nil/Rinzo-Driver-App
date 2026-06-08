import { Stack } from 'expo-router'
import { colors } from '@/theme'

export default function EarningsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Earnings' }} />
      <Stack.Screen name="withdraw" options={{ title: 'Withdraw' }} />
      <Stack.Screen name="last-7-days" options={{ title: 'Last 7 Days' }} />
      <Stack.Screen name="earnings-history" options={{ title: 'Earnings History' }} />
    </Stack>
  )
}
