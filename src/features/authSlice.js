// re-earth-frontend/src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser, loginUser, logoutUser, fetchMe } from '../api/authApi'

// ─────────────────────────────────────────────
// Thunks
// ─────────────────────────────────────────────

// 앱 시작/새로고침 시: 세션 상태 재하이드
export const hydrateAuthThunk = createAsyncThunk('auth/hydrate', async (_, { rejectWithValue }) => {
   try {
      const res = await fetchMe() // 200 → { user }
      return { user: res.data.user, isAuthenticated: true }
   } catch (err) {
      // 401 → 비로그인
      if (err?.response?.status === 401) {
         return { user: null, isAuthenticated: false }
      }
      return rejectWithValue(err?.response?.data?.message || '세션 확인 실패')
   }
})

export const registerUserThunk = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
   try {
      const response = await registerUser(userData)
      // 회원가입 후 자동 로그인은 안 한다면 여기서 끝
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '회원가입 실패')
   }
})

export const loginUserThunk = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
   try {
      const response = await loginUser(credentials)
      // 서버가 세션 세팅 + (선택) JWT 발급
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

// ─────────────────────────────────────────────
// Slice
// ─────────────────────────────────────────────
const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      isAuthenticated: false,
      // 소셜 플래그는 현재 세션만으로 구분 불가 → 필요 시 나중에 채움
      googleAuthenticated: false,
      kakaoAuthenticated: false,
      localAuthenticated: false,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         // hydrate (앱 시작/리로드 시)
         .addCase(hydrateAuthThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(hydrateAuthThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = action.payload.isAuthenticated
            state.user = action.payload.user
            // 세션 로그인은 일단 local로 취급(소셜은 필요 시 별도 표식)
            state.localAuthenticated = !!action.payload.isAuthenticated
            state.googleAuthenticated = false
            state.kakaoAuthenticated = false
         })
         .addCase(hydrateAuthThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || '세션 확인 실패'
            state.isAuthenticated = false
            state.user = null
            state.localAuthenticated = false
            state.googleAuthenticated = false
            state.kakaoAuthenticated = false
         })

         // 회원가입
         .addCase(registerUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerUserThunk.fulfilled, (state, action) => {
            state.loading = false
            // 보통 회원가입 완료 후엔 로그인 페이지로 보내므로 세션은 false 유지
            // 필요 시 여기서 자동 로그인 처리 가능
            // state.isAuthenticated = true
            // state.user = action.payload
         })
         .addCase(registerUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 로그인
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
            state.localAuthenticated = false
            state.googleAuthenticated = false
            state.kakaoAuthenticated = false
         })
         .addCase(logoutUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default authSlice.reducer
