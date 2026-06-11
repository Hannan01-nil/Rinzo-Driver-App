export type AuthStackParamList = {
  login: undefined
}

export type HomeStackParamList = {
  index: undefined
  'new-pickup-request': undefined
  'order-tracking': { orderId: string }
}

export type OrdersStackParamList = {
  index: undefined
  'collect-clothes': { orderId: string }
  'order-collected-success': { orderId: string }
  'in-transit': { orderId: string }
  'order-at-laundry': { orderId: string }
  'delivered-success': { orderId: string }
}

export type EarningsStackParamList = {
  index: undefined
  withdraw: undefined
  'last-7-days': undefined
  'earnings-history': undefined
}

export type ProfileStackParamList = {
  index: undefined
  'personal-information': undefined
  'vehicle-information': undefined
  'documents/index': undefined
  'documents/upload': undefined
  'documents/[id]': { id: string }
  'finance/bank-details': undefined
  'performance/index': undefined
  'performance/bonus-incentives': undefined
  'performance/daily-summary': undefined
  'performance/daily-details': { date: string }
  'support/contact': undefined
  'support/report-issue': undefined
  'support/report-submitted': { ticketId?: string }
  'profile/settings': undefined
}

export type TabParamList = {
  home: undefined
  orders: undefined
  earnings: undefined
  profile: undefined
}

export type RootStackParamList = {
  '(auth)': undefined
  '(tabs)': undefined
  '(modals)': undefined
}
