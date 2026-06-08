import { API_BASE_URL, API_TIMEOUT } from '@/constants'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions {
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
  timeout?: number
}

let authToken: string | null = null

export function setAuthToken(token: string | null) {
  authToken = token
}

export function getAuthToken(): string | null {
  return authToken
}

async function request<T>(
  method: HttpMethod,
  endpoint: string,
  body?: unknown,
  options?: RequestOptions,
): Promise<T> {
  const url = new URL(`${API_BASE_URL}${endpoint}`)
  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...options?.headers,
  }
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), options?.timeout ?? API_TIMEOUT)

  try {
    const response = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw {
        status: response.status,
        message: errorData?.message ?? `Request failed with status ${response.status}`,
        errors: errorData?.errors,
      }
    }

    return response.json()
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw { status: 408, message: 'Request timed out' }
    }
    throw error
  }
}

export const apiClient = {
  get<T>(endpoint: string, options?: RequestOptions) {
    return request<T>('GET', endpoint, undefined, options)
  },
  post<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return request<T>('POST', endpoint, body, options)
  },
  put<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return request<T>('PUT', endpoint, body, options)
  },
  patch<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return request<T>('PATCH', endpoint, body, options)
  },
  delete<T>(endpoint: string, options?: RequestOptions) {
    return request<T>('DELETE', endpoint, undefined, options)
  },
}
