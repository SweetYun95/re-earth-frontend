// re-earth-frontend/src/routes/guards/GuestOnly.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function GuestOnly() {
   const { isAuthenticated, loading, hydrated } = useSelector((s) => s.auth || {})
   const location = useLocation()

   // 보험: 초기 세션 확인 전에는 가만히 대기
   if (!hydrated || loading) return null

   if (isAuthenticated) {
      return <Navigate to="/user" replace state={{ from: location }} />
   }
   return <Outlet />
}
