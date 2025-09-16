// re-earth-frontend/src/routes/guards/AdminOnly.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AdminOnly() {
   const { isLoggedIn, user } = useSelector((s) => s.auth || {})
   const role = user?.role || 'GUEST'
   const location = useLocation()

   if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />
   if (role !== 'ADMIN') return <Navigate to="/user" state={{ from: location }} replace />
   return <Outlet />
}
