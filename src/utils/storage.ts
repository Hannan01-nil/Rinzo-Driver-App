import { Platform } from 'react-native'

const isWeb = Platform.OS === 'web'

let AsyncStorage: {
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
  removeItem: (key: string) => Promise<void>
}

if (isWeb) {
  AsyncStorage = {
    async getItem(key: string) {
      return localStorage.getItem(key)
    },
    async setItem(key: string, value: string) {
      localStorage.setItem(key, value)
    },
    async removeItem(key: string) {
      localStorage.removeItem(key)
    },
  }
} else {
  // Future: import AsyncStorage from '@react-native-async-storage/async-storage'
  AsyncStorage = {
    async getItem(_key: string) { return null },
    async setItem(_key: string, _value: string) { },
    async removeItem(_key: string) { },
  }
}

export const storage = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch {
      return null
    }
  },
  async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch {
      // silently fail
    }
  },
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key)
    } catch {
      // silently fail
    }
  },
}
