// re-earth-frontend/src/features/adminMemberSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/adminMemberApi'

// ───────── Thunks
export const getMembers = createAsyncThunk('adminMembers/getMembers', async (params = {}, { rejectWithValue }) => {
   try {
      return await api.fetchMembers(params)
   } catch (err) {
      return rejectWithValue(err.response?.data || { message: '회원 목록 조회 실패' })
   }
})

export const getMemberById = createAsyncThunk('adminMembers/getMemberById', async (id, { rejectWithValue }) => {
   try {
      return await api.fetchMemberById(id)
   } catch (err) {
      return rejectWithValue(err.response?.data || { message: '회원 조회 실패' })
   }
})

export const saveMember = createAsyncThunk('adminMembers/saveMember', async ({ id, payload }, { rejectWithValue }) => {
   try {
      return await api.updateMember(id, payload)
   } catch (err) {
      return rejectWithValue(err.response?.data || { message: '회원 수정 실패' })
   }
})

export const removeMembers = createAsyncThunk('adminMembers/removeMembers', async (ids, { rejectWithValue }) => {
   try {
      return await api.deleteMembers(ids)
   } catch (err) {
      return rejectWithValue(err.response?.data || { message: '회원 삭제 실패' })
   }
})

// ───────── State
const initialState = {
   // 목록
   list: [],
   page: 1,
   size: 20,
   total: 0,
   totalPages: 1,

   // 현재 선택/상세
   current: null,

   // UI 상태
   loading: false,
   error: null,

   saving: false,
   deleting: false,

   // 목록 조회에 사용한 마지막 파라미터 (필터/정렬/페이지)
   lastParams: { page: 1, size: 20, sort: 'createdAt', order: 'DESC' },
}

const adminMemberSlice = createSlice({
   name: 'adminMembers',
   initialState,
   reducers: {
      clearError(state) {
         state.error = null
      },
      setLastParams(state, action) {
         state.lastParams = { ...state.lastParams, ...action.payload }
      },
      clearCurrent(state) {
         state.current = null
      },
   },
   extraReducers: (builder) => {
      builder
         // ─ getMembers
         .addCase(getMembers.pending, (state, action) => {
            state.loading = true
            state.error = null
            // 조회 파라미터 기억
            const params = action.meta.arg || {}
            state.lastParams = { ...state.lastParams, ...params }
         })
         .addCase(getMembers.fulfilled, (state, action) => {
            state.loading = false
            const { list = [], page = 1, size = 20, total = 0, totalPages = 1 } = action.payload || {}
            state.list = list
            state.page = page
            state.size = size
            state.total = total
            state.totalPages = totalPages
         })
         .addCase(getMembers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '회원 목록 조회 실패'
         })

         // ─ getMemberById
         .addCase(getMemberById.pending, (state) => {
            state.error = null
         })
         .addCase(getMemberById.fulfilled, (state, action) => {
            state.current = action.payload
         })
         .addCase(getMemberById.rejected, (state, action) => {
            state.error = action.payload?.message || '회원 조회 실패'
         })

         // ─ saveMember
         .addCase(saveMember.pending, (state) => {
            state.saving = true
            state.error = null
         })
         .addCase(saveMember.fulfilled, (state, action) => {
            state.saving = false
            // 성공 시 목록에서도 즉시 반영 (id 매칭 업데이트)
            const updated = action.payload?.user || null
            if (updated) {
               state.list = state.list.map((u) => (u.id === updated.id ? { ...u, ...updated } : u))
               if (state.current?.id === updated.id) {
                  state.current = { ...state.current, ...updated }
               }
            }
         })
         .addCase(saveMember.rejected, (state, action) => {
            state.saving = false
            state.error = action.payload?.message || '회원 수정 실패'
         })

         // ─ removeMembers
         .addCase(removeMembers.pending, (state) => {
            state.deleting = true
            state.error = null
         })
         .addCase(removeMembers.fulfilled, (state, action) => {
            state.deleting = false
            // 삭제 후 목록 재조회는 화면에서 getMembers 재호출 권장
         })
         .addCase(removeMembers.rejected, (state, action) => {
            state.deleting = false
            state.error = action.payload?.message || '회원 삭제 실패'
         })
   },
})

export const { clearError, setLastParams, clearCurrent } = adminMemberSlice.actions
export default adminMemberSlice.reducer

// ───────── Selectors
export const selectAdminMembers = (s) => s.adminMembers
export const selectMemberList = (s) => s.adminMembers.list
export const selectMemberCurrent = (s) => s.adminMembers.current
export const selectAdminMembersLoading = (s) => s.adminMembers.loading
export const selectAdminMembersError = (s) => s.adminMembers.error
