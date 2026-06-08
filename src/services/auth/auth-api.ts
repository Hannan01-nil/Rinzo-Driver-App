import { apiClient } from '../api-client'
import { ENDPOINTS } from '@/constants'
import type { TLoginRequest, TVerifyOtpRequest, TAuthResponse } from '@/types'

export const authApi = {
  login(data: TLoginRequest) {
    return apiClient.post<TAuthResponse>(ENDPOINTS.auth.login, data)
  },

  verifyOtp(data: TVerifyOtpRequest) {
    return apiClient.post<TAuthResponse>(ENDPOINTS.auth.verifyOtp, data)
  },

  refreshToken(refreshToken: string) {
    return apiClient.post<{ token: string; refreshToken: string }>(ENDPOINTS.auth.refreshToken, { refreshToken })
  },

  logout() {
    return apiClient.post<void>(ENDPOINTS.auth.logout)
  },

  getProfile() {
    return apiClient.get<TAuthResponse['user']>(ENDPOINTS.auth.profile)
  },
}
