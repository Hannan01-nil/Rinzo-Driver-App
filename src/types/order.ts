import type { TAddress, OrderStatus } from './common'

export interface TOrder {
  id: string
  orderNumber: string
  status: OrderStatus
  customerName: string
  customerPhone: string
  pickupAddress: TAddress
  deliveryAddress: TAddress
  pickupTime: string
  deliveryTime?: string
  itemsCount: number
  totalWeight?: number
  totalAmount: number
  serviceType: 'standard' | 'express' | 'same_day'
  notes?: string
  timeline: TOrderTimeline[]
  createdAt: string
  updatedAt: string
}

export interface TOrderTimeline {
  status: OrderStatus
  timestamp: string
  location?: TAddress
  note?: string
}

export interface TNewPickupRequest {
  customerId: string
  pickupAddress: TAddress
  deliveryAddress: TAddress
  pickupTime: string
  itemsCount: number
  serviceType: 'standard' | 'express' | 'same_day'
  notes?: string
}

export interface TOrdersState {
  orders: TOrder[]
  activeOrder: TOrder | null
  isLoading: boolean
  isRefreshing: boolean
  pagination: { page: number; limit: number; total: number; totalPages: number }
}
