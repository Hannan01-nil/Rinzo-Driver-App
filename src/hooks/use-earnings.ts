import { useCallback, useState } from 'react'
import type { TEarningsSummary, TWeeklyEarnings, TEarningsEntry, TWithdrawal } from '@/types'
import { mockEarningsSummary, mockWeeklyEarnings, mockEarningsHistory, mockWithdrawals } from '@/data/earnings'

export function useEarnings() {
  const [summary, setSummary] = useState<TEarningsSummary>(mockEarningsSummary)
  const [weekly, setWeekly] = useState<TWeeklyEarnings[]>(mockWeeklyEarnings)
  const [history, setHistory] = useState<TEarningsEntry[]>(mockEarningsHistory)
  const [withdrawals, setWithdrawals] = useState<TWithdrawal[]>(mockWithdrawals)
  const [isLoading, setIsLoading] = useState(false)

  const fetchSummary = useCallback(async () => {
    setIsLoading(true)
    try {
      // Future: const res = await earningsApi.getSummary()
      // setSummary(res.data)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const requestWithdrawal = useCallback(async (amount: number, bankAccountId: string) => {
    try {
      // Future: const res = await earningsApi.withdraw(amount, bankAccountId)
      return true
    } catch {
      return false
    }
  }, [])

  return { summary, weekly, history, withdrawals, isLoading, fetchSummary, requestWithdrawal }
}
