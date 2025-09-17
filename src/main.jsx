// re-earth-frontend/src/main.jsx
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import store from './app/store.js'
import { hydrateAuthThunk } from './features/authSlice'

import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/commons.scss'
import './index.css'

store.dispatch(hydrateAuthThunk()) 

createRoot(document.getElementById('root')).render(
   // <StrictMode>
   <Provider store={store}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </Provider>
   // </StrictMode>
)
