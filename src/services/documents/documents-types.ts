import type { DocumentType } from '@/types'

export interface TDocumentUploadPayload {
  type: DocumentType
  fileUri: string
  fileName: string
  fileType: string
  notes?: string
}
