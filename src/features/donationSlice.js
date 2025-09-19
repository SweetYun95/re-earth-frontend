// re-earth-frontend/src/features/donationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestOtp, verifyOtp, createDonation, getMyDonations, getDonationById, cancelDonation } from '../api/donationApi'

// ────────────────────────────────────────────────
// Initial State
const initialState = {
   // Step 1
   consent: false,

   // Step 2
   phone: { p1: '', p2: '', p3: '' },
   otp: { sent: false, verified: false, ttl: 0, devCode: '' },

   // Step 3
   items: [], // [{ itemName, amount }]
   count: 0,
   method: 'VISIT',
   pickupDate: '',
   returnAddress: '',

   // Step 4
   created: null,

   // Common
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
      const data = await createDonation(payload)
      return data
   } catch (err) {
      return rejectWithValue(err.response?.data || { message: '신청 실패' })
   }
})

export const fetchMyDonationsThunk = createAsyncThunk('donation/fetchMine', async (params, { rejectWithValue }) => {
   try {
      const data = await getMyDonations(params || {})
      return data
   } catch (err) {
      return rejectWithValue(err.response?.data || { message: '목록 조회 실패' })
   }
})

export const fetchDonationThunk = createAsyncThunk('donation/fetchOne', async (id, { rejectWithValue }) => {
   try {
      const data = await getDonationById(id)
      return data
   } catch (err) {
      return rejectWithValue(err.response?.data || { message: '상세 조회 실패' })
   }
})

export const cancelDonationThunk = createAsyncThunk('donation/cancel', async (id, { rejectWithValue }) => {
   try {
      const data = await cancelDonation(id)
      return data
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
      setConsent(state, action) {
         state.consent = !!action.payload
      },
      setPhone(state, action) {
         const { p1 = '', p2 = '', p3 = '' } = action.payload || {}
         state.phone = { p1, p2, p3 }
         state.otp = { sent: false, verified: false, ttl: 0, devCode: '' }
      },
      setPhonePart(state, action) {
         const { part, value } = action.payload || {}
         if (!['p1', 'p2', 'p3'].includes(part)) return
         const sanitized = String(value ?? '').replace(/\D/g, '')
         state.phone[part] = sanitized
         state.otp = { sent: false, verified: false, ttl: 0, devCode: '' }
      },
      setItems(state, action) {
         state.items = Array.isArray(action.payload) ? action.payload : []
         state.count = state.items.reduce((acc, it) => acc + Number(it.amount || 0), 0)
      },
      setMethod(state, action) {
         state.method = action.payload || 'VISIT'
      },
      setPickupDate(state, action) {
         state.pickupDate = action.payload || ''
      },
      setReturnAddress(state, action) {
         state.returnAddress = action.payload || ''
      },
      resetDonationFlow() {
         return { ...initialState }
      },
   },
   extraReducers: (builder) => {
      builder
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

         .addCase(submitDonationThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(submitDonationThunk.fulfilled, (state, action) => {
            state.loading = false
            state.created = action.payload?.donation || null
         })
         .addCase(submitDonationThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || action.error
         })

         .addCase(fetchMyDonationsThunk.fulfilled, (state, action) => {
            state.list = action.payload?.list || []
            state.page = action.payload?.page || 1
            state.size = action.payload?.size || 10
            state.total = action.payload?.total || 0
         })

         .addCase(fetchDonationThunk.fulfilled, (state, action) => {
            state.created = action.payload || null
         })

         .addCase(cancelDonationThunk.fulfilled, (state, action) => {
            const d = action.payload?.donation
            if (d) {
               state.list = state.list.map((x) => (x.id === d.id ? d : x))
               if (state.created && state.created.id === d.id) state.created = d
            }
         })
   },
})

export const { setConsent, setPhone, setPhonePart, setItems, setMethod, setPickupDate, setReturnAddress, resetDonationFlow } = donationSlice.actions

export default donationSlice.reducer
