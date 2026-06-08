export interface TAddress {
  street: string
  city: string
  state: string
  zipCode: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

export interface TPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface TApiResponse<T> {
  success: boolean
  data: T
  message?: string
  pagination?: TPagination
}

export interface TApiError {
  success: false
  message: string
  errors?: Record<string, string[]>
}

export type OrderStatus =
  | 'pending'
  | 'assigned'
  | 'pickup_scheduled'
  | 'collected'
  | 'in_transit'
  | 'at_laundry'
  | 'in_progress'
  | 'ready'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'

export type DocumentStatus = 'pending' | 'approved' | 'rejected' | 'expired'

export type DocumentType = 'id_card' | 'drivers_license' | 'vehicle_registration' | 'insurance' | 'background_check'
