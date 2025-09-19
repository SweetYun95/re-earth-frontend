// ===============================
// re-earth-frontend/src/app/rootReducer.js
// 설명: 각 slice reducer를 하나의 루트 리듀서로 병합
// ===============================
import { combineReducers } from '@reduxjs/toolkit'

// --- feature slices ---
import authReducer from '../features/authSlice'
import donationReducer from '../features/donationSlice'
import itemReducer from '../features/itemSlice'
import adminMemberReducer from '../features/adminMemberSlice'

const rootReducer = combineReducers({
   auth: authReducer,
   donation: donationReducer,
   item: itemReducer,
   adminMembers: adminMemberReducer,
})

export default rootReducer
