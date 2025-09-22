import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createItem, updateItem, deleteItem, getItems, getItemById } from '../api/itemApi'

//상품등록
export const createItemThunk = createAsyncThunk('items/createItem', async (itemData, { rejectWithValue }) => {
   try {
      console.log('🔄 createItemThunk 시작...')
      console.log('📤 itemData:', itemData)
      const response = await createItem(itemData)
      console.log('✅ createItemThunk 성공, response:', response)
      return response.data.item
   } catch (error) {
      console.error('❌ createItemThunk 실패:', error)
      return rejectWithValue(error.response?.data?.message || '상품 등록 실패')
   }
})
// 상품 수정
export const updateItemThunk = createAsyncThunk('items/updateItem', async (data, { rejectWithValue }) => {
   try {
      const { id, itemData } = data
      await updateItem(id, itemData)
      return id
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '상품 수정 실패')
   }
})
// 상품 삭제
export const deleteItemThunk = createAsyncThunk('items/deleteItem', async (id, { rejectWithValue }) => {
   try {
      await deleteItem(id)
      return id
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '상품 삭제 실패')
   }
})
// 전체 상품 리스트 가져오기
export const fetchItemsThunk = createAsyncThunk('items/getItems', async (_, { rejectWithValue }) => {
   try {
      console.log('🔄 fetchItemsThunk 시작...')
      const items = await getItems() // getItems가 이미 배열을 반환함
      console.log('✅ fetchItemsThunk 성공, items:', items)
      return items // << 배열 그대로 반환
   } catch (error) {
      console.error('❌ fetchItemsThunk 실패:', error)
      return rejectWithValue(error.response?.data?.message || '전체 상품 리스트 가져오기 실패')
   }
})
// 특정 상품 가져오기 (상세)
export const fetchItemByIdThunk = createAsyncThunk('items/fetchItemById', async (id, { rejectWithValue }) => {
   try {
      const response = await getItemById(id)
      return response.data.item
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '특정 상품 가져오기 실패')
   }
})

const itemSlice = createSlice({
   name: 'items',
   initialState: {
      item: null,
      items: [],
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 상품 등록
      builder
         .addCase(createItemThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createItemThunk.fulfilled, (state, action) => {
            state.loading = false
            state.item = action.payload // insert한 상품 정보 저장
         })
         .addCase(createItemThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 전체 상품 리스트 가져오기
      builder
         .addCase(fetchItemsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchItemsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.items = action.payload
         })
         .addCase(fetchItemsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 상품 삭제
      builder
         .addCase(deleteItemThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteItemThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(deleteItemThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 특정 상품 불러오기
      builder
         .addCase(fetchItemByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchItemByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.item = action.payload
         })
         .addCase(fetchItemByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 상품 수정
      builder
         .addCase(updateItemThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateItemThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(updateItemThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default itemSlice.reducer
