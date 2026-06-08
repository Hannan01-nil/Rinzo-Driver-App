import { useCallback, useState } from 'react'
import type { TAuthUser } from '@/types'
import { authStore } from '@/store/auth-store'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { user, isAuthenticated, token } = authStore()

  const login = useCallback(async (phone: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // Future: await authApi.login({ phone })
      return true
    } catch (err) {
      setError('Login failed')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const verifyOtp = useCallback(async (phone: string, otp: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // Future: const res = await authApi.verifyOtp({ phone, otp })
      return true
    } catch (err) {
      setError('Invalid OTP')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    // Future: await authApi.logout()
    authStore.setState({ user: null, token: null, isAuthenticated: false })
  }, [])

  return { user, isAuthenticated, token, isLoading, error, login, verifyOtp, logout }
}
