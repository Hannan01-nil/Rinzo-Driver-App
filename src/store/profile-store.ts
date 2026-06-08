import { create } from 'zustand'
import type { TDriverProfile, TVehicleInfo } from '@/types'

interface TProfileStore {
  profile: TDriverProfile | null
  vehicle: TVehicleInfo | null
  isLoading: boolean
  setProfile: (profile: TDriverProfile | null) => void
  setVehicle: (vehicle: TVehicleInfo | null) => void
  setLoading: (value: boolean) => void
}

export const profileStore = create<TProfileStore>((set) => ({
  profile: null,
  vehicle: null,
  isLoading: false,
  setProfile: (profile) => set({ profile }),
  setVehicle: (vehicle) => set({ vehicle }),
  setLoading: (isLoading) => set({ isLoading }),
}))
