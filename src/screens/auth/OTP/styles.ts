import { StyleSheet, Platform } from 'react-native'

const COLORS = {
  background: '#F8F7FC',
  textPrimary: '#1F1F1F',
  textSecondary: '#8A8A8A',
  textMuted: '#9CA3AF',
  iconColor: '#6B7280',
}

export const styles = StyleSheet.create({
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
