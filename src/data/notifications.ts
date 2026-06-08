export interface TNotification {
  id: string
  type: 'order' | 'earning' | 'system' | 'document'
  title: string
  message: string
  isRead: boolean
  createdAt: string
  data?: Record<string, string>
}

export const mockNotifications: TNotification[] = [
  { id: 'not_001', type: 'order', title: 'New Pickup Request', message: 'New order from Rahul Sharma at Indiranagar', isRead: false, createdAt: '2024-12-15T09:00:00Z', data: { orderId: 'ord_001' } },
  { id: 'not_002', type: 'earning', title: 'Earning Received', message: '₹150 credited for order RZ-2024-001', isRead: false, createdAt: '2024-12-15T10:30:00Z' },
  { id: 'not_003', type: 'document', title: 'Document Approved', message: 'Your insurance document has been approved', isRead: true, createdAt: '2024-12-14T15:00:00Z' },
  { id: 'not_004', type: 'system', title: 'Weekly Summary', message: 'You delivered 62 orders this week! Great job!', isRead: true, createdAt: '2024-12-14T23:59:00Z' },
]
