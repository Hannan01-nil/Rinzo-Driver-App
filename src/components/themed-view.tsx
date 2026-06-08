import { View, StyleSheet, type ViewStyle, type StyleProp } from 'react-native'
import { colors } from '@/theme'

interface ThemedViewProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  type?: string
}

export function ThemedView({ children, style, type: _type }: ThemedViewProps) {
  return (
    <View
      style={[
        styles.view,
        _type === 'backgroundElement' && styles.backgroundElement,
        style,
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.background,
  },
  backgroundElement: {
    backgroundColor: colors.backgroundTertiary,
  },
})
