// re-earth-frontend/src/api/http.js
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_API_URL

// axios 인스턴스 (세션-쿠키 기반)
const reEarth = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   // 세션 쿠키 전달 (백엔드 CORS: credentials:true 필요)
   withCredentials: true,

   validateStatus: (status) => {
      // 200~499 까지는 reject하지 않고 resolve 시킴
      return status >= 200 && status < 500
   },
})

// (선택) 토큰 기반 API도 겸용할 때만 주입
reEarth.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('token')
      if (token) {
         // 서버가 Bearer 토큰을 인식할 때만 사용하세요.
         config.headers.Authorization = `Bearer ${token}`
      }
      return config
   },
   (error) => Promise.reject(error)
)

// ✅ 응답 인터셉터 추가
reEarth.interceptors.response.use(
   (response) => response,
   (error) => {
      // /auth/me 요청에서 401이 발생한 경우 → reject하지 않고 응답 객체 그대로 반환
      if (error?.config?.url?.includes('/auth/me') && error?.response?.status === 401) {
         return error.response
      }
      return Promise.reject(error)
   }
)

export default reEarth
