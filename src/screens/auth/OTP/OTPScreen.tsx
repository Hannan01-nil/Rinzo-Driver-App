import { useState, useEffect, useCallback, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { authStore } from '@/store/auth-store'
import { Ionicons } from '@expo/vector-icons'
import { OtpInput } from '@/components/forms/OtpInput'
import { CustomKeypad } from '@/components/common/CustomKeypad'
import { OTP_LENGTH } from '@/constants'

const COLORS = {
  background: '#F8F7FC',
  textPrimary: '#1F1F1F',
  textSecondary: '#8A8A8A',
  textMuted: '#9CA3AF',
  iconColor: '#6B7280',
}

export function OTPScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const [otp, setOtp] = useState('')
  const [seconds, setSeconds] = useState(30)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (otp.length === OTP_LENGTH) {
      const timer = setTimeout(() => {
        authStore.getState().setAuthenticated(true)
        navigation.getParent()?.reset({
          index: 0,
          routes: [{ name: '(tabs)' }],
        })
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [otp])

  const handlePress = useCallback((digit: string) => {
    setOtp((prev) => (prev.length < OTP_LENGTH ? prev + digit : prev))
  }, [])

  const handleDelete = useCallback(() => {
    setOtp((prev) => prev.slice(0, -1))
  }, [])

  const handleBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <SafeAreaView style={s.safeArea}>
        <View style={s.header}>
          <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={22} color={COLORS.iconColor} />
          </TouchableOpacity>
        </View>

        <View style={s.content}>
          <Text style={s.title}>Enter Otp</Text>
          <Text style={s.subtitle}>
            We have sent a 4 digit code on +91{'\n'}
            87238344743
          </Text>

          <View style={s.otpWrapper}>
            <OtpInput value={otp} length={OTP_LENGTH} />
          </View>

          <Text style={s.resend}>
            Resent code 00:{seconds.toString().padStart(2, '0')} seconds
          </Text>
        </View>

        <View style={s.keypadWrapper}>
          <CustomKeypad onPress={handlePress} onDelete={handleDelete} />
        </View>
      </SafeAreaView>
    </View>
  )
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 8 : 16,
    height: 52,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    lineHeight: 28,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },
  otpWrapper: {
    alignItems: 'center',
    marginBottom: 12,
  },
  resend: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'right',
  },
  keypadWrapper: {
    marginTop: 'auto',
  },
})
