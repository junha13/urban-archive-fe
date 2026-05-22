<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileText,
  Grid2x2,
  Rows3,
  Search,
  Upload,
  UserRound,
} from 'lucide-vue-next'

import PageTitle from '@/components/layout/common/PageTitle.vue'
import { useRecordStore } from '@/stores/record'

const DEFAULT_PAGE_SIZE = 10

const route = useRoute()
const router = useRouter()
const recordStore = useRecordStore()

const filters = reactive({
  viewMode: 'title',
  searchType: 'title',
  keyword: '',
  grade: 'all',
  semester: 'all',
  page: 1,
})

const isApplyingFilters = ref(false)

const gradeOptions = ['all', '1', '2', '3', '4']
const semesterOptions = ['all', '1학기', '2학기', '여름학기', '겨울학기']

const records = computed(() => recordStore.listItems)
const pagination = computed(() => recordStore.pagination)
const isLoading = computed(() => recordStore.loading || isApplyingFilters.value)
const supportsNameSearch = computed(() => recordStore.supportsNameSearch)
const pageTitle = computed(() => route.meta.archiveTitle || '기록물 목록')
const pageSubtitle = computed(
  () =>
    route.meta.archiveSubtitle ||
    '아카이브 기록물을 탐색하고 상세 정보를 확인할 수 있습니다.'
)
const nameSearchNotice = computed(() =>
  filters.searchType === 'name' && !supportsNameSearch.value
    ? '현재 API 응답에는 이름 정보가 없어 이름 검색 결과가 제한됩니다.'
    : ''
)

const visiblePageNumbers = computed(() => {
  const currentPage = pagination.value.page
  const totalPages = pagination.value.totalPages
  const startPage = Math.max(1, currentPage - 2)
  const endPage = Math.min(totalPages, currentPage + 2)
  const pages = []

  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page)
  }

  return pages
})

const currentArchiveSection = computed(() => {
  if (route.name === 'archive-major') {
    return 'major'
  }

  if (route.name === 'archive-extra') {
    return 'extra'
  }

  return 'urban'
})

function formatDate(dateTime) {
  if (!dateTime) {
    return '날짜 정보 없음'
  }

  const parsedDate = new Date(dateTime)

  if (Number.isNaN(parsedDate.getTime())) {
    return dateTime
  }

  return parsedDate.toLocaleDateString('ko-KR')
}

function getAuthorLabel(record) {
  if (record.authorName) {
    return record.authorName
  }

  if (record.userNumber) {
    return `작성자 #${record.userNumber}`
  }

  return '작성자 정보 없음'
}

function getSubjectLabel(record) {
  if (record.subjectName) {
    return record.subjectName
  }

  if (record.subjectNumber) {
    return `과목 #${record.subjectNumber}`
  }

  return '과목 정보 없음'
}

async function applyQuery() {
  isApplyingFilters.value = true

  try {
    await recordStore.queryRecordList({
      page: filters.page,
      size: DEFAULT_PAGE_SIZE,
      searchType: filters.searchType,
      keyword: filters.keyword,
      grade: filters.grade,
      semester: filters.semester,
    })
  } finally {
    isApplyingFilters.value = false
  }
}

const applyKeywordSearch = useDebounceFn(async () => {
  filters.page = 1
  await applyQuery()
}, 300)

watch(
  () => filters.keyword,
  () => {
    applyKeywordSearch()
  }
)

watch(
  [
    () => filters.searchType,
    () => filters.grade,
    () => filters.semester,
  ],
  async () => {
    filters.page = 1
    await applyQuery()
  }
)

watch(
  () => route.fullPath,
  async () => {
    filters.page = 1
    await applyQuery()
  }
)

function changePage(page) {
  if (
    page < 1 ||
    page > pagination.value.totalPages ||
    page === pagination.value.page
  ) {
    return
  }

  filters.page = page
  applyQuery()
}

function openDetail(recordNumber) {
  router.push({
    name: 'archive-detail',
    params: { recordNumber },
    query: { section: currentArchiveSection.value },
  })
}

function moveToUpload() {
  router.push('/archive/upload')
}

onMounted(async () => {
  await applyQuery()
})
</script>

