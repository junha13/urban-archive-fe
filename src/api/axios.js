import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL_LOCAL,
    withCredentials: true,
    timeout: 5000, 
})

// 모든 요청에 token 주입
api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
})

// 모든 응답을 확인해 권한 체크 => 로그인 창으로 보내기
api.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // 로그인 페이지 보내기
        }
        return Promise.reject(error);
    })

export default api;