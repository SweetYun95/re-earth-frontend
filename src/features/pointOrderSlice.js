// re-earth-frontend/src/features/pointorderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createOrder, getOrderList, cancelOrder, deleteOrder } from '../api/pointOrderApi'

// 주문 생성
export const createOrderThunk = createAsyncThunk('pointOrders/createOrder', async (orderData, { rejectWithValue }) => {
   try {
      const data = await createOrder(orderData) // { success, message, orderId, totalPrice }
      return { orderId: data.orderId, totalPrice: data.totalPrice }
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '주문 생성 실패')
   }
})

// 주문 목록 조회 (페이지/기간)
export const getOrderListThunk = createAsyncThunk('pointOrders/getOrderList', async (params = {}, { rejectWithValue }) => {
   try {
      // getOrderList는 res.data를 반환하도록 구현되어 있음 → 그대로 data 사용
      const data = await getOrderList(params)
      // data = { success, message, page, size, total, orders }
      return data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '주문 목록 조회 실패')
   }
})

// 주문 취소
export const cancelOrderThunk = createAsyncThunk('pointOrders/cancelOrder', async (orderId, { rejectWithValue }) => {
   try {
      await cancelOrder(orderId)
      return orderId
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '주문 취소 실패')
   }
})

// 주문 삭제
export const deleteOrderThunk = createAsyncThunk('pointOrders/deleteOrder', async (orderId, { rejectWithValue }) => {
   try {
      await deleteOrder(orderId)
      return orderId
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '주문 삭제 실패')
   }
})

const pointorderSlice = createSlice({
   name: 'pointOrder',
   initialState: {
      orders: [],
      loading: false,
      error: null,
      latestOrder: null, // ← 사용하므로 초기화
      pagination: { page: 1, size: 10, total: 0 }, // ← 백엔드 구조에 맞춰 기본값
   },
   reducers: {},
   extraReducers: (builder) => {
      // 주문 생성
      builder
         .addCase(createOrderThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createOrderThunk.fulfilled, (state, action) => {
            state.loading = false
            state.latestOrder = action.payload // { orderId, totalPrice }
         })
         .addCase(createOrderThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 주문 목록
         .addCase(getOrderListThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getOrderListThunk.fulfilled, (state, action) => {
            state.loading = false
            const { orders = [], page = 1, size = 10, total = 0 } = action.payload || {}
            state.orders = orders
            state.pagination = { page, size, total } // ← 루트 필드에서 재구성
         })
         .addCase(getOrderListThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 주문 취소 → 상태만 CANCEL로
         .addCase(cancelOrderThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(cancelOrderThunk.fulfilled, (state, action) => {
            state.loading = false
            const id = action.payload
            state.orders = state.orders.map((o) => (o.id === id ? { ...o, orderStatus: 'CANCEL' } : o))
         })
         .addCase(cancelOrderThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 주문 삭제 → 목록에서 제거
         .addCase(deleteOrderThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteOrderThunk.fulfilled, (state, action) => {
            state.loading = false
            const id = action.payload
            state.orders = state.orders.filter((o) => o.id !== id)
         })
         .addCase(deleteOrderThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default pointorderSlice.reducer
