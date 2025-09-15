// import Button from './components/Button/Button'
import { Routes, Route, Navigate } from 'react-router-dom'

import LandingPage from './pages/user/Landing/LandingPage'
import LoginPage from './pages/user/Login/LoginPage'
import './assets/styles/commons.scss'

const useAuth = () => Boolean(localStorage.getItem('token'))

function App() {
  const isAuthed = useAuth()
  return (
<Routes>
      {/* 루트: 로그인 전엔 랜딩, 로그인 상태면 홈으로 */}
      <Route
        path="/"
        element={isAuthed ? <Navigate to="/home" replace /> : <LandingPage />}
      />

      {/* 로그인 페이지 */}
      <Route
        path="/login"
        element={isAuthed ? <Navigate to="/home" replace /> : <LoginPage />}
      />

      {/* 홈: 비로그인이면 랜딩으로 돌려보내기 (기존엔 /login으로 보냈음) */}
      <Route
        path="/home"
        element={isAuthed ? <div>홈</div> : <Navigate to="/" replace />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  )
}

export default App