<<<<<<< HEAD
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
  fetchMe,
  adminLogin,
  userUpdate,
} from "../api/authApi";
=======
// re-earth-frontend/src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser, loginUser, logoutUser, fetchMe, adminLogin } from '../api/authApi'
>>>>>>> ca31efe7a39907eb48ad82f17c68042e8f0e1aa2

// ───────── Thunks ─────────
export const hydrateAuthThunk = createAsyncThunk(
  "auth/hydrate",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchMe();
      if (res.status === 200 && res.data?.user) {
        return { user: res.data.user, isAuthenticated: true };
      }
      return { user: null, isAuthenticated: false };
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "세션 확인 실패");
    }
  }
);

<<<<<<< HEAD
export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "회원가입 실패");
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      // 안전검사 (인터셉터가 resolve로 넘겨도 방지)
      const ok = response?.status === 200;
      const user = response?.data?.user;
=======
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
>>>>>>> ca31efe7a39907eb48ad82f17c68042e8f0e1aa2
      if (!ok || !user) {
        return rejectWithValue(response?.data?.message || "로그인 실패");
      }
<<<<<<< HEAD
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "로그인 실패");
    }
  }
);

// ★ 관리자 전용 로그인 (status/user/role 모두 검증)
export const adminLoginThunk = createAsyncThunk(
  "auth/adminLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await adminLogin(credentials); // adminLogin에서 200/ADMIN 아닌 경우 throw
      const user = response?.data?.user;
      if (!user || user.role !== "ADMIN") {
        return rejectWithValue(
          response?.data?.message || "관리자 권한이 없습니다."
        );
=======
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
>>>>>>> ca31efe7a39907eb48ad82f17c68042e8f0e1aa2
      }
      return user;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || "관리자 로그인 실패"
      );
    }
  }
);

<<<<<<< HEAD
// 회원 정보 수정
export const userUpdateThunk = createAsyncThunk(
  "auth/userUpdate",
  async (formData, { rejectWithValue }) => {
    console.log("slice--------------");
    const response = await userUpdate(formData);
    console.log("thunk함수 작동 완료");
    return response.data;
  }
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUser();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "로그아웃 실패");
    }
  }
);

// 아이디 찾기

// 임시 비밀번호 발급
=======
export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
   try {
      const response = await logoutUser() // 서버 세션 파기 + token 제거(authApi에서)
      return response.data
   } catch (error) {
      // 서버 실패여도 클라이언트 상태는 비운다(아래 extraReducers에서 처리)
      return rejectWithValue(error?.response?.data?.message || '로그아웃 실패')
   }
})
>>>>>>> ca31efe7a39907eb48ad82f17c68042e8f0e1aa2

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
<<<<<<< HEAD
  name: "auth",
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
        state.loading = true;
        state.error = null;
      })
      .addCase(hydrateAuthThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user?.id === action.payload.user?.id) {
          return; // 동일 유저라면 상태 갱신하지 않음
        }
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        state.localAuthenticated = !!action.payload.isAuthenticated;
        state.googleAuthenticated = false;
        state.kakaoAuthenticated = false;
        state.hydrated = true;
      })
      .addCase(hydrateAuthThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "세션 확인 실패";
        state.isAuthenticated = false;
        state.user = null;
        state.localAuthenticated = false;
        state.googleAuthenticated = false;
        state.kakaoAuthenticated = false;
        state.hydrated = true;
      })
=======
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
>>>>>>> ca31efe7a39907eb48ad82f17c68042e8f0e1aa2

      // register
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 일반 로그인
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.localAuthenticated = true;
        state.user = action.payload;
        state.hydrated = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

<<<<<<< HEAD
      // ★ 관리자 로그인 (fulfilled는 오직 ADMIN에서만)
      .addCase(adminLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.localAuthenticated = true;
        state.user = action.payload; // role === 'ADMIN'
        state.hydrated = true;
      })
      .addCase(adminLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // 중요한 점: rejected에서 isAuthenticated를 true로 바꾸지 않음!
      })

      // 회원 정보 수정
      .addCase(userUpdateThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userUpdateThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(userUpdateThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
=======
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
>>>>>>> ca31efe7a39907eb48ad82f17c68042e8f0e1aa2

      // logout
      .addCase(logoutUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.localAuthenticated = false;
        state.googleAuthenticated = false;
        state.kakaoAuthenticated = false;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
