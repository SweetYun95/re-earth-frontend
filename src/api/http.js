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

export default reEarth