<template>
  <div class="max-w-6xl mx-auto pb-24 selection:bg-slate-900 selection:text-white">
    <PageTitle
      tag="Archive"
      :title="pageTitle"
      :subtitle="pageSubtitle"
    />

    <main class="mt-10 space-y-6">
      <section class="flex flex-col gap-3 xl:flex-row xl:items-stretch">
        <div class="flex-1 rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm">
          <div class="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div class="inline-flex h-11 shrink-0 items-center rounded-full border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                @click="filters.viewMode = 'title'"
                :class="[
                  'inline-flex h-9 items-center gap-2 rounded-full px-4 text-[11px] font-bold transition-all font-a2zM',
                  filters.viewMode === 'title'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                ]"
              >
                <Rows3 class="h-3.5 w-3.5" />
                제목형 보기
              </button>
              <button
                type="button"
                @click="filters.viewMode = 'preview'"
                :class="[
                  'inline-flex h-9 items-center gap-2 rounded-full px-4 text-[11px] font-bold transition-all font-a2zM',
                  filters.viewMode === 'preview'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                ]"
              >
                <Grid2x2 class="h-3.5 w-3.5" />
                미리보기형 보기
              </button>
            </div>

            <div class="grid flex-1 gap-3 md:grid-cols-[130px_150px_130px_minmax(0,1fr)]">
              <div>
                <select
                  v-model="filters.grade"
                  class="w-full h-11 rounded-2xl border border-slate-200 bg-white px-4 text-xs text-slate-900 focus:border-slate-900 focus:outline-none font-a2zM appearance-none"
                >
                  <option
                    v-for="gradeOption in gradeOptions"
                    :key="gradeOption"
                    :value="gradeOption"
                  >
                    {{ gradeOption === 'all' ? '전체 학년' : `${gradeOption}학년` }}
                  </option>
                </select>
              </div>

              <div>
                <select
                  v-model="filters.semester"
                  class="w-full h-11 rounded-2xl border border-slate-200 bg-white px-4 text-xs text-slate-900 focus:border-slate-900 focus:outline-none font-a2zM appearance-none"
                >
                  <option
                    v-for="semesterOption in semesterOptions"
                    :key="semesterOption"
                    :value="semesterOption"
                  >
                    {{ semesterOption === 'all' ? '전체 학기' : semesterOption }}
                  </option>
                </select>
              </div>

              <div>
                <select
                  v-model="filters.searchType"
                  class="w-full h-11 rounded-2xl border border-slate-200 bg-white px-4 text-xs text-slate-900 focus:border-slate-900 focus:outline-none font-a2zM appearance-none"
                >
                  <option value="title">제목 검색</option>
                  <option value="name">이름 검색</option>
                </select>
              </div>

              <div class="relative group">
                <Search class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" />
                <input
                  v-model="filters.keyword"
                  type="text"
                  placeholder="검색어를 입력하세요"
                  class="w-full h-11 rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 focus:border-slate-900 focus:outline-none transition-all font-a2zL"
                />
              </div>
              </div>
            </div>

          <p
            v-if="nameSearchNotice"
            class="mt-3 text-[11px] text-amber-600 font-a2zM"
          >
            {{ nameSearchNotice }}
          </p>
        </div>

        <div class="shrink-0 rounded-[28px] border-slate-200 bg-white p-2 shadow-sm">
          <button
            type="button"
            @click="moveToUpload"
            class="inline-flex h-full min-h-11 items-center justify-center gap-2 rounded-[18px] border border-slate-900 bg-slate-900 px-5 text-[11px] font-bold text-white transition-colors hover:bg-black font-a2zM uppercase"
          >
            <Upload class="h-3.5 w-3.5" />
            Upload
          </button>
        </div>
      </section>

      <section class="border-t-2 border-slate-900">
        <div
          v-if="isLoading"
          class="py-20 text-center border-b border-slate-100"
        >
          <p class="text-[11px] text-slate-400 font-a2zM tracking-[0.3em] uppercase italic">
            Loading records
          </p>
        </div>

        <template v-else-if="records.length > 0">
          <div
            v-if="filters.viewMode === 'title'"
            class="divide-y divide-slate-100"
          >
            <button
              v-for="record in records"
              :key="record.recordNumber"
              type="button"
              @click="openDetail(record.recordNumber)"
              class="group w-full text-left px-2 md:px-4 py-5 hover:bg-slate-50 transition-all"
            >
              <div class="flex flex-col md:flex-row md:items-center gap-5">
                <div class="w-28 shrink-0">
                  <span class="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-500 transition-colors font-a2zM group-hover:border-slate-900 group-hover:text-slate-900">
                    {{ getSubjectLabel(record) }}
                  </span>
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <h3 class="truncate text-base md:text-[18px] font-bold text-slate-900 font-a2zM">
                      {{ record.title || '제목 없음' }}
                    </h3>
                    <ArrowUpRight class="h-4 w-4 shrink-0 text-slate-300 opacity-0 transition-all group-hover:opacity-100 group-hover:text-slate-900" />
                  </div>
                  <p class="mt-1 text-[13px] text-slate-500 font-a2zL">
                    {{ record.description || '설명 정보가 없습니다.' }}
                  </p>
                </div>

                <div class="shrink-0 flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-a2zM">
                  <span class="inline-flex items-center gap-1.5">
                    <UserRound class="h-3.5 w-3.5" />
                    {{ getAuthorLabel(record) }}
                  </span>
                  <span class="inline-flex items-center gap-1.5">
                    <CalendarDays class="h-3.5 w-3.5" />
                    {{ formatDate(record.createdAt) }}
                  </span>
                  <span>
                    {{ record.grade }}학년 · {{ record.semester }}
                  </span>
                </div>
              </div>
            </button>
          </div>

          <div
            v-else
            class="grid gap-4 pt-4 md:grid-cols-2 xl:grid-cols-5"
          >
            <button
              v-for="record in records"
              :key="record.recordNumber"
              type="button"
              @click="openDetail(record.recordNumber)"
              class="group overflow-hidden rounded-[28px] border border-slate-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-slate-900 hover:shadow-lg"
            >
              <div class="aspect-[4/3] bg-slate-100 relative overflow-hidden border-b border-slate-200">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_55%)]"></div>
                <div class="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] [background-size:22px_22px]"></div>
                <div class="relative z-10 flex h-full flex-col justify-between p-5">
                  <span class="inline-flex w-fit items-center rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-[10px] font-bold text-slate-500 font-a2zM">
                    PDF ARCHIVE
                  </span>
                  <div>
                    <FileText class="h-7 w-7 text-slate-500" />
                    <p class="mt-3 text-xs text-slate-500 font-a2zL">
                      사진 및 제목 단위 보기
                    </p>
                  </div>
                </div>
              </div>

              <div class="space-y-4 p-4">
                <div>
                  <h3 class="line-clamp-2 text-[15px] font-bold text-slate-900 font-a2zM leading-snug">
                    {{ record.title || '제목 없음' }}
                  </h3>
                  <p class="mt-2 line-clamp-2 text-[12px] text-slate-500 font-a2zL">
                    {{ record.description || '설명 정보가 없습니다.' }}
                  </p>
                </div>

                <div class="space-y-2 text-[11px] text-slate-400 font-a2zM">
                  <div class="flex items-center justify-between gap-3">
                    <span class="truncate">{{ getAuthorLabel(record) }}</span>
                    <span>{{ record.grade }}학년</span>
                  </div>
                  <div class="flex items-center justify-between gap-3">
                    <span class="truncate">{{ getSubjectLabel(record) }}</span>
                    <span>{{ record.semester }}</span>
                  </div>
                  <div class="text-slate-300">
                    {{ formatDate(record.createdAt) }}
                  </div>
                </div>
              </div>
            </button>
          </div>
        </template>

        <div
          v-else
          class="py-28 text-center border-b border-slate-100"
        >
          <p class="text-[11px] text-slate-300 font-a2zM tracking-[0.3em] uppercase italic">
            Record not found
          </p>
        </div>
      </section>

      <nav
        v-if="pagination.totalCount > 0"
        class="flex items-center justify-center gap-1 pt-4"
      >
        <button
          type="button"
          @click="changePage(pagination.page - 1)"
          :disabled="!pagination.hasPrev"
          class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-400 transition-all disabled:cursor-not-allowed disabled:opacity-40 hover:border-slate-900 hover:text-slate-900"
        >
          <ChevronLeft class="h-4 w-4" />
        </button>

        <button
          v-for="pageNumber in visiblePageNumbers"
          :key="pageNumber"
          type="button"
          @click="changePage(pageNumber)"
          :class="[
            'inline-flex h-10 min-w-10 items-center justify-center rounded-2xl border px-3 text-sm font-bold transition-all font-a2zM',
            pageNumber === pagination.page
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-200 bg-white text-slate-500 hover:border-slate-900 hover:text-slate-900'
          ]"
        >
          {{ pageNumber }}
        </button>

        <button
          type="button"
          @click="changePage(pagination.page + 1)"
          :disabled="!pagination.hasNext"
          class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-400 transition-all disabled:cursor-not-allowed disabled:opacity-40 hover:border-slate-900 hover:text-slate-900"
        >
          <ChevronRight class="h-4 w-4" />
        </button>
      </nav>
    </main>
  </div>
</template>
