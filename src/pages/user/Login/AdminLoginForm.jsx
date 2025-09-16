// re-earth-frontend/src/pages/user/Login/AdminLoginForm.jsx
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loginUserThunk } from '../../../features/authSlice'

function AdminLoginForm() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, isAuthenticated, user, localAuthenticated, googleAuthenticated, kakaoAuthenticated, error } = useSelector((s) => s.auth)

   const [form, setForm] = useState({ idOrEmail: '', password: '' })

   // 🔎 auth 상태 변경 로깅
   useEffect(() => {
      console.log('[AdminLoginForm] auth state changed →', {
         isAuthenticated,
         localAuthenticated,
         googleAuthenticated,
         kakaoAuthenticated,
         user,
         loading,
         error,
      })
   }, [isAuthenticated, localAuthenticated, googleAuthenticated, kakaoAuthenticated, user, loading, error])

   const onChange = (e) => {
      const { name, value } = e.target
      setForm((f) => ({ ...f, [name]: value }))
   }

   const onSubmit = async (e) => {
      e.preventDefault()

      const idOrEmail = form.idOrEmail.trim()
      const password = form.password

      if (!idOrEmail || !password) {
         alert('아이디(또는 이메일)와 비밀번호를 입력해 주세요.')
         return
      }

      const isEmail = idOrEmail.includes('@')
      const payload = isEmail ? { email: idOrEmail, password } : { userId: idOrEmail, password }

      console.log('[AdminLoginForm] submitting admin login payload:', payload)

      try {
         const loggedUser = await dispatch(loginUserThunk(payload)).unwrap()
         console.log('[AdminLoginForm] loginUserThunk success →', loggedUser)

         if (loggedUser?.role !== 'ADMIN') {
            console.warn('[AdminLoginForm] Not an admin. role=', loggedUser?.role)
            alert('관리자 권한이 없습니다. 일반 사용자 로그인으로 이동합니다.')
            navigate('/app', { replace: true })
            return
         }

         console.log('[AdminLoginForm] Admin verified. Navigating to /admin/dashboard')
         navigate('/admin/dashboard', { replace: true })
      } catch (err) {
         console.error('[AdminLoginForm] loginUserThunk error →', err)
         const msg = err || '로그인에 실패했습니다.'
         alert(typeof msg === 'string' ? msg : '로그인에 실패했습니다.')
      }
   }

   return (
      <div className="admin-login mt-40">
         <form className="loginform" onSubmit={onSubmit}>
            <div className="form--input">
               <p>아이디</p>
               <input type="text" name="idOrEmail" placeholder="아이디 또는 이메일을 입력하세요." required value={form.idOrEmail} onChange={onChange} autoComplete="username" disabled={loading} />
            </div>

            <div className="form--input mt-20">
               <p>비밀번호</p>
               <input type="password" name="password" placeholder="비밀번호를 입력하세요." required value={form.password} onChange={onChange} autoComplete="current-password" disabled={loading} />
            </div>

            <button type="submit" className="btn default main4 mt-40" disabled={loading}>
               {loading ? '로그인 중...' : '로그인'}
            </button>
         </form>
      </div>
   )
}

export default AdminLoginForm
