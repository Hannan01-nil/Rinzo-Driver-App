import { apiClient } from '../api-client'
import { ENDPOINTS } from '@/constants'
import type { TBankAccount, TBankDetailsRequest, TApiResponse } from '@/types'

export const financeApi = {
  getBankAccounts() {
    return apiClient.get<TApiResponse<TBankAccount[]>>(ENDPOINTS.finance.bankAccounts)
  },

  addBankAccount(data: TBankDetailsRequest) {
    return apiClient.post<TApiResponse<TBankAccount>>(ENDPOINTS.finance.addAccount, data)
  },

  deleteBankAccount(id: string) {
    return apiClient.delete<void>(ENDPOINTS.finance.deleteAccount(id))
  },
}
