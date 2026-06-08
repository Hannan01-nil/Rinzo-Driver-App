export interface TAuthUser {
  id: string
  phone: string
  name: string
  email?: string
  avatar?: string
  isVerified: boolean
  isOnboarded: boolean
}

export interface TAuthState {
  user: TAuthUser | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface TLoginRequest {
  phone: string
}

export interface TVerifyOtpRequest {
  phone: string
  otp: string
  deviceId?: string
}

export interface TAuthResponse {
  user: TAuthUser
  token: string
  refreshToken: string
}
