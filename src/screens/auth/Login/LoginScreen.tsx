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
import { authStore } from '@/store/auth-store'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const COLORS = {
  background: '#F8F7FC',
  primary: '#8259D2',
  buttonText: '#FFFFFF',
  inputBackground: '#FFFFFF',
  inputBorder: '#E5E7EB',
  labelColor: '#1F2937',
  inputText: '#9CA3AF',
  dividerLine: '#E5E7EB',
  dividerText: '#9CA3AF',
  white: '#FFFFFF',
}


export function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = useCallback(() => {
    authStore.setState({ isAuthenticated: true })
    navigation.navigate('(tabs)')
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
              <Text style={styles.label}>Email ID</Text>
              <TextInput
                style={styles.input}
                placeholder="example_123@gmail.com"
                placeholderTextColor={COLORS.inputText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.inputText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
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

              <TouchableOpacity
                style={styles.signUpButton}
                onPress={() => {}}
                activeOpacity={0.85}
              >
                <Text style={styles.signUpButtonText}>Sign Up</Text>
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
    marginTop: -8,
    marginBottom: -30,
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
    marginTop: 12,
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
    marginBottom: 16,
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

  signUpButton: {
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  signUpButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
  },

  bottomSpacer: {
    height: 40,
  },
})
