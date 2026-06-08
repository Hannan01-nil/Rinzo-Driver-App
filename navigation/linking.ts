import type { LinkingOptions } from '@react-navigation/native'
import type { RootStackParamList } from './types'

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['rinzo-driver://', 'https://rinzo-driver.com'],
  config: {
    screens: {
      '(auth)': {
        screens: {
          login: 'login',
          'otp-verification': 'verify-otp',
        },
      },
      '(tabs)': {
        screens: {
          home: {
            screens: {
              index: 'home',
              'new-pickup-request': 'home/new-pickup',
              'order-tracking': 'home/tracking/:orderId',
            },
          },
          orders: {
            screens: {
              index: 'orders',
              'collect-clothes': 'orders/collect/:orderId',
              'order-collected-success': 'orders/collected/:orderId',
              'in-transit': 'orders/in-transit/:orderId',
              'order-at-laundry': 'orders/at-laundry/:orderId',
              'delivered-success': 'orders/delivered/:orderId',
            },
          },
          earnings: {
            screens: {
              index: 'earnings',
              withdraw: 'earnings/withdraw',
              'last-7-days': 'earnings/last-7-days',
              'earnings-history': 'earnings/history',
            },
          },
          profile: {
            screens: {
              index: 'profile',
              'personal-information': 'profile/personal-info',
              'vehicle-information': 'profile/vehicle',
              'documents/index': 'documents',
              'documents/upload': 'documents/upload',
              'documents/[id]': 'documents/:id',
              'finance/bank-details': 'finance/bank-details',
              'performance/index': 'performance',
              'performance/bonus-incentives': 'performance/bonuses',
              'performance/daily-summary': 'performance/daily-summary',
              'performance/daily-details': 'performance/daily/:date',
              'support/contact': 'support',
            },
          },
        },
      },
    },
  },
}
