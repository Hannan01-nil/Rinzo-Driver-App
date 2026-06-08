export interface TOrderListParams {
  page?: number
  limit?: number
  status?: string
  sortBy?: 'createdAt' | 'pickupTime' | 'totalAmount'
  sortOrder?: 'asc' | 'desc'
}

export interface TUpdateOrderStatusPayload {
  status: string
  location?: { latitude: number; longitude: number }
  notes?: string
}
