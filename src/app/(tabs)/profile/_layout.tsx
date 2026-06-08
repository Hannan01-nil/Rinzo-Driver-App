import { Stack } from 'expo-router'
import { colors } from '@/theme'

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Profile' }} />
      <Stack.Screen name="personal-information" options={{ title: 'Personal Information' }} />
      <Stack.Screen name="vehicle-information" options={{ title: 'Vehicle Information' }} />
      <Stack.Screen name="documents/index" options={{ title: 'Documents' }} />
      <Stack.Screen name="documents/upload" options={{ title: 'Upload Document' }} />
      <Stack.Screen name="documents/[id]" options={{ title: 'Document' }} />
      <Stack.Screen name="finance/bank-details" options={{ title: 'Bank Details' }} />
      <Stack.Screen name="performance/index" options={{ title: 'Performance' }} />
      <Stack.Screen name="performance/bonus-incentives" options={{ title: 'Bonus & Incentives' }} />
      <Stack.Screen name="performance/daily-summary" options={{ title: 'Daily Summary' }} />
      <Stack.Screen name="performance/daily-details" options={{ title: 'Daily Details' }} />
      <Stack.Screen name="support/contact" options={{ title: 'Contact Support' }} />
    </Stack>
  )
}
