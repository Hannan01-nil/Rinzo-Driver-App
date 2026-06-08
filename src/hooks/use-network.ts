import { useState, useEffect, useCallback } from 'react'
import { AppState } from 'react-native'

export function useNetwork() {
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    // Future: use @react-native-community/netinfo
    // const unsubscribe = NetInfo.addEventListener(state => setIsConnected(state.isConnected ?? false))
    // return () => unsubscribe()
  }, [])

  const checkConnection = useCallback(async () => {
    // Future: const state = await NetInfo.fetch()
    // setIsConnected(state.isConnected ?? false)
    return isConnected
  }, [isConnected])

  return { isConnected, checkConnection }
}
