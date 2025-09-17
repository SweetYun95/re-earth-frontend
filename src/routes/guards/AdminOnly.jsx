// re-earth-frontend/src/routes/guards/AdminOnly.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AdminOnly() {
   const { isAuthenticated, user, loading, hydrated } = useSelector((s) => s.auth || {})
   const role = user?.role ?? 'GUEST'
   const location = useLocation()

   // 하이드레이션/로딩 중엔 리다이렉트 금지
   if (!hydrated || loading) return null

   if (!isAuthenticated) {
      return <Navigate to="/login" replace state={{ from: location }} />
   }
   if (role !== 'ADMIN') {
      return <Navigate to="/user" replace state={{ from: location }} />
   }
   return <Outlet />
}
