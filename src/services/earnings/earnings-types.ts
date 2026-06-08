export interface TWithdrawPayload {
  amount: number
  bankAccountId: string
}

export interface TEarningsHistoryParams {
  page?: number
  limit?: number
  startDate?: string
  endDate?: string
  type?: 'delivery' | 'bonus' | 'tip' | 'adjustment'
}
