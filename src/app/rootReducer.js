// re-earth-frontend/src/app/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit'

// 기존 리듀서들
import authReducer from '../features/authSlice'
import donationReducer from '../features/donationSlice'
import itemReducer from '../features/itemSlice'
import adminMemberReducer from '../features/adminMemberSlice'
import adminDonationReducer from '../features/adminDonationSlice'
import pointOrderReducer from '../features/pointOrderSlice'

// 신규: QnA
import qnaReducer from '../features/qnaSlice'
import adminQnaReducer from '../features/adminQnaSlice'

const rootReducer = combineReducers({
   auth: authReducer,
   donation: donationReducer,
   item: itemReducer,
   adminMember: adminMemberReducer,
   adminDonation: adminDonationReducer,
   pointOrder: pointOrderReducer,

   // 신규
   qna: qnaReducer,
   adminQna: adminQnaReducer,
})

export default rootReducer
