import type { OrderStatus } from '@/types'

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  assigned: 'Assigned',
  pickup_scheduled: 'Pickup Scheduled',
  collected: 'Collected',
  in_transit: 'In Transit',
  at_laundry: 'At Laundry',
  in_progress: 'In Progress',
  ready: 'Ready',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: '#FFC107',
  assigned: '#17A2B8',
  pickup_scheduled: '#6F42C1',
  collected: '#28A745',
  in_transit: '#208AEF',
  at_laundry: '#FF6B35',
  in_progress: '#E83E8C',
  ready: '#28A745',
  out_for_delivery: '#208AEF',
  delivered: '#28A745',
  cancelled: '#DC3545',
}

export const ORDER_STATUS_STEPS: OrderStatus[] = [
  'pending',
  'assigned',
  'collected',
  'in_transit',
  'at_laundry',
  'in_progress',
  'ready',
  'out_for_delivery',
  'delivered',
]

export const ACTIVE_ORDER_STATUSES: OrderStatus[] = [
  'assigned',
  'pickup_scheduled',
  'collected',
  'in_transit',
  'at_laundry',
  'in_progress',
  'ready',
  'out_for_delivery',
]
