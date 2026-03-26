<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useRecordStore } from '@/stores/record'
import { useAuthStore } from '@/stores/auth'
import PageTitle from '../../../components/layout/common/PageTitle.vue'
import { 
  Search, UserPlus, BookOpen, FileUp, X, 
  Check, Save, ArrowLeft, Plus
} from 'lucide-vue-next'

const router = useRouter()
const recordStore = useRecordStore()
const authStore = useAuthStore()

const form = reactive({
  userNumber: authStore.user?.user_number,
  subjectNumber: null,
  title: '',
  description: '',
  grade: 1,
  semester: '1학기',
})

const file = ref(null)
const taggedUsers = ref([])

// 검색 상태
const subjectQuery = ref('')
const userQuery = ref('')
const isSubjectSearching = ref(false)

// 가상 데이터
const mockSubjects = [
  { id: 1, name: '도시설계스튜디오1' }, { id: 2, name: '공간정보분석' },
  { id: 3, name: '도시계획론' }, { id: 4, name: '스마트도시개론' }
]
const mockUsers = [
  { user_number: 101, name: '김준하', student_id: '20201234' },
  { user_number: 102, name: '이민수', student_id: '20215678' }
]

const filteredSubjects = computed(() => 
  subjectQuery.value ? mockSubjects.filter(s => s.name.includes(subjectQuery.value)) : []
)

const filteredUsers = computed(() => 
  userQuery.value ? mockUsers.filter(u => u.name.includes(userQuery.value) && !taggedUsers.value.find(t => t.user_number === u.user_number)) : []
)

const selectSubject = (s) => {
  form.subject_number = s.id
  form.subject_name = s.name
  subjectQuery.value = s.name
  isSubjectSearching.value = false
}

const handleFile = (e) => {
  const selectedFile = e.target.files[0]
  if (!selectedFile) return
  const allowed = ['application/pdf', 'image/jpeg', 'image/jpg']
  if (!allowed.includes(selectedFile.type)) {
    alert('PDF, JPG, JPEG 파일만 가능합니다.')
    return
  }
  file.value = selectedFile
}

const addTag = (user) => {
  taggedUsers.value.push(user)
  userQuery.value = ''
}
const removeTag = (id) => {
  taggedUsers.value = taggedUsers.value.filter(u => u.user_number !== id)
}

