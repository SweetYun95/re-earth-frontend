// ===============================
// re-earth-frontend/src/features/donationSlice.js
// 설명: 기부(Donation) 관련 상태/비동기처리 Slice
// ===============================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestOtp, verifyOtp, createDonation, getMyDonations, getDonationById, cancelDonation } from '../api/donationApi'

// ────────────────────────────────────────────────
// Backend 스키마와 1:1 매칭되는 초기 상태
// items: [{ category, condition, quantity, note }]
const initialState = {
   // Step 1: 신청자
   donorName: '',
   donorPhone: '',
   donorEmail: '',

   // Step 2: 물품
   items: [{ category: 'TOP', condition: 'NORMAL', quantity: 1, note: '' }],

   // Step 3: 주소/일정/메모
   zipcode: '',
   address1: '',
   address2: '',
   pickupDate: '',
   memo: '',

   // Step 4: 동의
   agreePolicy: false,

   // OTP(선택 기능)
   otp: { sent: false, verified: false, ttl: 0, devCode: '' },

   // ✅ 휴대폰 파츠(OTP 입력용)
   phone: { p1: '', p2: '', p3: '' },

   // 공통
   created: null,
   createdId: null,
   list: [],
   page: 1,
   size: 10,
   total: 0,
   loading: false,
   error: null,
}

// ────────────────────────────────────────────────
// Thunks
export const sendOtpThunk = createAsyncThunk('donation/sendOtp', async (phone, { rejectWithValue }) => {
   try {
      const data = await requestOtp(phone)
      return data
   } catch (err) {
      return rejectWithValue(err.response?.data || { message: '인증요청 실패' })
   }
})

export const verifyOtpThunk = createAsyncThunk('donation/verifyOtp', async ({ phone, code }, { rejectWithValue }) => {
   try {
      const data = await verifyOtp({ phone, code })
      return data
   } catch (err) {
      return rejectWithValue(err.response?.data || { message: '인증 실패' })
   }
})

export const submitDonationThunk = createAsyncThunk('donation/submit', async (payload, { rejectWithValue }) => {
   try {
      const data = await createDonation(payload) // { donation:{...} }
      return data?.donation
   } catch (err) {
      return rejectWithValue(err.response?.data || { message: '신청 실패' })
   }
})

export const fetchMyDonationsThunk = createAsyncThunk('donation/fetchMine', async (params, { rejectWithValue }) => {
   try {
      const data = await getMyDonations(params || {}) // { list, page, size, total }
      return data
   } catch (err) {
      return rejectWithValue(err.response?.data || { message: '목록 조회 실패' })
   }
})

export const fetchDonationThunk = createAsyncThunk('donation/fetchOne', async (id, { rejectWithValue }) => {
   try {
      const data = await getDonationById(id) // { donation }
      return data?.donation
   } catch (err) {
      return rejectWithValue(err.response?.data || { message: '상세 조회 실패' })
   }
})

export const cancelDonationThunk = createAsyncThunk('donation/cancel', async (id, { rejectWithValue }) => {
   try {
      const data = await cancelDonation(id) // { donation }
      return data?.donation
   } catch (err) {
      return rejectWithValue(err.response?.data || { message: '취소 실패' })
   }
})

// ────────────────────────────────────────────────
// Slice
const donationSlice = createSlice({
   name: 'donation',
   initialState,
   reducers: {
      // 단일 필드 세터
      setField(state, action) {
         const { key, value } = action.payload || {}
         if (key in state) state[key] = value
      },

      // ✅ 휴대폰 파츠 입력 + OTP 리셋
      setPhonePart(state, action) {
         const { part, value } = action.payload || {}
         if (!['p1', 'p2', 'p3'].includes(part)) return
         const sanitized = String(value ?? '').replace(/\D/g, '')
         state.phone[part] = sanitized
         state.otp = { sent: false, verified: false, ttl: 0, devCode: '' }
      },

      // items 조작
      addItem(state) {
         state.items.push({ category: 'TOP', condition: 'NORMAL', quantity: 1, note: '' })
      },
      updateItem(state, action) {
         const { index, patch } = action.payload || {}
         if (state.items[index]) {
            state.items[index] = { ...state.items[index], ...patch }
         }
      },
      removeItem(state, action) {
         const { index } = action.payload || {}
         state.items = state.items.filter((_, i) => i !== index)
         if (state.items.length === 0) {
            state.items.push({ category: 'TOP', condition: 'NORMAL', quantity: 1, note: '' })
         }
      },

      // 전체 리셋
      resetDonationFlow() {
         return { ...initialState }
      },
   },
   extraReducers: (builder) => {
      builder
         // OTP
         .addCase(sendOtpThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(sendOtpThunk.fulfilled, (state, action) => {
            state.loading = false
            state.otp.sent = true
            state.otp.ttl = action.payload?.ttl || 0
            state.otp.devCode = action.payload?.code || ''
         })
         .addCase(sendOtpThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || action.error
         })

         .addCase(verifyOtpThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(verifyOtpThunk.fulfilled, (state, action) => {
            state.loading = false
            state.otp.verified = !!action.payload?.verified
         })
         .addCase(verifyOtpThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || action.error
         })

         // CREATE
         .addCase(submitDonationThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(submitDonationThunk.fulfilled, (state, action) => {
            state.loading = false
            state.created = action.payload || null
            state.createdId = action.payload?.id || null
         })
         .addCase(submitDonationThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || action.error
         })

         // LIST
         .addCase(fetchMyDonationsThunk.fulfilled, (state, action) => {
            state.list = action.payload?.list || []
            state.page = action.payload?.page || 1
            state.size = action.payload?.size || 10
            state.total = action.payload?.total || 0
         })

         // READ
         .addCase(fetchDonationThunk.fulfilled, (state, action) => {
            state.created = action.payload || null
            state.createdId = action.payload?.id || null
         })

         // CANCEL
         .addCase(cancelDonationThunk.fulfilled, (state, action) => {
            const d = action.payload
            if (d) {
               state.list = state.list.map((x) => (x.id === d.id ? d : x))
               if (state.created?.id === d.id) state.created = d
            }
         })
   },
})

export const {
   setField,
   setPhonePart, // ✅
   addItem,
   updateItem,
   removeItem,
   resetDonationFlow,
} = donationSlice.actions
export default donationSlice.reducer
