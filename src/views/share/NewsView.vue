<script setup>
import { ref, computed } from 'vue'
import { Search, ChevronRight, Filter, ExternalLink } from 'lucide-vue-next'
import PageTitle from '../../components/layout/common/PageTitle.vue'

const tracks = ['전체', '도시설계', 'GIS', '교통', '도시재생', '스마트도시']
const selectedTrack = ref('전체')
const searchQuery = ref('')

const newsList = ref([
  { id: 1, track: '스마트도시', title: '2026 안양시 스마트시티 리빙랩 프로젝트 참여 학생 모집 안내', body: '우리 학과와 안양시가 공동으로 진행하는 리빙랩 프로젝트 참여자 모집 공고입니다. 실제 도시 문제를 데이터로 해결할 기회입니다.', date: '2026.03.12', url: 'https://example.com/1' },
  { id: 2, track: 'GIS', title: 'QGIS 기반 공간정보 분석 전문가 과정 세미나 개최 안내', body: '실무 활용 중심의 QGIS 데이터 시각화 프로세스 교육이 이번 주 금요일 연구실에서 진행됩니다.', date: '2026.03.10', url: 'https://example.com/2' },
  { id: 3, track: '도시설계', title: '제15회 도시설계 졸업 작품 전시회 일정 및 장소 안내', body: '졸업 작품 전시회 일정이 확정되었습니다. 아카이브에서 관련 도면 확인이 가능합니다.', date: '2026.03.05', url: 'https://example.com/3' },
])

const filteredNews = computed(() => {
  return newsList.value.filter(news => {
    const matchTrack = selectedTrack.value === '전체' || news.track === selectedTrack.value
    const matchSearch = news.title.includes(searchQuery.value) || news.body.includes(searchQuery.value)
    return matchTrack && matchSearch
  })
})

const goToUrl = (url) => window.open(url, '_blank')
</script>

<template>
  <div class="max-w-6xl mx-auto pb-24 animate-in fade-in duration-700 selection:bg-slate-900 selection:text-white">
    
    <PageTitle 
      tag="Information" 
      title="학과 관련 뉴스" 
    />

    <main class="mt-12">
      
      <section class="px-2 md:px-4 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
        <div class="flex flex-wrap items-center gap-1.5">
          <button 
            v-for="track in tracks" :key="track"
            @click="selectedTrack = track"
            :class="[
              'px-4 py-2 text-[11px] font-bold transition-all font-a2zM border rounded-lg',
              selectedTrack === track 
                ? 'bg-slate-900 text-white border-slate-900' 
                : 'bg-white text-slate-400 border-slate-200 hover:text-slate-900 hover:border-slate-900'
            ]"
          >
            {{ track }}
          </button>
        </div>

        <div class="relative group w-full md:w-80 h-10">
          <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-slate-900 transition-colors" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="뉴스 검색"
            class="w-full h-full bg-slate-50 border border-slate-100 rounded-xl pl-11 pr-4 text-xs text-slate-900 focus:outline-none focus:border-slate-900 transition-all font-a2zL"
          />
          <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-focus-within:h-1/2 bg-slate-900 transition-all duration-300 rounded-r-full"></div>
        </div>
      </section>

      <section class="border-t-2 border-slate-900">
        <div v-if="filteredNews.length > 0" class="divide-y divide-slate-100">
          <div 
            v-for="news in filteredNews" :key="news.id"
            @click="goToUrl(news.url)"
            class="group flex flex-col md:flex-row md:items-center gap-4 md:gap-4 py-4 px-2 md:px-4 hover:bg-slate-50 transition-all cursor-pointer relative"
          >
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-slate-900 scale-y-0 group-hover:scale-y-100 transition-transform origin-center"></div>

            <div class="w-20 shrink-0">
              <span class="text-[10px] font-black text-slate-400 group-hover:text-slate-900 border border-slate-200 group-hover:border-slate-900 px-2 py-0.5 rounded font-a2zM uppercase transition-colors tracking-tighter">
                {{ news.track }}
              </span>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <h3 class="text-base md:text-[17px] font-bold text-slate-900 font-a2zM truncate transition-transform">
                  {{ news.title }}
                </h3>
                <ExternalLink class="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-all shrink-0" />
              </div>
              <p class="text-[13px] text-slate-500 font-a2zL line-clamp-1 mt-0.5 group-hover:text-slate-700">
                {{ news.body }}
              </p>
            </div>

            <div class="flex items-center justify-between md:justify-end gap-10 shrink-0">
              <span class="text-[14px] font-mono text-slate-800 group-hover:text-slate-600 transition-colors">
                {{ news.date }}
              </span>
              <ChevronRight class="w-5 h-5 text-slate-200 group-hover:text-slate-900 transition-all transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        <div v-else class="py-32 text-center border-b border-slate-100 px-8 md:px-14">
          <p class="text-[11px] text-slate-300 font-a2zM tracking-[0.3em] uppercase italic">Data not found</p>
        </div>
      </section>
    </main>
  </div>
</template>