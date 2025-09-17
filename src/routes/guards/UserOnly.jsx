// re-earth-frontend/src/routes/guards/UserOnly.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function UserOnly() {
   const { isAuthenticated, loading, hydrated } = useSelector((s) => s.auth || {})
   const location = useLocation()

   // 아직 초기 세션 확인 중이면 아무것도 하지 않음(깜빡임/핑퐁 방지)
   if (!hydrated || loading) return null // 필요하면 <FullScreenSpinner/> 같은 로더

   if (!isAuthenticated) {
      return <Navigate to="/login" replace state={{ from: location }} />
   }
   return <Outlet />
}
