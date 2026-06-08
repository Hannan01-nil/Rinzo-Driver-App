import type { TDocument } from '@/types'

export const mockDocuments: TDocument[] = [
  { id: 'doc_001', type: 'id_card', label: 'Aadhaar Card', fileUrl: '', fileType: 'image', status: 'approved', uploadedAt: '2024-03-16T10:00:00Z', verifiedAt: '2024-03-17T14:00:00Z', expiresAt: '2034-03-16' },
  { id: 'doc_002', type: 'drivers_license', label: "Driver's License", fileUrl: '', fileType: 'image', status: 'approved', uploadedAt: '2024-03-16T10:30:00Z', verifiedAt: '2024-03-18T09:00:00Z', expiresAt: '2028-06-20' },
  { id: 'doc_003', type: 'vehicle_registration', label: 'RC Book', fileUrl: '', fileType: 'image', status: 'pending', uploadedAt: '2024-12-01T11:00:00Z' },
  { id: 'doc_004', type: 'insurance', label: 'Insurance Policy', fileUrl: '', fileType: 'pdf', status: 'approved', uploadedAt: '2024-03-16T11:00:00Z', verifiedAt: '2024-03-18T10:00:00Z', expiresAt: '2025-03-15' },
  { id: 'doc_005', type: 'background_check', label: 'Background Check', fileUrl: '', fileType: 'pdf', status: 'rejected', uploadedAt: '2024-11-20T09:00:00Z', rejectionReason: 'Document is blurry. Please upload a clearer image.' },
]
