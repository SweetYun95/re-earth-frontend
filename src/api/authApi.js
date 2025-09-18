// re-earth-frontend/src/api/authApi.js
import reEarth from './http'

const BASE_API_URL = import.meta.env.VITE_APP_API_URL

// ───────── Local Auth ─────────
export const registerUser = async (userData) => {
   const res = await reEarth.post('/auth/join', userData)
   return res
}

export const loginUser = async (credentials) => {
   const res = await reEarth.post('/auth/login', credentials)
   if (res?.data?.token) {
      localStorage.setItem('token', res.data.token)
   }
   return res
}

export const logoutUser = async () => {
   const res = await reEarth.get('/auth/logout')
   localStorage.removeItem('token')
   return res
}

// ───────── 세션 사용자 조회(단일 진실원천) ─────────
// 401도 reject하지 않도록 try/catch로 흡수
export const fetchMe = async () => {
   try {
      const res = await reEarth.get('/auth/me')
      return res
   } catch (err) {
      if (err?.response?.status === 401) {
         return err.response // 비로그인: 401을 정상처럼 돌려줌
      }
      throw err // 네트워크 단절 등 진짜 오류만 던짐
   }
}

// (기존) 상태 확인 (가능하면 /me 사용 권장)
export const checkAuthStatus = async () => {
   const res = await reEarth.get('/auth/status')
   return res
}

// ───────── Social Auth (redirect) ─────────
export const redirectToGoogleLogin = () => {
   window.location.href = `${BASE_API_URL}/auth/google`
}

export const redirectToKakaoLogin = () => {
   window.location.href = `${BASE_API_URL}/auth/kakao`
}

// (OAuth 콜백 직후) 세션만 재확인
export const checkStatusAfterOAuth = async () => {
   return fetchMe()
}

// ───────── Dup Check ─────────
export const checkUsername = async (userId) => reEarth.post('/auth/check-username', { userId })
export const checkNickname = async (name) => reEarth.post('/auth/check-nickname', { name })
export const checkEmail = async (email) => reEarth.post('/auth/check-email', { email })

// // 필요한 경우 차후 활성화
// export const findId = async (phoneNumber) => reEarth.post('/auth/findid', { phoneNumber })
// export const updatePassword = async ({ userId, phoneNumber }) => reEarth.post('/auth/updatepw', { userId, phoneNumber })
// export const updateMyInfo = async (data) => reEarth.put('/auth', data)
// export const verifyPassword = async (password) => reEarth.post('/auth/verify', { password })
