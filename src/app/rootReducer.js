// ===============================
// re-earth-frontend/src/app/rootReducer.js
// 설명: 각 slice reducer를 하나의 루트 리듀서로 병합
// ===============================
import { combineReducers } from '@reduxjs/toolkit'

// --- feature slices ---
import authReducer from '../features/authSlice'
import donationReducer from '../features/donationSlice'
import itemReducer from '../features/itemSlice'
import adminMemberReducer from '../features/adminMemberSlice' // 새로 추가
import pointOrderReducer from '../features/pointOrderSlice'
// import pointReducer from '../features/pointSlice'
// import marketReducer from '../features/marketSlice'
// import chatReducer from '../features/chatSlice'
// import adminReducer from '../features/adminSlice'

const rootReducer = combineReducers({
   auth: authReducer,
   donation: donationReducer,
   items: itemReducer,
   adminMembers: adminMemberReducer, // 새로 추가
   //    user: userReducer,
   pointOrder: pointOrderReducer,
   //    point: pointReducer,
   //    market: marketReducer,
   //    chat: chatReducer,
   //    admin: adminReducer,
})

export default rootReducer
