import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'

import api from '@/api/axios'

const DEFAULT_LIST_QUERY = Object.freeze({
  page: 1,
  size: 10,
  searchType: 'title',
  keyword: '',
  grade: 'all',
  semester: 'all',
})

function toArray(value) {
  return Array.isArray(value) ? value : []
}

function toNumberOrNull(value) {
  const normalizedValue = Number(value)

  return Number.isFinite(normalizedValue) ? normalizedValue : null
}

function normalizeText(value) {
  return String(value ?? '').trim()
}

function normalizeSearchText(value) {
  return normalizeText(value).toLowerCase()
}

function normalizeSemesterValue(value) {
  const normalizedValue = normalizeText(value)

  return normalizedValue || 'all'
}

function normalizeListQuery(query = {}) {
  const page = Math.max(1, toNumberOrNull(query.page) ?? DEFAULT_LIST_QUERY.page)
  const size = Math.max(1, toNumberOrNull(query.size) ?? DEFAULT_LIST_QUERY.size)
  const searchType = query.searchType === 'name' ? 'name' : DEFAULT_LIST_QUERY.searchType
  const keyword = normalizeText(query.keyword)
  const grade = query.grade === 'all' ? 'all' : normalizeText(query.grade || 'all')
  const semester = normalizeSemesterValue(query.semester)

  return {
    page,
    size,
    searchType,
    keyword,
    grade,
    semester,
  }
}

function normalizeRecordPayload(recordRequest = {}) {
  return {
    userNumber:
      recordRequest.userNumber ??
      recordRequest.user_number ??
      null,
    subjectNumber:
      recordRequest.subjectNumber ??
      recordRequest.subject_number ??
      null,
    title: normalizeText(recordRequest.title),
    description: normalizeText(recordRequest.description),
    grade: toNumberOrNull(recordRequest.grade),
    semester: normalizeText(recordRequest.semester),
    taggedUserNumbers: toArray(
      recordRequest.taggedUserNumbers ??
      recordRequest.tagged_user_numbers ??
      recordRequest.user_numbers
    ),
  }
}

function normalizeRecordItem(item = {}) {
  const sourceRecord = item.record ?? item

  return {
    recordNumber: sourceRecord.recordNumber ?? sourceRecord.record_number ?? null,
    userNumber: sourceRecord.userNumber ?? sourceRecord.user_number ?? null,
    subjectNumber: sourceRecord.subjectNumber ?? sourceRecord.subject_number ?? null,
    title: normalizeText(sourceRecord.title),
    description: normalizeText(sourceRecord.description),
    fileUrl: normalizeText(sourceRecord.fileUrl ?? sourceRecord.file_url),
    grade: sourceRecord.grade ?? null,
    semester: normalizeText(sourceRecord.semester),
    createdAt: normalizeText(sourceRecord.createdAt ?? sourceRecord.created_at),
    updatedAt: normalizeText(sourceRecord.updatedAt ?? sourceRecord.updated_at),
    authorName: normalizeText(
      sourceRecord.userName ??
      sourceRecord.authorName ??
      item.userName ??
      item.authorName
    ),
    subjectName: normalizeText(
      sourceRecord.subjectName ??
      item.subjectName
    ),
    taggedUserNumbers: toArray(item.taggedUserNumbers ?? item.tagged_user_numbers),
    taggedUserNames: toArray(item.taggedUserNames ?? item.tagged_user_names),
  }
}

function sortRecords(records) {
  return [...records].sort((leftRecord, rightRecord) => {
    const leftTime = leftRecord.createdAt ? new Date(leftRecord.createdAt).getTime() : 0
    const rightTime = rightRecord.createdAt ? new Date(rightRecord.createdAt).getTime() : 0

    if (leftTime !== rightTime) {
      return rightTime - leftTime
    }

    return (rightRecord.recordNumber ?? 0) - (leftRecord.recordNumber ?? 0)
  })
}

function resolveRecordNameTokens(record) {
  const tokens = [
    record.authorName,
    ...toArray(record.taggedUserNames),
  ]

  return tokens
    .map((token) => normalizeSearchText(token))
    .filter(Boolean)
}

