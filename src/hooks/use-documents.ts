import { useCallback, useState } from 'react'
import type { TDocument, DocumentType } from '@/types'
import { mockDocuments } from '@/data/documents'

export function useDocuments() {
  const [documents, setDocuments] = useState<TDocument[]>(mockDocuments)
  const [uploading, setUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchDocuments = useCallback(async () => {
    setIsLoading(true)
    try {
      // Future: const res = await documentsApi.list()
      // setDocuments(res.data)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const uploadDocument = useCallback(async (type: DocumentType, fileUri: string) => {
    setUploading(true)
    try {
      // Future: await documentsApi.upload({ type, file: { uri: fileUri, name: '', type: '' } })
      return true
    } catch {
      return false
    } finally {
      setUploading(false)
    }
  }, [])

  return { documents, uploading, isLoading, fetchDocuments, uploadDocument }
}
