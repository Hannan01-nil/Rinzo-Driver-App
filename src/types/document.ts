import type { DocumentType, DocumentStatus } from './common'

export interface TDocument {
  id: string
  type: DocumentType
  label: string
  documentNumber?: string
  fileUrl: string
  fileType: 'image' | 'pdf'
  status: DocumentStatus
  uploadedAt: string
  verifiedAt?: string
  rejectionReason?: string
  expiresAt?: string
}

export interface TDocumentUploadRequest {
  type: DocumentType
  file: { uri: string; name: string; type: string }
  notes?: string
}

export interface TDocumentsState {
  documents: TDocument[]
  isLoading: boolean
  uploading: boolean
}
