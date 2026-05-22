<script setup>
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  FileText,
  GraduationCap,
  UserRound,
} from 'lucide-vue-next'

import { useRecordStore } from '@/stores/record'

const route = useRoute()
const router = useRouter()
const recordStore = useRecordStore()

const recordNumber = computed(() => Number(route.params.recordNumber))
const record = computed(() => recordStore.recordDetail)
const isLoading = computed(() => recordStore.detailLoading)
const archiveSection = computed(() =>
  typeof route.query.section === 'string' ? route.query.section : 'urban'
)
const taggedUserLabels = computed(() => {
  if (!record.value) {
    return []
  }

  const taggedUserNames = Array.isArray(record.value.taggedUserNames)
    ? record.value.taggedUserNames
    : []

  if (taggedUserNames.length > 0) {
    return taggedUserNames
  }

  return (record.value.taggedUserNumbers || []).map((userNumber) => `팀원 #${userNumber}`)
})

function formatDate(dateTime) {
  if (!dateTime) {
    return '날짜 정보 없음'
  }

  const parsedDate = new Date(dateTime)

  if (Number.isNaN(parsedDate.getTime())) {
    return dateTime
  }

  return parsedDate.toLocaleString('ko-KR')
}

function getAuthorLabel() {
  if (record.value?.authorName) {
    return record.value.authorName
  }

  if (record.value?.userNumber) {
    return `작성자 #${record.value.userNumber}`
  }

  return '작성자 정보 없음'
}

function getSubjectLabel() {
  if (record.value?.subjectName) {
    return record.value.subjectName
  }

  if (record.value?.subjectNumber) {
    return `과목 #${record.value.subjectNumber}`
  }

  return '과목 정보 없음'
}

async function loadRecordDetail() {
  if (!Number.isFinite(recordNumber.value) || recordNumber.value <= 0) {
    router.replace(`/archive/${archiveSection.value}`)
    return
  }

  await recordStore.fetchRecordDetail(recordNumber.value)
}

function moveToList() {
  router.push(`/archive/${archiveSection.value}`)
}

onMounted(async () => {
  await loadRecordDetail()
})

watch(
  () => route.params.recordNumber,
  async () => {
    await loadRecordDetail()
  }
)

onBeforeUnmount(() => {
  recordStore.resetRecordDetail()
})
</script>

<template>
  <div class="max-w-6xl mx-auto pb-24 selection:bg-slate-900 selection:text-white">
    <main class="space-y-5">
      <section class="flex items-center justify-between">
        <button
          type="button"
          @click="moveToList"
          class="inline-flex items-center gap-2 text-[11px] font-bold text-slate-400 transition-colors hover:text-slate-900 font-a2zM uppercase"
        >
          <ArrowLeft class="h-3.5 w-3.5" />
          목록으로 돌아가기
        </button>

        <a
          v-if="record?.fileUrl"
          :href="record.fileUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full border border-slate-900 bg-slate-900 px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-black font-a2zM uppercase"
        >
          원본 PDF 열기
          <ExternalLink class="h-3.5 w-3.5" />
        </a>
      </section>

      <section
        v-if="isLoading"
        class="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm"
      >
        <p class="text-[11px] text-slate-300 font-a2zM tracking-[0.3em] uppercase italic">
          Loading detail
        </p>
      </section>

      <template v-else-if="record">
        <section class="rounded-[28px] border border-slate-200 bg-white px-7 py-7 shadow-sm">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div class="min-w-0 flex-1 space-y-4">
              <div class="flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-500 font-a2zM uppercase">
                  {{ getSubjectLabel() }}
                </span>
                <span class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-500 font-a2zM uppercase">
                  {{ record.grade }}학년
                </span>
                <span class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-500 font-a2zM uppercase">
                  {{ record.semester }}
                </span>
              </div>

              <div class="space-y-3">
                <h1 class="text-3xl md:text-[38px] font-black text-slate-900 font-a2zM tracking-tight leading-tight">
                  {{ record.title || '제목 없음' }}
                </h1>
                <p class="max-w-3xl text-sm md:text-base text-slate-600 font-a2zL leading-relaxed">
                  {{ record.description || '설명 정보가 없습니다.' }}
                </p>
              </div>
            </div>

            <div class="w-full lg:w-64 shrink-0 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5">
              <div class="space-y-4">
                <div>
                  <p class="text-[10px] text-slate-400 font-a2zM uppercase tracking-[0.25em]">
                    Author
                  </p>
                  <div class="mt-2 flex items-center gap-2 text-sm text-slate-900 font-a2zM">
                    <UserRound class="h-4 w-4 text-slate-300" />
                    {{ getAuthorLabel() }}
                  </div>
                </div>

                <div class="border-t border-slate-200 pt-4">
                  <p class="text-[10px] text-slate-400 font-a2zM uppercase tracking-[0.25em]">
                    Created
                  </p>
                  <div class="mt-2 flex items-center gap-2 text-sm text-slate-900 font-a2zM">
                    <CalendarDays class="h-4 w-4 text-slate-300" />
                    {{ formatDate(record.createdAt) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-[10px] text-slate-400 font-a2zM uppercase tracking-[0.25em]">
                  PDF Viewer
                </p>
                <h3 class="mt-2 text-2xl font-black text-slate-900 font-a2zM">
                  PDF 뷰어 영역
                </h3>
              </div>
              <FileText class="h-7 w-7 text-slate-300" />
            </div>

            <div class="mt-5 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
              <p class="text-sm text-slate-500 font-a2zL leading-relaxed">
                추후 이 영역에 PDF reader를 연결할 예정입니다.
              </p>
              <p class="mt-2 text-[11px] text-slate-400 font-a2zM">
                현재는 메타데이터 중심으로 상세 정보를 제공합니다.
              </p>
            </div>
          </div>

          <div class="space-y-5">
            <section class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p class="text-[10px] text-slate-400 font-a2zM uppercase tracking-[0.25em]">
                Team
              </p>
              <h3 class="mt-2 text-2xl font-black text-slate-900 font-a2zM">
                태그된 사용자
              </h3>

              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  v-for="taggedUserLabel in taggedUserLabels"
                  :key="taggedUserLabel"
                  class="inline-flex items-center rounded-full bg-slate-900 px-3 py-2 text-[11px] font-bold text-white font-a2zM"
                >
                  {{ taggedUserLabel }}
                </span>

                <p
                  v-if="taggedUserLabels.length === 0"
                  class="text-sm text-slate-400 font-a2zL"
                >
                  태그된 사용자가 없습니다.
                </p>
              </div>
            </section>

            <section class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p class="text-[10px] text-slate-400 font-a2zM uppercase tracking-[0.25em]">
                Subject
              </p>
              <h3 class="mt-2 text-2xl font-black text-slate-900 font-a2zM">
                기록물 분류
              </h3>

              <div class="mt-5 space-y-3 text-sm text-slate-600 font-a2zL">
                <div class="flex items-center gap-2">
                  <GraduationCap class="h-4 w-4 text-slate-300" />
                  {{ record.grade }}학년 · {{ record.semester }}
                </div>
                <div class="flex items-center gap-2">
                  <FileText class="h-4 w-4 text-slate-300" />
                  {{ getSubjectLabel() }}
                </div>
              </div>
            </section>
          </div>
        </section>
      </template>

      <section
        v-else
        class="rounded-[28px] border border-slate-200 bg-white px-8 py-20 text-center shadow-sm"
      >
        <p class="text-[11px] text-slate-300 font-a2zM tracking-[0.3em] uppercase italic">
          Record not found
        </p>
      </section>
    </main>
  </div>
</template>
