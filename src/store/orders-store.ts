import { create } from 'zustand'
import type { TOrder } from '@/types'

interface TOrdersStore {
  orders: TOrder[]
  activeOrder: TOrder | null
  isLoading: boolean
  isRefreshing: boolean
  setOrders: (orders: TOrder[]) => void
  setActiveOrder: (order: TOrder | null) => void
  setLoading: (value: boolean) => void
  setRefreshing: (value: boolean) => void
}

export const ordersStore = create<TOrdersStore>((set) => ({
  orders: [],
  activeOrder: null,
  isLoading: false,
  isRefreshing: false,
  setOrders: (orders) => set({ orders }),
  setActiveOrder: (activeOrder) => set({ activeOrder }),
  setLoading: (isLoading) => set({ isLoading }),
  setRefreshing: (isRefreshing) => set({ isRefreshing }),
}))
