// re-earth-frontend/src/features/adminQnaSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { adminListQnaApi, adminAnswerQnaApi, adminUpdateStatusQnaApi } from '../api/qnaApi'

// ───────── Thunks (관리자)
export const adminFetchQnaListThunk = createAsyncThunk('adminQna/fetchList', async (params = {}, { rejectWithValue }) => {
   const { data, status } = await adminListQnaApi(params)
   if (status >= 200 && status < 300) return data
   return rejectWithValue(data || { message: 'QnA 목록 조회 실패' })
})

export const adminAnswerQnaThunk = createAsyncThunk('adminQna/answer', async ({ id, body }, { rejectWithValue }) => {
   const { data, status } = await adminAnswerQnaApi({ id, body })
   if (status >= 200 && status < 300) return { id, comment: data }
   return rejectWithValue(data || { message: '답변 등록 실패' })
})

export const adminUpdateQnaStatusThunk = createAsyncThunk('adminQna/updateStatus', async ({ id, status }, { rejectWithValue }) => {
   const { data, status: httpStatus } = await adminUpdateStatusQnaApi({ id, status })
   if (httpStatus >= 200 && httpStatus < 300) return data
   return rejectWithValue(data || { message: '상태 변경 실패' })
})

const initialState = {
   items: [],
   page: 1,
   size: 20,
   total: 0,
   loading: false,
   error: null,
}

const adminQnaSlice = createSlice({
   name: 'adminQna',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         // list
         .addCase(adminFetchQnaListThunk.pending, (s) => {
            s.loading = true
            s.error = null
         })
         .addCase(adminFetchQnaListThunk.fulfilled, (s, a) => {
            s.loading = false
            s.items = a.payload.items || []
            s.page = a.payload.page
            s.size = a.payload.size
            s.total = a.payload.total
         })
         .addCase(adminFetchQnaListThunk.rejected, (s, a) => {
            s.loading = false
            s.error = a.payload || a.error
         })
         // answer
         .addCase(adminAnswerQnaThunk.pending, (s) => {
            s.loading = true
            s.error = null
         })
         .addCase(adminAnswerQnaThunk.fulfilled, (s) => {
            s.loading = false
         })
         .addCase(adminAnswerQnaThunk.rejected, (s, a) => {
            s.loading = false
            s.error = a.payload || a.error
         })
         // status
         .addCase(adminUpdateQnaStatusThunk.pending, (s) => {
            s.loading = true
            s.error = null
         })
         .addCase(adminUpdateQnaStatusThunk.fulfilled, (s, a) => {
            s.loading = false
            const updated = a.payload
            s.items = s.items.map((x) => (x.id === updated.id ? updated : x))
         })
         .addCase(adminUpdateQnaStatusThunk.rejected, (s, a) => {
            s.loading = false
            s.error = a.payload || a.error
         })
   },
})

export default adminQnaSlice.reducer
