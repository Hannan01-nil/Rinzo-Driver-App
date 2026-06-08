import { create } from 'zustand'

interface TUiStore {
  isOnline: boolean
  theme: 'light' | 'dark' | 'system'
  toast: { message: string; type: 'success' | 'error' | 'info' } | null
  setOnline: (value: boolean) => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
  hideToast: () => void
}

export const uiStore = create<TUiStore>((set) => ({
  isOnline: true,
  theme: 'system',
  toast: null,
  setOnline: (isOnline) => set({ isOnline }),
  setTheme: (theme) => set({ theme }),
  showToast: (message, type) => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),
}))
