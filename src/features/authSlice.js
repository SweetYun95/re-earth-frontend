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
      return rejectWithValue(error.response?.data?.message || '회원가입 실패')
   }
})

export const loginUserThunk = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
   try {
      const response = await loginUser(credentials)
      // 안전검사 (인터셉터가 resolve로 넘겨도 방지)
      const ok = response?.status === 200
      const user = response?.data?.user
      if (!ok || !user) {
         return rejectWithValue(response?.data?.message || '로그인 실패')
      }
      return user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로그인 실패')
   }
})

// ★ 관리자 전용 로그인 (status/user/role 모두 검증)
export const adminLoginThunk = createAsyncThunk('auth/adminLogin', async (credentials, { rejectWithValue }) => {
   try {
      const response = await adminLogin(credentials) // adminLogin에서 200/ADMIN 아닌 경우 throw
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
      const response = await logoutUser()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로그아웃 실패')
   }
})

// ───────── Slice ─────────
const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      isAuthenticated: false,
      hydrated: false,
      googleAuthenticated: false,
      kakaoAuthenticated: false,
      localAuthenticated: false,
      loading: false,
      error: null,
   },
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

         // ★ 관리자 로그인 (fulfilled는 오직 ADMIN에서만)
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
            // 중요한 점: rejected에서 isAuthenticated를 true로 바꾸지 않음!
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
            state.loading = false
            state.error = action.payload
         })
   },
})

export default authSlice.reducer
