import { apiClient } from '../api-client'
import { ENDPOINTS } from '@/constants'
import type { TApiResponse } from '@/types'

export interface TContactSupportPayload {
  subject: string
  message: string
  orderId?: string
  attachments?: string[]
}

export const supportApi = {
  contact(data: TContactSupportPayload) {
    return apiClient.post<TApiResponse<void>>(ENDPOINTS.support.contact, data)
  },
}