const submitRecord = async () => {
  if (!form.title || !form.subject_number || !file.value) {
    alert('필수 항목을 모두 채워주세요.')
    return
  }
  const recordRequest = {
    title: form.title, subject_number: form.subject_number,
    description: form.description, grade: form.grade,
    semester: form.semester, user_numbers: taggedUsers.value.map(u => u.user_number)
  }
  const result = await recordStore.insertRecord(recordRequest, file.value)
  if (result) {
    alert('등록되었습니다.')
    router.push('/archive/list')
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto pb-32 selection:bg-slate-900 selection:text-white">
    
    <PageTitle tag="Archive" title="기록물 등록" />

    <main class="mt-6">
      
      <section class="flex justify-between items-center mb-6">
        <button @click="router.back()" class="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors font-a2zM uppercase">
          <ArrowLeft class="w-3.5 h-3.5" /> 돌아가기
        </button>
        <button @click="submitRecord" :disabled="recordStore.loading"
          class="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-lg text-[11px] font-bold hover:bg-black transition-all font-a2zM shadow-sm disabled:bg-slate-300 uppercase">
          <Save class="w-3.5 h-3.5" /> 저장하기
        </button>
      </section>

      <div class="">
        <div class="border-t-2 border-slate-900 overflow-hidden">
          
          <div class="flex border-b border-slate-200 min-h-[60px]">
            <div class="w-32 md:w-44 bg-slate-50 flex items-center px-6 border-r border-slate-200">
              <span class="text-[11px] font-bold text-slate-500 font-a2zM tracking-widest">기록물 제목</span>
            </div>
            <div class="flex-1 flex items-center relative group">
              <input v-model="form.title" type="text" placeholder="제목을 입력하세요"
                class="w-full h-full px-6 text-sm text-slate-900 focus:outline-none focus:bg-white transition-all font-a2zM" />
              <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-900 scale-y-0 group-focus-within:scale-y-100 transition-transform"></div>
            </div>
          </div>

          <div class="flex border-b border-slate-200 min-h-[60px]">
            <div class="w-32 md:w-44 bg-slate-50 flex items-center px-6 border-r border-slate-200">
              <span class="text-[11px] font-bold text-slate-500 font-a2zM tracking-widest">과목 검색</span>
            </div>
            <div class="flex-1 flex items-center relative group">
              <input v-model="subjectQuery" @focus="isSubjectSearching = true" type="text" placeholder="과목명을 입력하세요"
                class="w-full h-full px-6 text-sm text-slate-900 focus:outline-none focus:bg-white transition-all font-a2zM" />
              <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-900 scale-y-0 group-focus-within:scale-y-100 transition-transform"></div>
              
              <div v-if="isSubjectSearching && filteredSubjects.length" class="absolute z-50 left-0 right-0 top-full bg-white border border-slate-200 shadow-xl py-1">
                <button v-for="s in filteredSubjects" :key="s.id" @click="selectSubject(s)"
                  class="w-full text-left px-6 py-2.5 text-xs hover:bg-slate-50 font-a2zM text-slate-700 flex justify-between">
                  {{ s.name }} <Check v-if="form.subject_number === s.id" class="w-3 h-3 text-slate-900" />
                </button>
              </div>
            </div>
            <div class="w-32 md:w-44 bg-slate-50 flex items-center px-6 border-r border-slate-200">
              <span class="text-[11px] font-bold text-slate-500 font-a2zM tracking-widest">학년 / 학기</span>
            </div>
            <div class="flex-1 flex items-center divide-x divide-slate-100">
              <div class="flex-1 h-full relative group">
                <select v-model="form.grade" class="w-full h-full px-6 text-xs font-a2zM focus:outline-none appearance-none cursor-pointer">
                  <option v-for="g in 4" :key="g" :value="g">{{ g }}학년</option>
                </select>
                <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-900 scale-y-0 group-focus-within:scale-y-100 transition-transform"></div>
              </div>
              <div class="flex-1 h-full relative group">
                <select v-model="form.semester" class="w-full h-full px-6 text-xs font-a2zM focus:outline-none appearance-none cursor-pointer">
                  <option>1학기</option><option>2학기</option><option>여름학기</option><option>겨울학기</option>
                </select>
                <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-900 scale-y-0 group-focus-within:scale-y-100 transition-transform"></div>
              </div>
            </div>
          </div>

          <div class="flex border-b border-slate-200 min-h-[60px] overflow-visible">
            <div class="w-32 md:w-44 bg-slate-50 flex items-center px-6 border-r border-slate-200 shrink-0">
                <span class="text-[11px] font-bold text-slate-500 font-a2zM tracking-widest whitespace-nowrap">팀원 태그</span>
            </div>
            
            <div class="flex-1 flex items-center gap-4 px-6 py-2">
                <div class="relative w-64 shrink-0 h-10">
                <UserPlus class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                
                <input 
                    v-model="userQuery" 
                    type="text" 
                    placeholder="이름으로 검색 (본인 X)"
                    class="w-full h-full pl-10 pr-4 text-xs border border-slate-200 focus:border-slate-900 focus:outline-none transition-all font-a2zM bg-white" 
                />
                
                <div v-if="userQuery" class="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-slate-200 shadow-xl rounded-md py-1 overflow-hidden">
                    <button 
                    v-for="u in filteredUsers" :key="u.user_number" 
                    @click="addTag(u)"
                    class="w-full text-left px-4 py-2.5 text-[11px] hover:bg-slate-50 font-a2zM flex justify-between items-center group/item"
                    >
                    <span class="text-slate-700 font-bold group-hover/item:text-slate-900">{{ u.name }}</span>
                    <span class="text-slate-300 text-[10px]">({{ u.student_id }})</span>
                    </button>
                </div>
                </div>

                <div class="flex flex-wrap gap-2 items-center">
                <div v-for="u in taggedUsers" :key="u.user_number" 
                    class="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded text-[10px] font-bold font-a2zM whitespace-nowrap transition-all hover:bg-black"
                >
                    {{ u.name }}({{ u.student_id }})
                    <X @click="removeTag(u.user_number)" class="w-3.5 h-3.5 cursor-pointer hover:text-red-400" />
                </div>
                </div>
            </div>
            </div>
          <div class="flex border-b border-slate-200 min-h-[60px]">
            <div class="w-32 md:w-44 bg-slate-50 flex items-center px-6 border-r border-slate-200">
              <span class="text-[11px] font-bold text-slate-500 font-a2zM tracking-widest">첨부 파일</span>
            </div>
            <div class="flex-1 flex items-center px-6 gap-4">
              <label class="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded text-[10px] font-bold cursor-pointer transition-colors font-a2zM flex items-center gap-2">
                <FileUp class="w-3.5 h-3.5" /> 파일 선택
                <input type="file" class="hidden" accept=".pdf,.jpg,.jpeg" @change="handleFile" />
              </label>
              <span class="text-xs text-slate-400 font-a2zL truncate max-w-md">
                {{ file ? file.name : 'PDF, JPG, JPEG (최대 1개)' }}
              </span>
            </div>
          </div>
          <div class="flex border-b border-slate-200 min-h-[200px]">
            <div class="w-32 md:w-44 bg-slate-50 flex items-start py-6 px-6 border-r border-slate-200">
              <span class="text-[11px] font-bold text-slate-500 font-a2zM tracking-widest">상세 설명</span>
            </div>
            <div class="flex-1 relative group">
              <textarea v-model="form.description" class="w-full h-full p-6 text-sm text-slate-900 focus:outline-none resize-none font-a2zL leading-relaxed" placeholder="기록물에 대한 설명을 입력하세요"></textarea>
              <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-900 scale-y-0 group-focus-within:scale-y-100 transition-transform"></div>
            </div>
          </div>

          

        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* 셀렉트 화살표 숨기기 및 커스텀 (깔끔하게) */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23cbd5e1'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1.5rem center;
  background-size: 0.8rem;
}
</style>