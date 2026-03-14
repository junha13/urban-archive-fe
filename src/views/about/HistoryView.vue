<script setup>
import PageTitle from '../../components/layout/common/PageTitle.vue'

// 나중에 이 데이터만 수정하면 됩니다.
const historyData = [
  { year: '2026', content: '도시정보공학 아카이브 시스템 구축 및 고도화' },
  { year: '2024', content: '스마트시티 특성화 학과 선정' },
  { year: '2020', content: 'GIS 데이터 분석 전문가 과정 개설' },
  { year: '2015', content: '학과 설립 및 1기 신입생 입학' },
  { year: '2010', content: '도시정보공학 연구소 개소' },
]
</script>

<template>
  <div class="max-w-6xl mx-auto pb-24 animate-in fade-in duration-1000">
    
    <PageTitle 
      tag="Timeline" 
      title="학과 연혁" 
      subtitle="도시정보공학과의 발자취를 기록합니다."
    />

    <main class="relative bg-[#0f172a] rounded-[40px] p-10 md:p-20 mx-4 md:mx-6 border border-slate-800 shadow-2xl overflow-hidden">
      
      <div class="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:30px_30px]"></div>

      <div class="relative space-y-12">
        <div class="absolute left-4 md:left-[50%] top-0 bottom-0 w-px bg-slate-800 md:-translate-x-1/2"></div>

        <div 
          v-for="(item, index) in historyData" 
          :key="item.year"
          class="relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0"
        >
          <div :class="['w-full md:w-1/2 flex px-10', index % 2 === 0 ? 'md:justify-end' : 'md:justify-start md:order-last']">
            <span class="text-2xl md:text-3xl font-black text-white font-mono tracking-tighter">
              {{ item.year }}
            </span>
          </div>

          <div class="absolute left-4 md:left-1/2 w-2 h-2 bg-indigo-500 rounded-full md:-translate-x-1/2 z-10 shadow-[0_0_10px_#6366f1]"></div>

          <div :class="['w-full md:w-1/2 px-10 text-slate-400 font-a2zL text-sm md:text-base', index % 2 === 0 ? '' : 'md:text-right']">
            {{ item.content }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>