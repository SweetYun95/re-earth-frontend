// re-earth-frontend/src/api/authApi.js
import reEarth from './http'

// .env에 등록된 백엔드 주소 사용
const BASE_API_URL = import.meta.env.VITE_APP_API_URL

// ───────── Local Auth ─────────

// 회원가입 (local)
export const registerUser = async (userData) => {
   const res = await reEarth.post('/auth/join', userData)
   return res
}

// 로그인 (local) — 세션 + (선택) 서버에서 JWT도 내려옴
export const loginUser = async (credentials) => {
   const res = await reEarth.post('/auth/login', credentials)
   // 서버가 token을 내려준다면 저장(선택)
   if (res?.data?.token) {
      localStorage.setItem('token', res.data.token)
   }
   return res
}

// 로그아웃
// 백엔드가 GET /auth/logout 이면 아래 그대로.
// 백엔드를 POST로 바꾸면 여기만 post로 교체하면 됨.
export const logoutUser = async () => {
   const res = await reEarth.get('/auth/logout')
   // 선택: 토큰도 함께 제거
   localStorage.removeItem('token')
   return res
}

// 현재 로그인 유저 조회(세션 기반의 단일 진실원천)
export const fetchMe = async () => {
   // 200 → { user }, 401 → { user: null }
   const res = await reEarth.get('/auth/me')
   return res
}

// (기존) 로그인 상태 확인이 필요하면 유지 가능하지만 /me로 대체 권장
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

// // 필요한 경우 차후에 활성화
// export const findId = async (phoneNumber) => reEarth.post('/auth/findid', { phoneNumber })
// export const updatePassword = async ({ userId, phoneNumber }) => reEarth.post('/auth/updatepw', { userId, phoneNumber })
// export const updateMyInfo = async (data) => reEarth.put('/auth', data)
// export const verifyPassword = async (password) => reEarth.post('/auth/verify', { password })
