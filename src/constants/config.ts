export const APP_NAME = 'Rinzo Driver'

export const OTP_RESEND_INTERVAL = 30
export const OTP_LENGTH = 4
export const OTP_EXPIRY_SECONDS = 120

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
} as const

export const LOCATION = {
  UPDATE_INTERVAL_MS: 30000,
  DEFAULT_DELTA: { latitudeDelta: 0.01, longitudeDelta: 0.01 },
} as const

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@rinzo/auth_token',
  REFRESH_TOKEN: '@rinzo/refresh_token',
  USER_DATA: '@rinzo/user_data',
  ONBOARDING_DONE: '@rinzo/onboarding_done',
  THEME_PREFERENCE: '@rinzo/theme',
} as const

export const MAX_FILE_SIZE_MB = 10
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const SUPPORTED_DOCUMENT_TYPES = ['application/pdf', ...SUPPORTED_IMAGE_TYPES]
