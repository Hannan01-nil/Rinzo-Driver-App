export interface TApiResponse<T> {
  success: boolean
  data: T
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface TApiError {
  success: false
  message: string
  code?: string
  errors?: Record<string, string[]>
}

export type TApiResult<T> = TApiResponse<T> | TApiError

export interface TRequestConfig {
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
  timeout?: number
}
