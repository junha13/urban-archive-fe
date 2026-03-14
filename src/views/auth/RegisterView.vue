<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  User, Lock, Mail, Phone, Hash, 
  CheckCircle2, ArrowLeft, ShieldCheck 
} from 'lucide-vue-next'

const router = useRouter()

const form = reactive({
  loginId: '',
  password: '',
  passwordConfirm: '',
  name: '',
  studentId: '',
  email: '',
  phone: '',
  agreeTerms: false
})

const isIdChecked = ref(false)
const isPasswordMatch = computed(() => form.password && form.password === form.passwordConfirm)

const checkDuplicateId = () => {
  if (!form.loginId) return alert('아이디를 입력해주세요.')
  alert('사용 가능한 아이디입니다.')
  isIdChecked.value = true
}

const handleRegisterRequest = () => {
  if (!isIdChecked.value) return alert('아이디 중복 확인이 필요합니다.')
  alert('회원가입 요청이 완료되었습니다. 관리자 승인 후 이용 가능합니다.')
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen py-16 flex flex-col items-center justify-center bg-[#f8fafc] relative font-a2zL selection:bg-slate-900 selection:text-white">
    
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 opacity-[0.4] bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>
    </div>

    <main class="relative z-10 w-full max-w-[500px] px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div class="mb-8 flex justify-between items-end px-2">
        <div class="space-y-1">
          <h1 class="text-2xl font-black text-slate-900 tracking-tight font-a2zM uppercase">Register</h1>
          <p class="text-slate-400 text-[10px] font-a2zL uppercase tracking-widest">Urban Information Engineering</p>
        </div>
        <button @click="router.push('/login')" class="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors font-a2zM uppercase">
          <ArrowLeft class="w-3.5 h-3.5" /> Back to Login
        </button>
      </div>

      <div class="bg-white border border-slate-200 rounded-[40px] p-8 md:p-12 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.12)] space-y-10">
        
        <form @submit.prevent="handleRegisterRequest" class="space-y-10">
          
          <div class="space-y-5">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-1.5 h-4 bg-slate-900 rounded-full"></div>
              <span class="text-[11px] font-bold text-slate-900 uppercase tracking-widest font-a2zM">Account Credentials</span>
            </div>

            <div class="space-y-1.5">
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 font-a2zM block text-left">ID</label>
              <div class="flex gap-2">
                <div class="relative group flex-1">
                  <User class="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-slate-900 transition-colors z-10" />
                  <input v-model="form.loginId" type="text" placeholder="아이디" required @input="isIdChecked = false"
                    class="w-full bg-slate-100/80 border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all font-a2zL shadow-inner" />
                  <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-focus-within:h-1/2 bg-slate-900 transition-all duration-300 rounded-r-full"></div>
                </div>
                <button type="button" @click="checkDuplicateId"
                  class="px-5 bg-slate-900 hover:bg-black text-white text-[10px] font-bold rounded-xl transition-all active:scale-[0.96] whitespace-nowrap font-a2zM shadow-lg shadow-slate-900/10">
                  중복확인
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 font-a2zM block text-left">Password</label>
                <div class="relative group">
                  <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-slate-900 transition-colors z-10" />
                  <input v-model="form.password" type="password" placeholder="비밀번호" required
                    class="w-full bg-slate-100/80 border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all font-a2zL shadow-inner" />
                  <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-focus-within:h-1/2 bg-slate-900 transition-all duration-300 rounded-r-full"></div>
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 font-a2zM block text-left">Confirm</label>
                <div class="relative group">
                  <input v-model="form.passwordConfirm" type="password" placeholder="확인" required
                    :class="['w-full bg-slate-100/80 border rounded-xl py-2.5 px-4 text-xs transition-all font-a2zL shadow-inner focus:outline-none focus:bg-white focus:ring-4', 
                               form.passwordConfirm ? (isPasswordMatch ? 'border-green-200 focus:border-green-500 focus:ring-green-500/5' : 'border-red-200 focus:border-red-500 focus:ring-red-500/5') : 'border-slate-200/60 focus:border-slate-900 focus:ring-slate-900/5']" />
                  <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-focus-within:h-1/2 bg-slate-900 transition-all duration-300 rounded-r-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-5">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-1.5 h-4 bg-slate-900 rounded-full"></div>
              <span class="text-[11px] font-bold text-slate-900 uppercase tracking-widest font-a2zM">User Identification</span>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 font-a2zM block text-left">Name</label>
                <div class="relative group">
                  <input v-model="form.name" type="text" placeholder="성함" required
                    class="w-full bg-slate-100/80 border border-slate-200/60 rounded-xl py-2.5 px-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all font-a2zL shadow-inner" />
                  <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-focus-within:h-1/2 bg-slate-900 transition-all duration-300 rounded-r-full"></div>
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 font-a2zM block text-left">Student ID</label>
                <div class="relative group">
                  <Hash class="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-slate-900 transition-colors z-10" />
                  <input v-model="form.studentId" type="text" placeholder="학번/사번" required
                    class="w-full bg-slate-100/80 border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all font-a2zL shadow-inner" />
                  <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-focus-within:h-1/2 bg-slate-900 transition-all duration-300 rounded-r-full"></div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 font-a2zM block text-left">Email</label>
                <div class="relative group">
                  <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-slate-900 transition-colors z-10" />
                  <input v-model="form.email" type="email" placeholder="이메일" required
                    class="w-full bg-slate-100/80 border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all font-a2zL shadow-inner" />
                  <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-focus-within:h-1/2 bg-slate-900 transition-all duration-300 rounded-r-full"></div>
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 font-a2zM block text-left">Phone</label>
                <div class="relative group">
                  <Phone class="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-slate-900 transition-colors z-10" />
                  <input v-model="form.phone" type="tel" placeholder="연락처" required
                    class="w-full bg-slate-100/80 border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all font-a2zL shadow-inner" />
                  <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-focus-within:h-1/2 bg-slate-900 transition-all duration-300 rounded-r-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-6 pt-2">
            <label class="flex items-start gap-3 cursor-pointer group">
              <input v-model="form.agreeTerms" type="checkbox" required
                class="mt-1 w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 focus:ring-offset-0 transition-all" />
              <span class="text-[11px] text-slate-500 leading-relaxed font-a2zL text-left">
                안양대학교 학생/교직원임을 확인하며, 시스템 <span class="text-slate-900 font-bold underline cursor-help">이용 약관</span> 및 개인정보 수집에 동의합니다.
              </span>
            </label>

            <button type="submit" :disabled="!form.agreeTerms || !isPasswordMatch"
              class="w-full bg-slate-900 hover:bg-black disabled:bg-slate-200 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl shadow-slate-900/20 font-a2zM uppercase tracking-widest">
              <CheckCircle2 class="w-4 h-4" /> Request Membership
            </button>
          </div>
        </form>
      </div>

      <div class="mt-8 flex items-center justify-center gap-1.5 text-slate-300 font-mono">
        <ShieldCheck class="w-3.5 h-3.5" />
        <span class="text-[9px] uppercase tracking-tighter font-bold">Encrypted Registration Channel</span>
      </div>
    </main>

    <footer class="mt-12 mb-8 text-center text-[9px] text-slate-300 font-mono tracking-widest uppercase font-a2zL">
      &copy; 2026 Anyang Univ. Dept. of Urban Info. Eng.
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