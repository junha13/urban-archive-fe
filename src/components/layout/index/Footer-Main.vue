<script setup>
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronUp } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()

const relatedSites = [
  { name: '안양대학교 메인', url: 'https://www.anyang.ac.kr/main/index.do' },
  { name: '안양대학교 포털', url: 'https://portal.anyang.ac.kr/' },
  { name: '@@', url: '#' },
  { name: '@@', url: 'https://www.molit.go.kr' }
]

const openSite = (url) => {
  if (url !== '#') window.open(url, '_blank')
}
</script>

<template>
  <footer class="w-full bg-slate-950 text-slate-400 py-4 px-6 lg:px-10 font-a2zL border-t border-slate-900">
    <div class="max-w-[1440px] w-full mx-auto space-y-2">
      
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <router-link to="/" class="shrink-0">
          <img src="/anyangLogo.png" alt="Logo" class="h-9 w-auto brightness-0 invert opacity-70" />
        </router-link>

        <div class="shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button 
                variant="outline" 
                class="w-52 h-9 justify-between bg-transparent border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white font-a2zM text-xs focus-visible:ring-0"
              >
                관련 사이트 바로가기
                <ChevronUp class="h-3.5 w-3.5 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent 
              side="top" 
              align="end" 
              class="w-52 mb-2 bg-slate-900 border-slate-800 text-slate-300 font-a2zM shadow-2xl"
            >
              <DropdownMenuItem 
                v-for="site in relatedSites" 
                :key="site.name"
                @click="openSite(site.url)"
                class="cursor-pointer hover:bg-slate-600 text-xs py-2"
              >
                {{ site.name }}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div class="pt-3 border-t border-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[11px] opacity-50">
        <div class="space-y-0.5">
          <p>경기도 안양시 동안구 시민대로 (안양시청) | TEL: 031-000-0000</p>
          <p>© {{ currentYear }} ANYANG URBAN ARCHIVE. All Rights Reserved.</p>
        </div>
        
        <div class="flex gap-5">
          <a href="#" class="hover:text-white transition-colors">개인정보처리방침</a>
          <a href="#" class="hover:text-white transition-colors">이용약관</a>
          <a href="#" class="hover:text-white transition-colors">이메일무단수집거부</a>
        </div>
      </div>
    </div>
  </footer>
</template>