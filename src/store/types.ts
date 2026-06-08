// Store type definitions for Zustand slices
// Future: combine all slice types into a single AppStore type

import type { TAuthState } from '@/types/auth'
import type { TOrdersState } from '@/types/order'
import type { TEarningsState } from '@/types/earnings'
import type { TDocumentsState } from '@/types/document'
import type { TFinanceState } from '@/types/finance'

export interface TAppStore {
  auth: TAuthState
  orders: TOrdersState
  earnings: TEarningsState
  documents: TDocumentsState
  finance: TFinanceState
}
