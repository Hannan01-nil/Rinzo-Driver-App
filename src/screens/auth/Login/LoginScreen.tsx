import { useState, useCallback } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Svg, { Path } from 'react-native-svg'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const COLORS = {
  background: '#F8F7FC',
  primary: '#8457E5',
  buttonText: '#FFFFFF',
  inputBackground: '#FFFFFF',
  inputBorder: '#E5E7EB',
  labelColor: '#1F2937',
  inputText: '#9CA3AF',
  dividerLine: '#E5E7EB',
  dividerText: '#9CA3AF',
  white: '#FFFFFF',
}

function GoogleIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 48 48">
      <Path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <Path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <Path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <Path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </Svg>
  )
}

export function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const [phone, setPhone] = useState('')

  const handleLogin = useCallback(() => {
    navigation.navigate('otp-verification', { phone })
  }, [navigation])

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.topSpacer} />

            <View style={styles.illustrationContainer}>
              <Image
                source={require('@/assets/images/DriverAppImages/image.png')}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>

            <View style={styles.logoContainer}>
              <Image
                source={require('@/assets/images/DriverAppImages/image1.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Phone number</Text>
              <TextInput
                style={styles.input}
                placeholder="+ 91 8777734343"
                placeholderTextColor={COLORS.inputText}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={15}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.85}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or sign in with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.75}>
                <GoogleIcon />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton} activeOpacity={0.75}>
                <FontAwesome name="facebook" size={22} color="#1877F2" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton} activeOpacity={0.75}>
                <AntDesign name="apple" size={22} color="#000000" />
              </TouchableOpacity>
            </View>

            <View style={styles.bottomSpacer} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}

const ILLUSTRATION_WIDTH = Math.min(360, SCREEN_WIDTH * 0.85)
const LOGO_WIDTH = Math.min(320, SCREEN_WIDTH * 0.45)
const FORM_MAX_WIDTH = 340
const FORM_PADDING = 24

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: FORM_PADDING,
  },
  topSpacer: {
    height: Platform.OS === 'ios' ? 40 : 32,
  },

  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  illustration: {
    width: ILLUSTRATION_WIDTH,
    height: ILLUSTRATION_WIDTH * 1.05,
    maxHeight: 325,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_WIDTH * 0.4,
    maxHeight: 100,
  },

  formSection: {
    width: '100%',
    maxWidth: FORM_MAX_WIDTH,
    marginTop: 32,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: COLORS.labelColor,
    marginBottom: 8,
  },

  input: {
    height: 50,
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 6,
    paddingHorizontal: 14,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#111827',
  },

  loginButton: {
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    width: '100%',
  },
  loginButtonText: {
    color: COLORS.buttonText,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: FORM_MAX_WIDTH,
    marginTop: 28,
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.dividerLine,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: COLORS.dividerText,
    marginHorizontal: 16,
  },

  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  bottomSpacer: {
    height: 40,
  },
})
