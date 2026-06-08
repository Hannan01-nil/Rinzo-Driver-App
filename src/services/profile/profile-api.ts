import { apiClient } from '../api-client'
import { ENDPOINTS } from '@/constants'
import type { TDriverProfile, TPersonalInfo, TVehicleInfo, TPerformance, TBonusIncentive, TDailySummary, TApiResponse } from '@/types'

export const profileApi = {
  get() {
    return apiClient.get<TApiResponse<TDriverProfile>>(ENDPOINTS.profile.get)
  },

  update(data: Partial<TPersonalInfo>) {
    return apiClient.put<TApiResponse<TDriverProfile>>(ENDPOINTS.profile.update, data)
  },

  updateVehicle(data: Partial<TVehicleInfo>) {
    return apiClient.put<TApiResponse<TVehicleInfo>>(ENDPOINTS.profile.vehicle, data)
  },

  getPerformance() {
    return apiClient.get<TApiResponse<TPerformance>>(ENDPOINTS.profile.performance)
  },

  getBonuses() {
    return apiClient.get<TApiResponse<TBonusIncentive[]>>(ENDPOINTS.profile.bonuses)
  },

  getDailySummary() {
    return apiClient.get<TApiResponse<TDailySummary[]>>(ENDPOINTS.profile.dailySummary)
  },

  getDailyDetails(date: string) {
    return apiClient.get<TApiResponse<TDailySummary>>(ENDPOINTS.profile.dailyDetails(date))
  },
}
