// re-earth-frontend/src/App.jsx
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppRouter from './routes/AppRouter'
import { hydrateAuthThunk } from './features/authSlice'

export default function App() {
   const dispatch = useDispatch()
   const { hydrated, loading } = useSelector((s) => s.auth || {})

   useEffect(() => {
      // 앱 부팅 시 세션/토큰 상태 동기화
      dispatch(hydrateAuthThunk())
   }, [dispatch])

   // 하이드레이션 완료 전엔 가드들이 null을 그리므로 여기서 한번에 대기
   if (!hydrated || loading) return null
   // 필요하면 스피너를 그려도 됨

   return <AppRouter />
}
