import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { adminListDonations, adminGetDonation, adminUpdateDonation } from '../api/adminDonationApi'

export const fetchAdminDonationsThunk = createAsyncThunk('adminDonation/list', async (params, { rejectWithValue }) => {
   try {
      return await adminListDonations(params || {})
   } catch (e) {
      return rejectWithValue(e.response?.data || { message: '목록 실패' })
   }
})
export const fetchAdminDonationThunk = createAsyncThunk('adminDonation/one', async (id, { rejectWithValue }) => {
   try {
      return await adminGetDonation(id)
   } catch (e) {
      return rejectWithValue(e.response?.data || { message: '상세 실패' })
   }
})
export const updateAdminDonationThunk = createAsyncThunk('adminDonation/update', async ({ id, patch }, { rejectWithValue }) => {
   try {
      return await adminUpdateDonation(id, patch)
   } catch (e) {
      return rejectWithValue(e.response?.data || { message: '업데이트 실패' })
   }
})

const initialState = {
   list: [],
   page: 1,
   size: 20,
   total: 0,
   loading: false,
   error: null,
   current: null,
   statusFilter: '',
   q: '',
}

const slice = createSlice({
   name: 'adminDonation',
   initialState,
   reducers: {
      setAdminDonationFilter(state, { payload }) {
         Object.assign(state, payload || {})
      },
   },
   extraReducers: (b) => {
      b.addCase(fetchAdminDonationsThunk.pending, (s) => {
         s.loading = true
         s.error = null
      })
         .addCase(fetchAdminDonationsThunk.fulfilled, (s, { payload }) => {
            s.loading = false
            s.list = payload.list || []
            s.page = payload.page || 1
            s.size = payload.size || 20
            s.total = payload.total || 0
         })
         .addCase(fetchAdminDonationsThunk.rejected, (s, { payload, error }) => {
            s.loading = false
            s.error = payload || error
         })
         .addCase(fetchAdminDonationThunk.fulfilled, (s, { payload }) => {
            s.current = payload?.donation || null
         })
         .addCase(updateAdminDonationThunk.fulfilled, (s, { payload }) => {
            const d = payload?.donation
            if (!d) return
            s.current = d
            s.list = s.list.map((x) => (x.id === d.id ? d : x))
         })
   },
})
export const { setAdminDonationFilter } = slice.actions
export default slice.reducer
