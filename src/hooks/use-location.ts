import { useState, useEffect, useCallback } from 'react'
import { Platform } from 'react-native'
import { LOCATION } from '@/constants'

interface TLocation {
  latitude: number
  longitude: number
}

export function useLocation() {
  const [location, setLocation] = useState<TLocation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isTracking, setIsTracking] = useState(false)

  const startTracking = useCallback(() => {
    if (Platform.OS === 'web') return
    setIsTracking(true)
    // Future: use expo-location to watch position
    // const subscription = await Location.watchPositionAsync(
    //   { accuracy: Location.Accuracy.High, timeInterval: LOCATION.UPDATE_INTERVAL_MS },
    //   (loc) => setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude })
    // )
    return () => {
      setIsTracking(false)
    }
  }, [])

  useEffect(() => {
    return () => {
      setIsTracking(false)
    }
  }, [])

  return { location, error, isTracking, startTracking }
}
