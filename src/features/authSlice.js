// re-earth-frontend/src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser, loginUser, logoutUser, checkAuthStatus } from '../api/authApi'

// -----------------------------
// helpers
// -----------------------------
const normalizeAuthPayload = (raw) => {
   const p = raw?.data ?? raw ?? {}
   const hasFlag = typeof p.isAuthenticated === 'boolean'
   const user = p.user ?? null
   return {
      user,
      isAuthenticated: hasFlag ? !!p.isAuthenticated : !!user,
   }
}

const flagByProvider = (norm, provider) => ({
   ...norm,
   googleAuthenticated: provider === 'google' ? norm.isAuthenticated : false,
   kakaoAuthenticated: provider === 'kakao' ? norm.isAuthenticated : false,
   localAuthenticated: provider === 'local' ? norm.isAuthenticated : false,
   _provider: provider,
})

// -----------------------------
// Thunks (only routes that actually exist)
// -----------------------------
export const registerUserThunk = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
   try {
      const response = await registerUser(userData)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '회원가입 실패')
   }
})

export const loginUserThunk = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
   try {
      const response = await loginUser(credentials)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로그인 실패')
   }
})

export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
   try {
      const response = await logoutUser()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로그아웃 실패')
   }
})

// 단일 상태 확인(세션) — 소셜/로컬 공통으로 /auth/status 사용
export const checkLocalStatusThunk = createAsyncThunk('auth/checkLocalStatus', async (_, { rejectWithValue }) => {
   try {
      const response = await checkAuthStatus()
      return flagByProvider(normalizeAuthPayload(response.data), 'local')
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로컬 로그인 상태 확인 실패')
   }
})

export const checkGoogleStatusThunk = createAsyncThunk('auth/checkGoogleStatus', async (_, { rejectWithValue }) => {
   try {
      const response = await checkAuthStatus()
      return flagByProvider(normalizeAuthPayload(response.data), 'google')
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '구글 로그인 상태 확인 실패')
   }
})

export const checkKakaoStatusThunk = createAsyncThunk('auth/checkKakaoStatus', async (_, { rejectWithValue }) => {
   try {
      const response = await checkAuthStatus()
      return flagByProvider(normalizeAuthPayload(response.data), 'kakao')
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '카카오 로그인 상태 확인 실패')
   }
})

// ✅ 통합 상태 점검 — 셋 중 하나라도 로그인되어 있으면 true로 간주
export const checkUnifiedAuthThunk = createAsyncThunk('auth/checkUnified', async (_, { dispatch }) => {
   const [localRes, googleRes, kakaoRes] = await Promise.allSettled([dispatch(checkLocalStatusThunk()).unwrap(), dispatch(checkGoogleStatusThunk()).unwrap(), dispatch(checkKakaoStatusThunk()).unwrap()])

   const picks = [localRes, googleRes, kakaoRes].filter((r) => r.status === 'fulfilled').map((r) => r.value)

   if (picks.length === 0) {
      return { user: null, isAuthenticated: false, googleAuthenticated: false, kakaoAuthenticated: false, localAuthenticated: false, uncertain: true }
   }

   const authed = picks.filter((n) => n.isAuthenticated)
   if (authed.length === 0) {
      return { user: null, isAuthenticated: false, googleAuthenticated: false, kakaoAuthenticated: false, localAuthenticated: false, uncertain: false }
   }

   authed.sort((a, b) => (b.user ? 1 : 0) - (a.user ? 1 : 0))
   const best = authed[0]

   const googleAuthenticated = picks.some((p) => p.googleAuthenticated)
   const kakaoAuthenticated = picks.some((p) => p.kakaoAuthenticated)
   const localAuthenticated = picks.some((p) => p.localAuthenticated)

   return {
      user: best.user || null,
      isAuthenticated: true,
      googleAuthenticated,
      kakaoAuthenticated,
      localAuthenticated,
      uncertain: false,
   }
})

// -----------------------------
// Slice
// -----------------------------
const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      isAuthenticated: false,
      googleAuthenticated: false,
      kakaoAuthenticated: false,
      localAuthenticated: false,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         // 회원가입
         .addCase(registerUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(registerUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 일반 로그인
         .addCase(loginUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(loginUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.localAuthenticated = true
            state.user = action.payload
         })
         .addCase(loginUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 로그아웃
         .addCase(logoutUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(logoutUserThunk.fulfilled, (state) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null
            state.googleAuthenticated = false
            state.kakaoAuthenticated = false
            state.localAuthenticated = false
         })
         .addCase(logoutUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 개별 체크들 (즉시 false로 강제하지 않음)
         .addCase(checkLocalStatusThunk.pending, (state) => {
            state.loading = true
         })
         .addCase(checkLocalStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            const n = action.payload
            if (n.isAuthenticated) {
               state.localAuthenticated = true
               state.isAuthenticated = true
               state.user = n.user || state.user
            }
         })
         .addCase(checkLocalStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         .addCase(checkGoogleStatusThunk.pending, (state) => {
            state.loading = true
         })
         .addCase(checkGoogleStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            const n = action.payload
            if (n.isAuthenticated) {
               state.googleAuthenticated = true
               state.isAuthenticated = true
               state.user = n.user || state.user
            }
         })
         .addCase(checkGoogleStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         .addCase(checkKakaoStatusThunk.pending, (state) => {
            state.loading = true
         })
         .addCase(checkKakaoStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            const n = action.payload
            if (n.isAuthenticated) {
               state.kakaoAuthenticated = true
               state.isAuthenticated = true
               state.user = n.user || state.user
            }
         })
         .addCase(checkKakaoStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // ✅ 통합 체크 — 최종 판단자
         .addCase(checkUnifiedAuthThunk.pending, (state) => {
            state.loading = true
         })
         .addCase(checkUnifiedAuthThunk.fulfilled, (state, action) => {
            state.loading = false
            const { user, isAuthenticated, googleAuthenticated, kakaoAuthenticated, localAuthenticated, uncertain } = action.payload
            if (uncertain && state.isAuthenticated) return // 불확실하면 기존 true를 보존
            state.isAuthenticated = isAuthenticated
            state.googleAuthenticated = !!googleAuthenticated
            state.kakaoAuthenticated = !!kakaoAuthenticated
            state.localAuthenticated = !!localAuthenticated
            state.user = user
         })
   },
})

export default authSlice.reducer
