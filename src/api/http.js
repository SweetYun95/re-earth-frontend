// re-earth-frontend/src/api/http.js
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_API_URL

const reEarth = axios.create({
   baseURL: BASE_URL,
   headers: { 'Content-Type': 'application/json' },
   withCredentials: true,
   validateStatus: (status) => status >= 200 && status < 500,
})

reEarth.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('token')
      const url = (config.url || '').toString()

      // ✅ 세션/회원 쪽은 토큰 헤더를 붙이지 않는다
      // - /auth/login
      // - /auth/login-admin
      // - /auth/join   (백엔드 경로는 register가 아니라 join)
      const skipAuthHeader = /\/auth\/(login|login-admin|join)\b/i.test(url)

      if (token && !skipAuthHeader) {
         // 서버는 Bearer 접두사 없이도 받도록 구현되어 있음
         config.headers.Authorization = `${token}`
         // 필요 시: config.headers.Authorization = `Bearer ${token}`
      }
      return config
   },
   (error) => Promise.reject(error)
)

reEarth.interceptors.response.use(
   (response) => response,
   (error) => {
      // /auth/me 401은 리다이렉트 대신 응답 그대로 돌려서 하이드레이션 처리
      if (error?.config?.url?.includes('/auth/me') && error?.response?.status === 401) {
         return error.response
      }
      return Promise.reject(error)
   }
)

export default reEarth
