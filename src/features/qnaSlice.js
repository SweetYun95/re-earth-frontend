// re-earth-frontend/src/features/qnaSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createQnaApi, getMyQnasApi, getQnaDetailApi, deleteQnaApi } from '../api/qnaApi'

// ───────── Thunks (유저)
export const createQnaThunk = createAsyncThunk('qna/create', async (payload, { rejectWithValue }) => {
   const { data, status } = await createQnaApi(payload)
   if (status >= 200 && status < 300) return data
   return rejectWithValue(data || { message: '문의 등록 실패' })
})

export const fetchMyQnasThunk = createAsyncThunk('qna/fetchMy', async (_, { rejectWithValue }) => {
   const { data, status } = await getMyQnasApi()
   if (status >= 200 && status < 300) return data
   return rejectWithValue(data || { message: '내 문의 조회 실패' })
})

export const fetchQnaDetailThunk = createAsyncThunk('qna/fetchDetail', async (id, { rejectWithValue }) => {
   const { data, status } = await getQnaDetailApi(id)
   if (status >= 200 && status < 300) return data
   return rejectWithValue(data || { message: '문의 상세 조회 실패' })
})

export const removeQnaThunk = createAsyncThunk('qna/remove', async (id, { rejectWithValue }) => {
   const { data, status } = await deleteQnaApi(id)
   if (status >= 200 && status < 300) return { id }
   return rejectWithValue(data || { message: '문의 삭제 실패' })
})

const initialState = {
   list: [],
   detail: null,
   loading: false,
   error: null,
}

const qnaSlice = createSlice({
   name: 'qna',
   initialState,
   reducers: {
      clearQnaDetail(state) {
         state.detail = null
      },
   },
   extraReducers: (builder) => {
      builder
         // create
         .addCase(createQnaThunk.pending, (s) => {
            s.loading = true
            s.error = null
         })
         .addCase(createQnaThunk.fulfilled, (s, a) => {
            s.loading = false
            s.list.unshift(a.payload)
         })
         .addCase(createQnaThunk.rejected, (s, a) => {
            s.loading = false
            s.error = a.payload || a.error
         })
         // my list
         .addCase(fetchMyQnasThunk.pending, (s) => {
            s.loading = true
            s.error = null
         })
         .addCase(fetchMyQnasThunk.fulfilled, (s, a) => {
            s.loading = false
            s.list = a.payload || []
         })
         .addCase(fetchMyQnasThunk.rejected, (s, a) => {
            s.loading = false
            s.error = a.payload || a.error
         })
         // detail
         .addCase(fetchQnaDetailThunk.pending, (s) => {
            s.loading = true
            s.error = null
         })
         .addCase(fetchQnaDetailThunk.fulfilled, (s, a) => {
            s.loading = false
            s.detail = a.payload
         })
         .addCase(fetchQnaDetailThunk.rejected, (s, a) => {
            s.loading = false
            s.error = a.payload || a.error
         })
         // remove
         .addCase(removeQnaThunk.pending, (s) => {
            s.loading = true
            s.error = null
         })
         .addCase(removeQnaThunk.fulfilled, (s, a) => {
            s.loading = false
            s.list = s.list.filter((q) => q.id !== a.payload.id)
            if (s.detail?.id === a.payload.id) s.detail = null
         })
         .addCase(removeQnaThunk.rejected, (s, a) => {
            s.loading = false
            s.error = a.payload || a.error
         })
   },
})

export const { clearQnaDetail } = qnaSlice.actions
export default qnaSlice.reducer
