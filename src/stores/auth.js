import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import api from '@/api/axios'

export const useAuthStore = defineStore('auth', () => {

  // 1. 로컬스토리지에서 토큰 가져오기 => 상태
  const accessToken = ref(localStorage.getItem('accessToken') || '')
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')) || null);

  // 토큰 유무로 로그인 판별
  const isAuthenticated = computed(() => !!accessToken.value)
  
  async function login(loginId, loginPassword) {
    try {
      const response = await api.post('/api/auth/login', {loginId, loginPassword});

      const { accessToken: fetchAccessToken, userInfo: fetchUserInfo } = response.data.result;

      accessToken.value = fetchAccessToken;
      userInfo.value = fetchUserInfo;

      localStorage.setItem('accessToken', fetchAccessToken);
      localStorage.setItem('userInfo', JSON.stringify(fetchUserInfo));

      return true;
      
    } catch (error) {
      return false;
    }
  }

  function logout() {
    accessToken.value = '';
    userInfo.value = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
  }

  // 정보 수정 함수 등등 추가

  return { accessToken, userInfo, isAuthenticated, login, logout}
})
