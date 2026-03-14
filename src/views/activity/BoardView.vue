<script setup>
import { ref } from 'vue'
import { Search, ChevronRight, MessageSquare } from 'lucide-vue-next'

// 예시 데이터
const newsList = ref([
  { id: 1, category: '공지', title: '안양시 도시 디자인 아카이브 시스템 고도화 작업 안내', date: '2026.03.11', views: 124 },
  { id: 2, category: '보도', title: '2026년도 상반기 도시 설계 데이터 공개 및 활용 가이드라인', date: '2026.03.09', views: 892 },
  { id: 3, category: '학술', title: '도시 아카이브의 미래: 인공지능 기반 공간 분석 세미나 개최', date: '2026.03.05', views: 456 },
  { id: 4, category: '소식', title: '스마트 도시 디자인 공모전 최종 당선작 발표', date: '2026.02.28', views: 2301 },
  { id: 5, category: '공지', title: '개인정보 처리방침 변경 안내 (2026년 3월 시행)', date: '2026.02.25', views: 156 },
])
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
      <div>
        <h2 class="text-3xl font-bold text-slate-900 font-a2zM tracking-tight">공지사항</h2>
        <p class="text-slate-500 font-a2zL mt-2 text-sm">안양시 도시 디자인 아카이브의 새로운 소식을 전해드립니다.</p>
      </div>
      
      <div class="relative w-full md:w-72">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="검색어를 입력하세요"
          class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-2xl text-sm font-a2zL focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
        />
      </div>
    </div>

    <div class="space-y-1 font-a2zL">
      <div 
        v-for="news in newsList" 
        :key="news.id"
        class="group flex items-center justify-between p-5 rounded-[24px] hover:bg-slate-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-slate-100 hover:shadow-sm"
      >
        <div class="flex items-center gap-6 flex-1 min-w-0">
          <span class="shrink-0 w-14 text-center py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            {{ news.category }}
          </span>
          
          <h3 class="text-[15px] text-slate-700 font-medium truncate group-hover:text-slate-950 group-hover:translate-x-1 transition-all">
            {{ news.title }}
          </h3>
        </div>

        <div class="flex items-center gap-8 text-[13px] text-slate-400 ml-4 shrink-0">
          <span class="hidden sm:block">{{ news.date }}</span>
          <div class="flex items-center gap-1.5 w-12 justify-end">
            <ChevronRight class="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center pt-6">
      <nav class="flex items-center gap-1 bg-slate-50 p-1 rounded-2xl border border-slate-100">
        <button class="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-white hover:text-slate-900 transition-all font-a2zM">1</button>
        <button class="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-900 text-white shadow-md font-a2zM">2</button>
        <button class="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-white hover:text-slate-900 transition-all font-a2zM">3</button>
        <button class="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-white hover:text-slate-900 transition-all font-a2zM">4</button>
      </nav>
    </div>

  </div>
</template>