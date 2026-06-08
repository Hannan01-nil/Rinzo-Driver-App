import { View, Text, TextInput as RNTextInput, StyleSheet, type TextInputProps as RNTextInputProps } from 'react-native'
import { colors, typography, spacing, borderRadius } from '@/theme'

interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string
  error?: string
  disabled?: boolean
}

export function TextInput({ label, error, disabled, ...props }: TextInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[styles.input, error && styles.inputError, disabled && styles.inputDisabled]}
        placeholderTextColor={colors.placeholder}
        autoCapitalize="none"
        editable={!disabled}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.label,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    height: 48,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    ...typography.body,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
  },
  inputDisabled: {
    opacity: 0.6,
  },
  error: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xxs,
  },
})
