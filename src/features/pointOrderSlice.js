// re-earth-frontend/src/features/pointorderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createOrder, getOrderList, cancelOrder, deleteOrder, } from '../api/pointOrderApi'

// 주문 생성
export const createOrderThunk = createAsyncThunk('pointOrders/createOrder', async (orderData, { rejectWithValue }) => {
   try {
      const data = await createOrder(orderData)
      return { orderId: data.orderId, totalPrice: data.totalPrice }
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '주문 생성 실패')
   }
})

// 주문 목록 조회 (페이지/기간)
export const getOrderListThunk = createAsyncThunk('pointOrders/getOrderList', async (params = {}, { rejectWithValue }) => {
   try {
      const res = await getOrderList(params)
      return res.data
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
            state.orders = action.payload.orders || []
            state.pagination = action.payload.pagination || state.pagination
         })
         .addCase(getOrderListThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 주문 취소
         .addCase(cancelOrderThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(cancelOrderThunk.fulfilled, (state, action) => {
            state.loading = false
            const id = action.payload
            // orders: PointOrder[] 라 가정. orderStatus만 바꿔줌.
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
