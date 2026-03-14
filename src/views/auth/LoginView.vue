<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth' // 스토어 경로 확인 필요
import { User, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const loginError = ref(false) // 로그인 실패 메시지용 상태

const handleLogin = async () => {
  loginError.value = false
  
  // Pinia 스토어의 login 함수 호출
  const success = await authStore.login(username.value, password.value)
  
  if (success) {
    router.push('/') // 로그인 성공 시 메인으로 이동
  } else {
    loginError.value = true // 실패 시 에러 문구 표시
  }
}
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center bg-[#f8fafc] relative overflow-hidden font-a2zL selection:bg-slate-900 selection:text-white">
    
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 opacity-[0.5] bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>
    </div>

    <main class="relative z-10 w-full max-w-[360px] px-6 animate-in fade-in zoom-in-95 duration-700">
      
      <div class="text-center mb-10 space-y-2">
        <h1 class="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight font-a2zM">
          안양대학교<br/>도시정보공학과 아카이브
        </h1>
        <p class="text-slate-400 text-[10px] font-a2zL uppercase tracking-[0.2em]">Urban Information Engineering</p>
      </div>

      <div class="bg-white border border-slate-200 rounded-[32px] p-8 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.12)]">
        <form @submit.prevent="handleLogin" class="space-y-4">
          
          <div class="space-y-1.5">
            <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1 block text-left font-a2zM">ID</label>
            <div class="relative group">
              <User class="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-slate-900 transition-colors z-10" />
              <input 
                v-model="username"
                type="text" 
                placeholder="아이디"
                required
                class="w-full bg-slate-100/80 border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all font-a2zL shadow-inner"
              />
              <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-focus-within:h-1/2 bg-slate-900 transition-all duration-300 rounded-r-full"></div>
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1 block text-left font-a2zM">Password</label>
            <div class="relative group">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-slate-900 transition-colors z-10" />
              <input 
                v-model="password"
                type="password" 
                placeholder="비밀번호"
                required
                class="w-full bg-slate-100/80 border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all font-a2zL shadow-inner"
              />
              <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-focus-within:h-1/2 bg-slate-900 transition-all duration-300 rounded-r-full"></div>
            </div>
          </div>

          <div v-if="loginError" class="flex items-center gap-2 px-1 text-red-500 animate-in fade-in slide-in-from-top-1">
            <AlertCircle class="w-3 h-3" />
            <span class="text-[10px] font-bold">아이디 또는 비밀번호를 확인해주세요.</span>
          </div>

          <div class="flex items-center justify-between px-1">
            <div class="flex gap-4">
              <button type="button" class="text-[10px] text-slate-400 hover:text-slate-900 transition-colors font-a2zM uppercase">아이디 찾기</button>
              <button type="button" class="text-[10px] text-slate-400 hover:text-slate-900 transition-colors font-a2zM uppercase">비밀번호 찾기</button>
            </div>
          </div>

          <button 
            type="submit"
            class="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-2 shadow-lg shadow-slate-900/20 font-a2zM"
          >
            <span class="text-xs tracking-widest uppercase">Login</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </button>
        </form>

        <div class="mt-6 pt-5 border-t border-slate-100 text-center font-a2zL">
          <p class="text-[10px] text-slate-400">
            계정이 없으신가요? 
            <button 
            @click="router.push('/register')"
            class="text-slate-900 hover:underline font-bold ml-1 font-a2zM">회원가입</button>
          </p>
        </div>
      </div>

      <div class="mt-8 flex items-center justify-center gap-1.5 text-slate-300 font-mono">
        <ShieldCheck class="w-3.5 h-3.5" />
        <span class="text-[9px] uppercase tracking-tighter font-bold">Secure Link Established</span>
      </div>
    </main>

    <footer class="absolute bottom-6 w-full text-center">
      <p class="text-[9px] text-slate-200 font-mono tracking-widest uppercase font-a2zL">
        &copy; 2026 Anyang Univ. Dept. of Urban Info. Eng.
      </p>
    </footer>
  </div>
</template>

<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus {
  -webkit-text-fill-color: #0f172a;
  -webkit-box-shadow: 0 0 0px 1000px #ffffff inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>