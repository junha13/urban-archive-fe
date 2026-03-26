import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import api from '@/api/axios'

export const useRecordStore = defineStore('record', () => {
  const records = ref([])
  const loading = ref(false)

  // 1. 아카이브 등록
  async function insertRecord(recordRequest, file) {
    loading.value = true
    try {
      const formData = new FormData()

      const recordBlob = new Blob([JSON.stringify(recordRequest)], {
        type: 'application/json'
      })
      formData.append('record', recordBlob)

      if (file) {
        formData.append('file', file)
      }

      const response = await api.post('/api/record/insert', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data.result
    } catch (error) {
      console.error('Insert failed:', error)
      return null
    } finally {
      loading.value = false
    }
  }

  // 2. 리스트 조회
  async function fetchRecordList() {
    loading.value = true
    try {
      const response = await api.get('/api/record/list')
      records.value = response.data.result
      return records.value
    } catch (error) {
      console.error('Fetch list failed:', error)
    } finally {
      loading.value = false
    }
  }

  // 3. 상세 조회, 업데이트, 삭제 로직도 컨트롤러 주소에 맞춰 구현 가능...

  return { records, loading, insertRecord, fetchRecordList }
})