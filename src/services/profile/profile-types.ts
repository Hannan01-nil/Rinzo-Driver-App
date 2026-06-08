export interface TUpdateProfilePayload {
  firstName?: string
  lastName?: string
  email?: string
  dateOfBirth?: string
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
}

export interface TUpdateVehiclePayload {
  type?: 'bike' | 'scooter' | 'car' | 'van'
  make?: string
  model?: string
  year?: number
  color?: string
  licensePlate?: string
}
