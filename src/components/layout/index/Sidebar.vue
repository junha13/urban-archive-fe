<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NAV_ITEMS } from '@/constants/navigation'
import { cn } from '@/lib/utils'

const router = useRouter()
const route = useRoute()

const currentMenu = computed(() => {
  const parentPath = '/' + route.path.split('/')[1]
  return NAV_ITEMS.find(item => item.path === parentPath)
})

const currentSubItems = computed(() => currentMenu.value ? currentMenu.value.children : [])
</script>

<template>
  <aside 
    v-if="currentSubItems.length > 0"
    class="hidden sm:block sticky top-28 ml-10 w-[130px] h-fit shrink-0 font-a2zM"
  >
    <nav class="relative p-2 bg-slate-950/80 backdrop-blur-xl rounded-[25px] border border-white/5 shadow-2xl">
      
      <div class="px-3 pt-2 pb-2 select-none">
        <p class="text-[9px] uppercase tracking-[0.2em] text-blue-500/50 font-bold">Menu</p>
        <h3 class="text-[12px] text-slate-400 font-medium truncate">{{ currentMenu?.name }}</h3>
      </div>

      <div class="flex flex-col gap-1">
        <button
          v-for="child in currentSubItems"
          :key="child.path"
          @click="router.push(child.path)"
          :class="cn(
            'relative flex items-center h-10 px-3 rounded-2xl text-[13px] transition-all duration-500 ease-in-out group',
            route.path === child.path 
              ? 'text-white' 
              : 'text-slate-500 hover:text-slate-200'
          )"
        >
          <div 
            v-if="route.path === child.path"
            class="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-inner"
          ></div>

          <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

          <span 
            class="relative z-10 w-0.5 rounded-full transition-all duration-500 ease-out mr-2",
            :class="route.path === child.path ? 'h-3 bg-cyan-300 shadow-[0_0_10px_#67e8f9]' : 'h-1 bg-slate-700 group-hover:bg-slate-500'"
          ></span>
          
          <span class="relative z-10 truncate transition-transform duration-300 group-hover:translate-x-0.5">
            {{ child.name }}
          </span>
        </button>
      </div>
    </nav>

    <div class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/5 blur-[50px] rounded-full"></div>
  </aside>
</template>