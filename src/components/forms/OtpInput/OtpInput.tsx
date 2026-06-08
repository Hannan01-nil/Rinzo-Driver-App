import { View, Text } from 'react-native'
import { styles } from './styles'
import type { OtpInputProps } from './types'

export function OtpInput({ value, length = 4 }: OtpInputProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length }, (_, i) => (
        <View key={i} style={styles.box}>
          <Text style={styles.boxText}>{value[i] ?? ''}</Text>
        </View>
      ))}
    </View>
  )
}
