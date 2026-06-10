import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './styles'
import type { CustomKeypadProps } from './types'

const ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
]

export function CustomKeypad({ onPress, onDelete }: CustomKeypadProps) {
  return (
    <View style={styles.container}>
      {ROWS.map((row, ri) => (
        <View key={ri} style={styles.row}>
          {row.map((digit) => (
            <TouchableOpacity
              key={digit}
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => onPress(digit)}
            >
              <Text style={styles.buttonText}>{digit}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <View style={styles.row}>
        <View style={styles.spacerSlot} />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => onPress('0')}
        >
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          activeOpacity={0.7}
          onPress={onDelete}
        >
          <Ionicons name="backspace-outline" size={22} color="#555555" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
