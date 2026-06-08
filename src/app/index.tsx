import { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { colors } from '@/theme'

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    // Future: check auth state, redirect accordingly
    const isAuthenticated = false
    if (isAuthenticated) {
      router.replace('/(tabs)/home')
    } else {
      router.replace('/(auth)/login')
    }
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  )
}