function filterRecords(records, query) {
  const normalizedQuery = normalizeListQuery(query)
  const normalizedKeyword = normalizeSearchText(normalizedQuery.keyword)

  return sortRecords(records).filter((record) => {
    const matchGrade =
      normalizedQuery.grade === 'all' ||
      String(record.grade) === String(normalizedQuery.grade)

    const matchSemester =
      normalizedQuery.semester === 'all' ||
      record.semester === normalizedQuery.semester

    const matchKeyword =
      !normalizedKeyword ||
      (
        normalizedQuery.searchType === 'name'
          ? resolveRecordNameTokens(record).some((token) => token.includes(normalizedKeyword))
          : normalizeSearchText(record.title).includes(normalizedKeyword)
      )

    return matchGrade && matchSemester && matchKeyword
  })
}

function paginateRecords(records, page, size) {
  const totalCount = records.length
  const totalPages = Math.max(1, Math.ceil(totalCount / size))
  const safePage = Math.min(page, totalPages)
  const startIndex = (safePage - 1) * size
  const endIndex = startIndex + size

  return {
    items: records.slice(startIndex, endIndex),
    page: safePage,
    size,
    totalCount,
    totalPages,
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages,
  }
}

export const useRecordStore = defineStore('record', () => {
  const records = ref([])
  const recordDetail = ref(null)
  const listItems = ref([])
  const loading = ref(false)
  const detailLoading = ref(false)
  const errorMessage = ref('')
  const detailErrorMessage = ref('')
  const hasFetchedList = ref(false)

  const listQuery = reactive({ ...DEFAULT_LIST_QUERY })
  const pagination = reactive({
    page: DEFAULT_LIST_QUERY.page,
    size: DEFAULT_LIST_QUERY.size,
    totalCount: 0,
    totalPages: 1,
    hasPrev: false,
    hasNext: false,
  })

  const supportsNameSearch = computed(() =>
    records.value.some((record) => resolveRecordNameTokens(record).length > 0)
  )

  async function insertRecord(recordRequest, file) {
    loading.value = true
    errorMessage.value = ''

    try {
      const normalizedRecordRequest = normalizeRecordPayload(recordRequest)
      const formData = new FormData()
      const recordBlob = new Blob([JSON.stringify(normalizedRecordRequest)], {
        type: 'application/json',
      })

      formData.append('record', recordBlob, 'record.json')

      if (file) {
        formData.append('file', file)
      }

      const response = await api.post('/api/record/insert', formData)

      hasFetchedList.value = false

      return response.data.result
    } catch (error) {
      console.error('Insert failed:', error)
      errorMessage.value = '기록물 등록 중 오류가 발생했습니다.'

      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchRecordList() {
    loading.value = true
    errorMessage.value = ''

    try {
      const response = await api.get('/api/record/list')

      records.value = toArray(response.data?.result).map(normalizeRecordItem)
      hasFetchedList.value = true

      return records.value
    } catch (error) {
      console.error('Fetch list failed:', error)
      errorMessage.value = '기록물 목록을 불러오지 못했습니다.'

      return []
    } finally {
      loading.value = false
    }
  }

  async function queryRecordList(query = {}) {
    const normalizedQuery = normalizeListQuery(query)

    if (!hasFetchedList.value) {
      await fetchRecordList()
    }

    const filteredRecords = filterRecords(records.value, normalizedQuery)
    const paginatedRecords = paginateRecords(
      filteredRecords,
      normalizedQuery.page,
      normalizedQuery.size
    )

    Object.assign(listQuery, normalizedQuery, { page: paginatedRecords.page })
    Object.assign(pagination, paginatedRecords)

    listItems.value = paginatedRecords.items

    return {
      items: listItems.value,
      query: { ...listQuery },
      pagination: { ...pagination },
    }
  }

  async function fetchRecordDetail(recordNumber) {
    detailLoading.value = true
    detailErrorMessage.value = ''

    try {
      const response = await api.get(`/api/record/${recordNumber}`)

      recordDetail.value = normalizeRecordItem(response.data?.result)

      return recordDetail.value
    } catch (error) {
      console.error('Fetch detail failed:', error)
      detailErrorMessage.value = '기록물 상세 정보를 불러오지 못했습니다.'
      recordDetail.value = null

      return null
    } finally {
      detailLoading.value = false
    }
  }

  function resetRecordDetail() {
    recordDetail.value = null
    detailErrorMessage.value = ''
  }

  return {
    records,
    recordDetail,
    listItems,
    listQuery,
    pagination,
    loading,
    detailLoading,
    errorMessage,
    detailErrorMessage,
    supportsNameSearch,
    insertRecord,
    fetchRecordList,
    queryRecordList,
    fetchRecordDetail,
    resetRecordDetail,
  }
})
