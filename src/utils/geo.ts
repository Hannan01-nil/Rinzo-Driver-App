interface TCoord {
  latitude: number
  longitude: number
}

export function calculateDistance(pointA: TCoord, pointB: TCoord): number {
  const R = 6371000
  const dLat = toRad(pointB.latitude - pointA.latitude)
  const dLon = toRad(pointB.longitude - pointA.longitude)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(pointA.latitude)) * Math.cos(toRad(pointB.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function calculateETA(distanceMeters: number, avgSpeedKmh = 30): number {
  const distanceKm = distanceMeters / 1000
  return Math.ceil((distanceKm / avgSpeedKmh) * 60)
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}
