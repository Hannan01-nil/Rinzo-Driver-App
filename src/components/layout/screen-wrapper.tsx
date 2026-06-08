import { View, StyleSheet, type ViewStyle, type StyleProp } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/theme'

interface ScreenWrapperProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  noPadding?: boolean
}

export function ScreenWrapper({ children, style, noPadding }: ScreenWrapperProps) {
  return (
    <SafeAreaView style={[styles.safeArea, style]} edges={['top', 'bottom']}>
      <View style={[styles.container, noPadding && styles.noPadding]}>
        {children}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  noPadding: {
    paddingHorizontal: 0,
  },
})
