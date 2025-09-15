// re-earth-frontend/src/routes/guards/UserOnly.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function UserOnly() {
   const { isLoggedIn } = useSelector((s) => s.auth || {})
   const location = useLocation()

   if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />
   return <Outlet />
}
