// re-earth-frontend/src/store/store.js
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../app/rootReducer'

const store = configureStore({
   reducer: rootReducer,
   devTools: import.meta.env.MODE !== 'production',
})

export default store
