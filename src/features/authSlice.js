// re-earth-frontend/src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser, loginUser, logoutUser, fetchMe, adminLogin } from '../api/authApi'

// ───────── Thunks ─────────
export const hydrateAuthThunk = createAsyncThunk('auth/hydrate', async (_, { rejectWithValue }) => {
   try {
      const res = await fetchMe()
      if (res.status === 200 && res.data?.user) {
         return { user: res.data.user, isAuthenticated: true }
      }
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
      return rejectWithValue(error?.response?.data?.message || '회원가입 실패')
   }
})

export const loginUserThunk = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
   try {
      const response = await loginUser(credentials)
      const ok = response?.status === 200
      const user = response?.data?.user
      if (!ok || !user) {
         return rejectWithValue(response?.data?.message || '로그인 실패')
      }
      return user
   } catch (error) {
      return rejectWithValue(error?.response?.data?.message || '로그인 실패')
   }
})

// ★ 관리자 전용 로그인 (status/user/role 모두 검증)
export const adminLoginThunk = createAsyncThunk('auth/adminLogin', async (credentials, { rejectWithValue }) => {
   try {
      const response = await adminLogin(credentials) // adminLogin 내부에서 검증 실패시 throw
      const user = response?.data?.user
      if (!user || user.role !== 'ADMIN') {
         return rejectWithValue(response?.data?.message || '관리자 권한이 없습니다.')
      }
      return user
   } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message || '관리자 로그인 실패')
   }
})

export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
   try {
      const response = await logoutUser() // 서버 세션 파기 + token 제거(authApi에서)
      return response.data
   } catch (error) {
      // 서버 실패여도 클라이언트 상태는 비운다(아래 extraReducers에서 처리)
      return rejectWithValue(error?.response?.data?.message || '로그아웃 실패')
   }
})

// ───────── Slice ─────────
const initialState = {
   user: null,
   isAuthenticated: false,
   hydrated: false,
   googleAuthenticated: false,
   kakaoAuthenticated: false,
   localAuthenticated: false,
   loading: false,
   error: null,
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         // hydrate
         .addCase(hydrateAuthThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(hydrateAuthThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = action.payload.isAuthenticated
            state.user = action.payload.user
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

         // register
         .addCase(registerUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerUserThunk.fulfilled, (state) => {
            state.loading = false
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
            state.hydrated = true
         })
         .addCase(loginUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // ★ 관리자 로그인
         .addCase(adminLoginThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(adminLoginThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.localAuthenticated = true
            state.user = action.payload // role === 'ADMIN'
            state.hydrated = true
         })
         .addCase(adminLoginThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // logout
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
            // 서버 응답이 실패해도 클라 상태는 비운다(강제 로그아웃)
            state.loading = false
            state.error = action.payload
            state.isAuthenticated = false
            state.user = null
            state.localAuthenticated = false
            state.googleAuthenticated = false
            state.kakaoAuthenticated = false
         })
   },
})

export default authSlice.reducer
