<script setup>
import PageTitle from '../../components/layout/common/PageTitle.vue' // 컴포넌트 경로 확인해줘!
import { 
  Compass, Layers, Activity, Map as MapIcon, Zap, 
  ChevronRight, Binary, PenTool, Layout, ArrowUpRight,
  ShieldCheck, Globe
} from 'lucide-vue-next'

const tracks = [
  { name: '도시설계', icon: PenTool, tag: 'DESIGN', color: 'text-sky-400', hoverIcon: 'group-hover:text-sky-500' },
  { name: 'GIS', icon: Layers, tag: 'SPATIAL', color: 'text-indigo-400', hoverIcon: 'group-hover:text-indigo-500' },
  { name: '교통', icon: Activity, tag: 'MOBILITY', color: 'text-blue-400', hoverIcon: 'group-hover:text-blue-500' },
  { name: '도시재생', icon: Layout, tag: 'RE-GEN', color: 'text-emerald-400', hoverIcon: 'group-hover:text-emerald-500' },
  { name: '스마트도시', icon: Zap, tag: 'TECH', color: 'text-purple-400', hoverIcon: 'group-hover:text-purple-500' }
]
</script>

<template>
  <div class="max-w-6xl mx-auto pb-24 animate-in fade-in duration-1000">
    
    <PageTitle 
      tag="About" 
      title="도시정보공학과 학과소개" 
    />

    <main class="relative bg-[#0f172a] rounded-[40px] overflow-hidden shadow-2xl mx-4 md:mx-6 border border-slate-800">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:80px_80px]"></div>
        <div class="absolute inset-0 w-full h-[200%] bg-[linear-gradient(to_bottom,transparent,rgba(79,70,229,0.05),transparent)] -translate-y-full animate-[scan_8s_linear_infinite]"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-transparent to-[#0f172a]"></div>
      </div>

      <div class="relative z-10 px-8 md:px-14 py-16 space-y-24">
        <section class="max-w-3xl space-y-6">
          <h2 class="text-3xl md:text-5xl font-black text-white leading-tight font-a2zM tracking-tight">
            @@도시를 <br/>
            <span class="text-indigo-400 underline underline-offset-8 decoration-2 decoration-indigo-500/30 font-a2zM">@@로 설계하다</span>
          </h2>
          <p class="text-slate-400 text-base md:text-lg font-a2zL leading-relaxed max-w-2xl">
            도시를 구성하는 여러 학문을 배우고, 지식을 융합하여 더 나은 무언가?를 제안합니다. <br/> 
            도시의 고질적인 문제를 해결하고 새로운 가치를 창출하는 전문가를 양성합니다.
          </p>
        </section>

        <section class="space-y-8">
          <div class="flex items-center gap-3">
            <span class="text-indigo-400 font-bold text-xs tracking-widest uppercase">/ Tracks</span>
            <div class="h-px flex-1 bg-slate-800"></div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div 
              v-for="(track, index) in tracks" 
              :key="track.name"
              class="group relative p-5 bg-slate-900/60 border border-slate-800 rounded-3xl transition-all duration-500 ease-out hover:bg-slate-100 cursor-default"
            >
              <div class="relative z-10 space-y-6">
                <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-slate-900 transition-all duration-500">
                  <component :is="track.icon" :class="['h-5 w-5 transition-colors duration-500', track.color, track.hoverIcon]" />
                </div>
                
                <div class="space-y-1">
                  <p class="text-[10px] font-bold font-mono tracking-widest text-slate-500 group-hover:text-slate-400 uppercase italic transition-colors">
                    {{ track.tag }}
                  </p>
                  <h4 class="text-base font-bold text-white group-hover:text-slate-900 font-a2zM transition-colors duration-500">
                    {{ track.name }}
                  </h4>
                </div>
              </div>
              <span class="absolute right-4 top-4 text-xs font-mono text-slate-700 group-hover:text-slate-300 transition-colors italic">0{{ index + 1 }}</span>
            </div>
          </div>
        </section>

        <section class="space-y-8">
          <div class="flex items-center gap-3">
            <span class="text-indigo-400 font-bold text-xs tracking-widest uppercase">/ Objectives</span>
            <div class="h-px flex-1 bg-slate-800"></div>
          </div>

          <div class="grid md:grid-cols-3 gap-0 border border-slate-800 rounded-3xl overflow-hidden shadow-inner bg-slate-900/40">
            <div v-for="(obj, i) in [
              { title: '과학적 사고능력', desc: '인간 생활과 도시공간의 유기적 관계를 분석하여 데이터 기반의 합리적 해결방안을 제시합니다.', icon: ShieldCheck, tag: 'ANALYSIS', color: 'bg-indigo-500' },
              { title: '실무적 기술 역량', desc: '첨단 GIS 및 설계 소프트웨어를 활용하여 현장에서 즉각 적용 가능한 기술력을 갖춥니다.', icon: Binary, tag: 'TECH', color: 'bg-blue-500' },
              { title: '현장 중심 교육', desc: '이론이 실제 도시 설계로 구현되는 현장감 있는 프로젝트 중심의 학습을 지향합니다.', icon: Globe, tag: 'PRACTICE', color: 'bg-cyan-500' }
            ]" :key="i" class="p-8 border-r border-slate-800 last:border-r-0 hover:bg-white/[0.03] transition-all group relative overflow-hidden">
              <div :class="['absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-300', obj.color]"></div>
              <div class="space-y-6">
                <div class="flex justify-between items-start">
                  <component :is="obj.icon" :class="['h-6 w-6', i === 0 ? 'text-indigo-500' : i === 1 ? 'text-blue-500' : 'text-cyan-500']" />
                  <span class="text-[9px] font-mono text-slate-600 font-bold tracking-tighter">0{{i+1}}_{{obj.tag}}</span>
                </div>
                <div class="space-y-3">
                  <h4 class="text-lg font-bold text-white font-a2zM leading-snug">{{ obj.title }}</h4>
                  <p class="text-[13px] text-slate-500 font-a2zL leading-relaxed italic">
                    {{ obj.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
@keyframes scan {
  from { transform: translateY(-100%); }
  to { transform: translateY(100%); }
}
</style>