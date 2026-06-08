export interface TDriverProfile {
  id: string
  name: string
  phone: string
  email: string
  avatar: string
  rating: number
  totalDeliveries: number
  memberSince: string
  isVerified: boolean
  isOnline: boolean
}

export interface TPersonalInfo {
  firstName: string
  lastName: string
  phone: string
  email: string
  dateOfBirth?: string
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
}

export interface TVehicleInfo {
  id: string
  type: 'bike' | 'scooter' | 'car' | 'van'
  make: string
  model: string
  year: number
  color: string
  licensePlate: string
  isVerified: boolean
}

export interface TPerformance {
  rating: number
  totalDeliveries: number
  onTimeRate: number
  cancellationRate: number
  acceptanceRate: number
  totalDistance: number
  totalHours: number
  currentStreak: number
  badges: TBadge[]
}

export interface TBadge {
  id: string
  name: string
  icon: string
  earnedAt: string
}

export interface TBonusIncentive {
  id: string
  title: string
  description: string
  type: 'bonus' | 'challenge' | 'guarantee'
  target: number
  progress: number
  reward: number
  currency: string
  expiresAt: string
  isActive: boolean
}

export interface TDailySummary {
  date: string
  deliveries: number
  distance: number
  hours: number
  earnings: number
  tips: number
  bonuses: number
  rating: number
}
