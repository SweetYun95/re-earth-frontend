// src/api/http.js
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_API_URL

const reEarth = axios.create({
   baseURL: BASE_URL,
   headers: { 'Content-Type': 'application/json' },
   withCredentials: true,
   // 기본값 validateStatus는 200~299만 성공 처리, 4xx/5xx는 throw
   // → 여기서는 굳이 override 안 합니다.
})

// ───────── 요청 인터셉터
reEarth.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('token')
      const url = (config.url || '').toString()

      // 로그인/회원가입 계열은 토큰 헤더 붙이지 않음
      const skipAuthHeader = /\/auth\/(login|login-admin|join)\b/i.test(url)

      if (token && !skipAuthHeader) {
         // 서버가 Bearer 접두사 없이도 처리 가능하다면 그대로 전달
         config.headers.Authorization = `${token}`
         // 만약 Bearer 접두사가 필요하다면 아래처럼 변경
         // config.headers.Authorization = `Bearer ${token}`
      }
      return config
   },
   (error) => Promise.reject(error)
)

// ───────── 응답 인터셉터
reEarth.interceptors.response.use(
   (response) => {
      // /auth/me 는 401도 그대로 돌려서 하이드레이션 로직에서 처리
      if (response.config?.url?.includes('/auth/me') && response.status === 401) {
         return response
      }

      // 2xx 범위를 벗어나면 에러로 던지기
      if (response.status < 200 || response.status >= 300) {
         return Promise.reject(response)
      }
      return response
   },
   (error) => Promise.reject(error)
)

export default reEarth
