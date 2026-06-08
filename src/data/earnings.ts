import type { TEarningsSummary, TWeeklyEarnings, TEarningsEntry, TWithdrawal } from '@/types'

export const mockEarningsSummary: TEarningsSummary = {
  today: 850,
  thisWeek: 5400,
  thisMonth: 28500,
  total: 185000,
  pending: 3200,
  availableForWithdrawal: 4500,
}

export const mockWeeklyEarnings: TWeeklyEarnings[] = [
  { date: '2024-12-09', day: 'Mon', deliveries: 8, amount: 960, tips: 120, bonuses: 0 },
  { date: '2024-12-10', day: 'Tue', deliveries: 12, amount: 1440, tips: 180, bonuses: 200 },
  { date: '2024-12-11', day: 'Wed', deliveries: 10, amount: 1200, tips: 150, bonuses: 0 },
  { date: '2024-12-12', day: 'Thu', deliveries: 15, amount: 1800, tips: 220, bonuses: 100 },
  { date: '2024-12-13', day: 'Fri', deliveries: 11, amount: 1320, tips: 160, bonuses: 0 },
  { date: '2024-12-14', day: 'Sat', deliveries: 9, amount: 1080, tips: 130, bonuses: 0 },
  { date: '2024-12-15', day: 'Sun', deliveries: 7, amount: 840, tips: 90, bonuses: 0 },
]

export const mockEarningsHistory: TEarningsEntry[] = [
  { id: 'earn_001', orderId: 'ord_001', orderNumber: 'RZ-2024-001', amount: 150, type: 'delivery', status: 'settled', description: 'Delivery fee - RZ-2024-001', createdAt: '2024-12-15T10:30:00Z' },
  { id: 'earn_002', orderId: 'ord_002', orderNumber: 'RZ-2024-002', amount: 200, type: 'delivery', status: 'settled', description: 'Delivery fee - RZ-2024-002 (Express)', createdAt: '2024-12-15T11:45:00Z' },
  { id: 'earn_003', orderId: 'ord_001', orderNumber: 'RZ-2024-001', amount: 50, type: 'tip', status: 'settled', description: 'Tip from Rahul Sharma', createdAt: '2024-12-15T10:35:00Z' },
  { id: 'earn_004', orderId: 'ord_003', orderNumber: 'RZ-2024-003', amount: 120, type: 'delivery', status: 'pending', description: 'Delivery fee - RZ-2024-003', createdAt: '2024-12-15T14:30:00Z' },
  { id: 'earn_005', orderId: '', orderNumber: '', amount: 300, type: 'bonus', status: 'settled', description: 'Weekend bonus', createdAt: '2024-12-14T23:59:00Z' },
]

export const mockWithdrawals: TWithdrawal[] = [
  { id: 'wd_001', amount: 5000, status: 'completed', bankAccount: 'HDFC Bank ****1234', requestedAt: '2024-12-10T10:00:00Z', processedAt: '2024-12-10T14:00:00Z' },
  { id: 'wd_002', amount: 3000, status: 'processing', bankAccount: 'HDFC Bank ****1234', requestedAt: '2024-12-14T09:00:00Z' },
]
