export interface TLoginPayload {
  phone: string
}

export interface TVerifyOtpPayload {
  phone: string
  otp: string
  deviceId?: string
}

export interface TRefreshTokenPayload {
  refreshToken: string
}
