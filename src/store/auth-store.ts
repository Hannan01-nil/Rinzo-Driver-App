import { create } from 'zustand'
import type { TAuthUser } from '@/types'

interface TAuthStore {
  user: TAuthUser | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: TAuthUser | null) => void
  setToken: (token: string | null) => void
  setRefreshToken: (token: string | null) => void
  setAuthenticated: (value: boolean) => void
  setLoading: (value: boolean) => void
  logout: () => void
}

export const authStore = create<TAuthStore>((set) => ({
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setRefreshToken: (refreshToken) => set({ refreshToken }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, token: null, refreshToken: null, isAuthenticated: false }),
}))
