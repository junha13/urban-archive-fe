<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-vue-next' // ChevronDown 추가
import { NAV_ITEMS } from '@/constants/navigation'

const navItems = NAV_ITEMS
const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur font-a2zM">
    <div class="max-w-[1440px] w-full mx-auto flex h-16 items-center justify-between px-6 lg:px-10">
      
      <div class="flex items-center gap-10">
        <router-link to="/" class="flex items-center shrink-0">
          <img src="/anyangLogo.png" alt="Logo" class="h-10 w-auto object-contain" />
        </router-link>

        <nav class="flex items-center gap-2">
          <DropdownMenu v-for="item in navItems" :key="item.path">
            <DropdownMenuTrigger as-child>
              <Button 
                variant="ghost" 
                class="flex items-center gap-1 px-4 text-[15px] font-semibold text-slate-600 hover:text-slate-900 transition-all focus-visible:ring-0"
              >
                {{ item.name }}
                <ChevronDown class="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="start" class="w-48 mt-1 shadow-lg border-slate-100 font-a2zM">
              <DropdownMenuItem @click="router.push(item.path)" class="font-bold text-slate-900 cursor-pointer">
                {{ item.name }} 메인
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                v-for="child in item.children" 
                :key="child.path"
                @click="router.push(child.path)"
                class="text-slate-600 cursor-pointer"
              >
                {{ child.name }}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>

      <div class="flex items-center shrink-0">
        <template v-if="auth.isAuthenticated">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" class="h-10 w-10 rounded-full bg-slate-50 p-0 border border-slate-100 hover:bg-slate-100 transition-colors">
                <User class="h-5 w-5 text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-56 mt-3 shadow-xl border-slate-200 font-a2zM">
              <DropdownMenuLabel class="p-4">
                <div class="flex flex-col space-y-1">
                  <span class="text-sm font-bold text-slate-900">{{ auth.userInfo?.loginId }}님</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="router.push('/mypage')" class="py-2.5 cursor-pointer">
                <LayoutDashboard class="mr-3 h-4 w-4 text-slate-400" /> 
                <span class="text-sm font-medium">마이페이지</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="handleLogout" class="py-2.5 text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-600">
                <LogOut class="mr-3 h-4 w-4" /> 
                <span class="text-sm font-medium">로그아웃</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </template>

        <template v-else>
          <Button 
            variant="default" 
            size="sm" 
            @click="router.push('/login')" 
            class="px-5 bg-slate-900 hover:bg-slate-800 transition-colors font-bold"
          >
            로그인
          </Button>
        </template>
      </div>
    </div>
  </header>
</template>