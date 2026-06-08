import { Stack } from 'expo-router'

export default function ModalsLayout() {
  return (
    <Stack screenOptions={{ presentation: 'modal', headerShown: false }}>
      {/* Future: notification modal, settings modal, etc. */}
    </Stack>
  )
}
