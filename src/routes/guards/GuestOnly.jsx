// re-earth-frontend/src/routes/guards/GuestOnly.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function GuestOnly() {
   const { isAuthenticated, loading, hydrated } = useSelector((s) => s.auth || {})
   const location = useLocation()

   if (!hydrated || loading) return null

   if (isAuthenticated && location.pathname !== '/user') {
      return <Navigate to="/user" replace state={{ from: location }} />
   }
   return <Outlet />
}
