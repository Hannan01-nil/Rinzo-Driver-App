import { useEffect, useRef } from 'react'
import { useFocusEffect } from 'expo-router'

export function useRefreshOnFocus(refetch: () => void) {
  const firstLoad = useRef(true)

  useFocusEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false
      return
    }
    refetch()
  })
}
