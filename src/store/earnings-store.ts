import { create } from 'zustand'
import type { TEarningsSummary, TEarningsEntry, TWeeklyEarnings, TWithdrawal } from '@/types'

interface TEarningsStore {
  summary: TEarningsSummary | null
  weekly: TWeeklyEarnings[]
  history: TEarningsEntry[]
  withdrawals: TWithdrawal[]
  isLoading: boolean
  setSummary: (summary: TEarningsSummary | null) => void
  setWeekly: (weekly: TWeeklyEarnings[]) => void
  setHistory: (history: TEarningsEntry[]) => void
  setWithdrawals: (withdrawals: TWithdrawal[]) => void
  setLoading: (value: boolean) => void
}

export const earningsStore = create<TEarningsStore>((set) => ({
  summary: null,
  weekly: [],
  history: [],
  withdrawals: [],
  isLoading: false,
  setSummary: (summary) => set({ summary }),
  setWeekly: (weekly) => set({ weekly }),
  setHistory: (history) => set({ history }),
  setWithdrawals: (withdrawals) => set({ withdrawals }),
  setLoading: (isLoading) => set({ isLoading }),
}))
