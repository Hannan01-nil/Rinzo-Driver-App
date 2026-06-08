export interface TEarningsSummary {
  today: number
  thisWeek: number
  thisMonth: number
  total: number
  pending: number
  availableForWithdrawal: number
}

export interface TEarningsEntry {
  id: string
  orderId: string
  orderNumber: string
  amount: number
  type: 'delivery' | 'bonus' | 'tip' | 'adjustment'
  status: 'pending' | 'settled'
  description: string
  createdAt: string
}

export interface TWithdrawalRequest {
  amount: number
  bankAccountId: string
}

export interface TWithdrawal {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  bankAccount: string
  requestedAt: string
  processedAt?: string
}

export interface TWeeklyEarnings {
  date: string
  day: string
  deliveries: number
  amount: number
  tips: number
  bonuses: number
}

export interface TEarningsState {
  summary: TEarningsSummary | null
  weekly: TWeeklyEarnings[]
  history: TEarningsEntry[]
  withdrawals: TWithdrawal[]
  isLoading: boolean
}
