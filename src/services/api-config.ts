import { API_BASE_URL as BASE_URL, API_TIMEOUT } from '@/constants'

export const apiConfig = {
  baseUrl: BASE_URL,
  timeout: API_TIMEOUT,
  retryCount: 3,
  retryDelay: 1000,
  isDev: __DEV__,
}

export function isApiError(error: unknown): error is { status: number; message: string; errors?: Record<string, string[]> } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error
  )
}
