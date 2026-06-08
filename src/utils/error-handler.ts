import { Alert } from 'react-native'

interface TAppError {
  code?: string
  message: string
  errors?: Record<string, string[]>
}

export function handleApiError(error: unknown): TAppError {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const apiError = error as TAppError
    return {
      code: apiError.code,
      message: apiError.message || 'Something went wrong',
      errors: apiError.errors,
    }
  }
  return { message: 'An unexpected error occurred' }
}

export function showErrorAlert(error: unknown, title = 'Error') {
  const { message } = handleApiError(error)
  Alert.alert(title, message)
}
