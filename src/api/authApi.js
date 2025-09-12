// re-earth-frontend/src/api/authApi.js
import reEarth from './http'

// .env에 등록된 백엔드 주소 사용
const BASE_API_URL = import.meta.env.VITE_APP_API_URL

// 회원가입 (local)
export const registerUser = async (userData) => {
   const res = await reEarth.post('/auth/join', userData)
   return res
}

// 로그인 (local)
export const loginUser = async (credentials) => {
   const res = await reEarth.post('/auth/login', credentials)
   return res
}

// 로그아웃 (백엔드: GET /auth/logout)
export const logoutUser = async () => {
   const res = await reEarth.get('/auth/logout')
   return res
}

// 로그인 상태 확인 (백엔드: GET /auth/status)
export const checkAuthStatus = async () => {
   const res = await reEarth.get('/auth/status')
   return res
}

// 소셜 로그인 (Google/Kakao) — 리다이렉트 방식
export const redirectToGoogleLogin = () => {
   window.location.href = `${BASE_API_URL}/auth/google`
}

export const redirectToKakaoLogin = () => {
   window.location.href = `${BASE_API_URL}/auth/kakao`
}

// 콜백은 OAuth 제공자 → 백엔드로 직접 돌아옵니다.
// 프런트에선 콜백 직후 사용자를 다시 앱으로 유도했다면,
// 세션이 잡힌 상태이므로 /auth/status 로 로그인 상태만 재확인하면 됩니다.
export const checkStatusAfterOAuth = async () => {
   return checkAuthStatus()
}

// (선택) 중복/보조 API 들은 백엔드 라우트가 준비되면 활성화하세요.
// export const checkUsername = async (userId) => reEarth.post('/auth/check-username', { userId })
// export const checkEmail = async (email) => reEarth.post('/auth/check-email', { email })
// export const findId = async (phoneNumber) => reEarth.post('/auth/findid', { phoneNumber })
// export const updatePassword = async ({ userId, phoneNumber }) => reEarth.post('/auth/updatepw', { userId, phoneNumber })
// export const updateMyInfo = async (data) => reEarth.put('/auth', data)
// export const verifyPassword = async (password) => reEarth.post('/auth/verify', { password })