import { useCallback, useState } from 'react'
import type { TDriverProfile, TPersonalInfo, TVehicleInfo } from '@/types'
import { mockProfile, mockVehicleInfo } from '@/data/profile'

export function useProfile() {
  const [profile, setProfile] = useState<TDriverProfile>(mockProfile)
  const [vehicle, setVehicle] = useState<TVehicleInfo>(mockVehicleInfo)
  const [isLoading, setIsLoading] = useState(false)

  const fetchProfile = useCallback(async () => {
    setIsLoading(true)
    try {
      // Future: const res = await profileApi.get()
      // setProfile(res.data)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateProfile = useCallback(async (data: Partial<TPersonalInfo>) => {
    try {
      // Future: await profileApi.update(data)
      return true
    } catch {
      return false
    }
  }, [])

  const updateVehicle = useCallback(async (data: Partial<TVehicleInfo>) => {
    try {
      // Future: await profileApi.updateVehicle(data)
      return true
    } catch {
      return false
    }
  }, [])

  const updateAvatar = useCallback(async (uri: string) => {
    try {
      mockProfile.avatar = uri;
      setProfile((prev) => ({ ...prev, avatar: uri }));
      return true;
    } catch {
      return false;
    }
  }, [])

  const updateVehicleImage = useCallback(async (uri: string | undefined) => {
    try {
      mockVehicleInfo.image = uri;
      setVehicle((prev) => ({ ...prev, image: uri }));
      return true;
    } catch {
      return false;
    }
  }, [])

  return { profile, vehicle, isLoading, fetchProfile, updateProfile, updateVehicle, updateAvatar, updateVehicleImage }
}
