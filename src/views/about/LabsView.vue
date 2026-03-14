<script setup>
import PageTitle from '../../components/layout/common/PageTitle.vue'
import { 
  Users, Microscope, Network, Monitor, 
  Mail, GraduationCap, ArrowUpRight, 
  Settings, Layers, Compass, Zap, Layout
} from 'lucide-vue-next'

// 연구실 데이터 (5개 트랙 반영)
const labData = [
  {
    track: '도시설계',
    labName: 'Urban Design & Morphology Lab',
    desc: '도시의 물리적 형태 분석을 통해 최적화된 공간 설계 및 경관 가이드라인을 연구합니다.',
    code: 'LAB_UD_01',
    color: 'text-sky-400',
    icon: Compass,
    professors: [
      { name: '김OO 교수', area: '도시형태론 / 단지설계', email: 'kim@anyang.ac.kr' },
      { name: '이OO 교수', area: '경관설계 / 공공디자인', email: 'lee@anyang.ac.kr' },
      { name: '박OO 교수', area: '도시주거 / 공간구조', email: 'park@anyang.ac.kr' },
      { name: '최OO 교수', area: '도시재생 및 디자인', email: 'choi@anyang.ac.kr' },
    ]
  },
  {
    track: 'GIS',
    labName: 'Spatial Intelligence & Data Science Lab',
    desc: '공간 빅데이터와 AI 알고리즘을 융합하여 도시 문제를 예측하고 공간 지능형 솔루션을 제안합니다.',
    code: 'LAB_GIS_02',
    color: 'text-indigo-400',
    icon: Network,
    professors: [
      { name: '정OO 교수', area: '공간분석 / 빅데이터', email: 'jung@anyang.ac.kr' },
      { name: '고OO 교수', area: 'GIS / 데이터마이닝', email: 'ko@anyang.ac.kr' },
      { name: '임OO 교수', area: 'Web GIS / 위치기반서비스', email: 'lim@anyang.ac.kr' },
    ]
  },
  {
    track: '교통',
    labName: 'Intelligent Mobility Systems Lab',
    desc: '지능형 교통체계(ITS)와 미래 자율주행 모빌리티를 위한 최적의 네트워크 인프라를 연구합니다.',
    code: 'LAB_ITS_03',
    color: 'text-blue-400',
    icon: Monitor,
    professors: [
      { name: '강OO 교수', area: '교통계획 / 교통류 분석', email: 'kang@anyang.ac.kr' },
      { name: '조OO 교수', area: '모빌리티 서비스 / 물류', email: 'cho@anyang.ac.kr' },
    ]
  },
  {
    track: '도시재생',
    labName: 'Urban Vitalization & Culture Lab',
    desc: '노후 도심의 기능 회복과 공동체 중심의 도시 재생 전략을 수립하여 도시의 활력을 되찾습니다.',
    code: 'LAB_UR_04',
    color: 'text-emerald-400',
    icon: Layout,
    professors: [
      { name: '서OO 교수', area: '도시재생전략 / 거버넌스', email: 'seo@anyang.ac.kr' },
      { name: '한OO 교수', area: '사회적경제 / 도시문화', email: 'han@anyang.ac.kr' },
    ]
  },
  {
    track: '스마트도시',
    labName: 'Smart City Tech & Platform Lab',
    desc: 'ICT 기반의 도시 플랫폼과 디지털 트윈 기술을 활용하여 지능형 도시 운영 시스템을 연구합니다.',
    code: 'LAB_SC_05',
    color: 'text-purple-400',
    icon: Zap,
    professors: [
      { name: '윤OO 교수', area: '스마트시티 / 디지털트윈', email: 'yoon@anyang.ac.kr' },
      { name: '송OO 교수', area: 'IoT 플랫폼 / 도시보안', email: 'song@anyang.ac.kr' },
    ]
  }
]
</script>

<template>
  <div class="max-w-6xl mx-auto pb-24 animate-in fade-in duration-1000">
    
    <PageTitle 
      tag="Research" 
      title="연구실 및 교수진" 
      subtitle="전문 지식과 첨단 기술로 미래 도시의 표준을 만들어가는 연구진을 소개합니다."
    />

    <div class="space-y-16">
      <section 
        v-for="lab in labData" 
        :key="lab.labName" 
        class="relative px-4 md:px-6"
      >
        <div class="relative bg-[#0f172a] rounded-[48px] overflow-hidden border border-slate-800 shadow-2xl">
          
          <div class="absolute inset-0 z-0 opacity-[0.05] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div class="absolute inset-0 z-0 w-full h-[200%] bg-[linear-gradient(to_bottom,transparent,rgba(79,70,229,0.05),transparent)] -translate-y-full animate-[scan_10s_linear_infinite]"></div>

          <div class="relative z-10 p-10 md:p-14 space-y-12">
            <div class="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <span :class="['font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700 uppercase tracking-widest', lab.color]">
                    {{ lab.track }}
                  </span>
                  <span class="text-slate-600 font-mono text-[10px] tracking-tighter">{{ lab.code }}</span>
                </div>
                <h2 class="text-2xl md:text-4xl font-black text-white font-a2zM tracking-tight">
                  {{ lab.labName }}
                </h2>
                <p class="text-slate-400 font-a2zL text-sm md:text-base leading-relaxed max-w-2xl italic">
                  " {{ lab.desc }} "
                </p>
              </div>
              <div class="w-14 h-14 md:w-20 md:h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner shrink-0">
                <component :is="lab.icon" :class="['h-8 w-8 md:h-10 md:w-10', lab.color]" />
              </div>
            </div>

            <div class="space-y-8">
              <div class="flex items-center gap-4">
                <span class="text-indigo-500 font-bold text-[10px] tracking-widest uppercase italic">/ Experts</span>
                <div class="h-px flex-1 bg-slate-800"></div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div 
                  v-for="prof in lab.professors" 
                  :key="prof.name"
                  class="group/prof relative p-7 bg-slate-900/40 border border-slate-800 rounded-[32px] transition-all duration-500 ease-out hover:bg-slate-50 cursor-default overflow-hidden"
                >
                  <div class="relative z-10 space-y-6">
                    <div class="flex justify-between items-start">
                      <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover/prof:bg-white group-hover/prof:shadow-sm transition-all">
                        <GraduationCap class="h-5 w-5 text-indigo-400 group-hover/prof:text-indigo-600" />
                      </div>
                      <ArrowUpRight class="h-4 w-4 text-slate-300 opacity-0 group-hover/prof:opacity-100 group-hover/prof:text-slate-400 transition-all" />
                    </div>
                    <div>
                      <h4 class="text-lg font-bold text-white group-hover/prof:text-slate-900 font-a2zM transition-colors">
                        {{ prof.name }}
                      </h4>
                      <p class="text-[11px] text-slate-500 font-bold group-hover/prof:text-indigo-500 mt-1 transition-colors uppercase tracking-tight">
                        {{ prof.area }}
                      </p>
                    </div>
                    <div class="pt-4 border-t border-slate-800 group-hover/prof:border-slate-200 flex items-center gap-2">
                      <Mail class="h-3 w-3 text-slate-600 group-hover/prof:text-slate-400" />
                      <span class="text-[10px] text-slate-600 font-mono group-hover/prof:text-slate-500">{{ prof.email }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
@keyframes scan {
  from { transform: translateY(-100%); }
  to { transform: translateY(100%); }
}
</style>