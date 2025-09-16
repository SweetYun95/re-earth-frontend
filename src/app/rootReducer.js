// ===============================
// re-earth-frontend/src/app/rootReducer.js
// 설명: 각 slice reducer를 하나의 루트 리듀서로 병합
// ===============================
import { combineReducers } from '@reduxjs/toolkit'

// --- feature slices ---
import authReducer from '../features/authSlice'
// import userReducer from '../features/userSlice'
// import itemReducer from '../features/itemSlice'
// import orderReducer from '../features/orderSlice'
// import pointReducer from '../features/pointSlice'
// import marketReducer from '../features/marketSlice'
// import chatReducer from '../features/chatSlice'
// import adminReducer from '../features/adminSlice'

const rootReducer = combineReducers({
   auth: authReducer,
   //    user: userReducer,
   //    item: itemReducer,
   //    order: orderReducer,
   //    point: pointReducer,
   //    market: marketReducer,
   //    chat: chatReducer,
   //    admin: adminReducer,
})

export default rootReducer
