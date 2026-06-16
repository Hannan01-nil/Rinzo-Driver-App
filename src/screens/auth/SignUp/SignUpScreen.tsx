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
  white: '#FFFFFF',
}

export function SignUpScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignUp = useCallback(() => {
    // Demo flow: auto login on signup
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

            <View style={styles.logoContainer}>
              <Image
                source={require('@/assets/images/DriverAppImages/image1.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.headerTitle}>Create Account</Text>
              <Text style={styles.headerSubtitle}>Sign up to get started as a driver</Text>

              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Rahul Sharma"
                placeholderTextColor={COLORS.inputText}
                value={name}
                onChangeText={setName}
                autoCorrect={false}
              />

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
                placeholder="Create password"
                placeholderTextColor={COLORS.inputText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor={COLORS.inputText}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignUp}
                activeOpacity={0.85}
              >
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginLinkButton}
                onPress={() => navigation.navigate('login')}
                activeOpacity={0.85}
              >
                <Text style={styles.loginLinkText}>
                  Already have an account? <Text style={styles.loginHighlight}>Login</Text>
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomSpacer} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}

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
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_WIDTH * 0.4,
    maxHeight: 100,
  },
  formSection: {
    width: '100%',
    maxWidth: FORM_MAX_WIDTH,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Poppins_700Bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
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
  signUpButton: {
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  signUpButtonText: {
    color: COLORS.buttonText,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
  },
  loginLinkButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 10,
  },
  loginLinkText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#6B7280',
  },
  loginHighlight: {
    color: COLORS.primary,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  bottomSpacer: {
    height: 40,
  },
})
