// ===============================
// re-earth-frontend/src/app/rootReducer.js
// 설명: 각 slice reducer를 하나의 루트 리듀서로 병합
// ===============================
import { combineReducers } from '@reduxjs/toolkit'

// --- feature slices ---
import authReducer from '../features/authSlice'
import donationReducer from '../features/donationSlice'
import itemReducer from '../features/itemSlice'

// ✅ 관리자 관련 리듀서 추가
import adminMemberReducer from '../features/adminMemberSlice'
import adminDonationReducer from '../features/adminDonationSlice'

const rootReducer = combineReducers({
   auth: authReducer,
   donation: donationReducer,
   item: itemReducer,

   // ✅ 관리자 관련 리듀서 추가
   adminMembers: adminMemberReducer,
   adminDonation: adminDonationReducer,
})

export default rootReducer
