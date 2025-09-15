// ===============================
// re-earth-frontend/src/store/store.js
// 설명: Redux store 설정 (루트 리듀서 주입 + DevTools 설정)
// ===============================
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../app/rootReducer'

const store = configureStore({
   reducer: rootReducer,
   devTools: import.meta.env.MODE !== 'production',
})

export default store
