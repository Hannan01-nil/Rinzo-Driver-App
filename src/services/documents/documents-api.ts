import { apiClient } from '../api-client'
import { ENDPOINTS } from '@/constants'
import type { TDocument, TDocumentUploadRequest, TApiResponse } from '@/types'

export const documentsApi = {
  list() {
    return apiClient.get<TApiResponse<TDocument[]>>(ENDPOINTS.documents.list)
  },

  getById(id: string) {
    return apiClient.get<TApiResponse<TDocument>>(ENDPOINTS.documents.details(id))
  },

  upload(data: TDocumentUploadRequest) {
    const formData = new FormData()
    formData.append('type', data.type)
    formData.append('file', {
      uri: data.file.uri,
      name: data.file.name,
      type: data.file.type,
    } as unknown as Blob)
    if (data.notes) formData.append('notes', data.notes)

    return apiClient.post<TApiResponse<TDocument>>(ENDPOINTS.documents.upload, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
