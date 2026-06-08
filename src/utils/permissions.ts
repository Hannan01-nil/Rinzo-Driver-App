import { Platform } from 'react-native'

export async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS === 'web') return true
  // Future: use expo-location
  // const { status } = await Location.requestForegroundPermissionsAsync()
  // return status === 'granted'
  return true
}

export async function requestCameraPermission(): Promise<boolean> {
  if (Platform.OS === 'web') return true
  // Future: use expo-camera
  // const { status } = await Camera.requestCameraPermissionsAsync()
  // return status === 'granted'
  return true
}

export async function requestMediaLibraryPermission(): Promise<boolean> {
  if (Platform.OS === 'web') return true
  // Future: use expo-media-library or expo-image-picker
  // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
  // return status === 'granted'
  return true
}
