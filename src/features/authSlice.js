// re-earth-frontend/src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser, loginUser, logoutUser, fetchMe } from '../api/authApi'

// ─────────────────────────────────────────────
// Thunks
// ─────────────────────────────────────────────

// 앱 시작/새로고침 시: 세션 상태 재하이드
export const hydrateAuthThunk = createAsyncThunk('auth/hydrate', async (_, { rejectWithValue }) => {
   try {
      // fetchMe는 200/401 모두 resolve로 들어오게 해둠
      const res = await fetchMe()
      if (res.status === 200 && res.data?.user) {
         return { user: res.data.user, isAuthenticated: true }
      }
      // 비로그인으로 간주
      return { user: null, isAuthenticated: false }
   } catch (err) {
      return rejectWithValue(err?.response?.data?.message || '세션 확인 실패')
   }
})

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

// ─────────────────────────────────────────────
// Slice
// ─────────────────────────────────────────────
const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      isAuthenticated: false,
      hydrated: false, // 초기 세션 상태 확인 완료 여부
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
            // 세션 로그인은 일단 local로 표기
            state.localAuthenticated = !!action.payload.isAuthenticated
            state.googleAuthenticated = false
            state.kakaoAuthenticated = false
            state.hydrated = true
         })
         .addCase(hydrateAuthThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || '세션 확인 실패'
            state.isAuthenticated = false
            state.user = null
            state.localAuthenticated = false
            state.googleAuthenticated = false
            state.kakaoAuthenticated = false
            state.hydrated = true
         })

         // 회원가입
         .addCase(registerUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerUserThunk.fulfilled, (state) => {
            state.loading = false
            // 보통 회원가입 후 자동 로그인 안 함
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
            state.hydrated = true
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
