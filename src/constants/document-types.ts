import type { DocumentType } from '@/types'

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  id_card: 'ID Card',
  drivers_license: "Driver's License",
  vehicle_registration: 'Vehicle Registration',
  insurance: 'Insurance',
  background_check: 'Background Check',
}

export const DOCUMENT_TYPE_DESCRIPTIONS: Record<DocumentType, string> = {
  id_card: 'Government-issued ID card (front & back)',
  drivers_license: 'Valid driver\'s license',
  vehicle_registration: 'Vehicle registration certificate',
  insurance: 'Valid insurance policy document',
  background_check: 'Background check clearance (if applicable)',
}

export const DOCUMENT_UPLOAD_LIMITS: Record<DocumentType, { maxFiles: number; maxSizeMB: number }> = {
  id_card: { maxFiles: 2, maxSizeMB: 5 },
  drivers_license: { maxFiles: 2, maxSizeMB: 5 },
  vehicle_registration: { maxFiles: 1, maxSizeMB: 10 },
  insurance: { maxFiles: 1, maxSizeMB: 10 },
  background_check: { maxFiles: 1, maxSizeMB: 10 },
}
