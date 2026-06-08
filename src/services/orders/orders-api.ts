import { apiClient } from '../api-client'
import { ENDPOINTS, PAGINATION } from '@/constants'
import type { TOrder, TApiResponse, TNewPickupRequest } from '@/types'

export const ordersApi = {
  list(page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT) {
    return apiClient.get<TApiResponse<TOrder[]>>(ENDPOINTS.orders.list, { params: { page, limit } })
  },

  getActive() {
    return apiClient.get<TApiResponse<TOrder>>(ENDPOINTS.orders.active)
  },

  getById(id: string) {
    return apiClient.get<TApiResponse<TOrder>>(ENDPOINTS.orders.details(id))
  },

  acceptOrder(id: string) {
    return apiClient.post<TApiResponse<TOrder>>(ENDPOINTS.orders.accept(id))
  },

  markCollected(id: string) {
    return apiClient.post<TApiResponse<TOrder>>(ENDPOINTS.orders.collect(id))
  },

  markDelivered(id: string) {
    return apiClient.post<TApiResponse<TOrder>>(ENDPOINTS.orders.delivered(id))
  },

  updateStatus(id: string, status: string) {
    return apiClient.patch<TApiResponse<TOrder>>(ENDPOINTS.orders.status(id), { status })
  },
}
