// re-earth-frontend/src/store/store.js
import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/authSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
   },
   devTools: import.meta.env.MODE !== 'production',
})

export default store
