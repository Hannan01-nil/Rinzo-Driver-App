export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api/v1'
  : 'https://api.rinzo-driver.com/api/v1'

export const API_TIMEOUT = 15000

export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    verifyOtp: '/auth/verify-otp',
    refreshToken: '/auth/refresh',
    logout: '/auth/logout',
    profile: '/auth/profile',
  },
  orders: {
    list: '/orders',
    active: '/orders/active',
    details: (id: string) => `/orders/${id}`,
    accept: (id: string) => `/orders/${id}/accept`,
    collect: (id: string) => `/orders/${id}/collect`,
    delivered: (id: string) => `/orders/${id}/delivered`,
    status: (id: string) => `/orders/${id}/status`,
  },
  earnings: {
    summary: '/earnings/summary',
    history: '/earnings/history',
    weekly: '/earnings/weekly',
    withdraw: '/earnings/withdraw',
    withdrawals: '/earnings/withdrawals',
  },
  profile: {
    get: '/profile',
    update: '/profile',
    vehicle: '/profile/vehicle',
    performance: '/profile/performance',
    bonuses: '/profile/bonuses',
    dailySummary: '/profile/daily-summary',
    dailyDetails: (date: string) => `/profile/daily-summary/${date}`,
  },
  documents: {
    list: '/documents',
    upload: '/documents/upload',
    details: (id: string) => `/documents/${id}`,
  },
  finance: {
    bankAccounts: '/finance/bank-accounts',
    addAccount: '/finance/bank-accounts',
    deleteAccount: (id: string) => `/finance/bank-accounts/${id}`,
  },
  support: {
    contact: '/support/contact',
    faq: '/support/faq',
  },
} as const
