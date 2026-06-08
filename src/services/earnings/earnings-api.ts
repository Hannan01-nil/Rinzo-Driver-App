import { apiClient } from '../api-client'
import { ENDPOINTS } from '@/constants'
import type { TEarningsSummary, TEarningsEntry, TWeeklyEarnings, TWithdrawal, TApiResponse } from '@/types'

export const earningsApi = {
  getSummary() {
    return apiClient.get<TApiResponse<TEarningsSummary>>(ENDPOINTS.earnings.summary)
  },

  getHistory(page = 1, limit = 20) {
    return apiClient.get<TApiResponse<TEarningsEntry[]>>(ENDPOINTS.earnings.history, { params: { page, limit } })
  },

  getWeekly() {
    return apiClient.get<TApiResponse<TWeeklyEarnings[]>>(ENDPOINTS.earnings.weekly)
  },

  withdraw(amount: number, bankAccountId: string) {
    return apiClient.post<TApiResponse<TWithdrawal>>(ENDPOINTS.earnings.withdraw, { amount, bankAccountId })
  },

  getWithdrawals() {
    return apiClient.get<TApiResponse<TWithdrawal[]>>(ENDPOINTS.earnings.withdrawals)
  },
}
