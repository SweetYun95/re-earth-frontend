import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { hydrateAuthThunk, adminLoginThunk } from '../../../features/authSlice'
import InputField from '../../../components/common/InputField'

export default function AdminLoginForm() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, isAuthenticated, user, error } = useSelector((s) => s.auth)
   const [form, setForm] = useState({ idOrEmail: '', password: '' })

   const didAutoNavigate = useRef(false)

   useEffect(() => {
      console.log('[AdminLoginForm] auth state changed →', { isAuthenticated, user, loading, error })
      if (!didAutoNavigate.current && isAuthenticated && user?.role === 'ADMIN') {
         didAutoNavigate.current = true
         navigate('/admin', { replace: true })
      }
   }, [isAuthenticated, user, loading, error, navigate])

   const onChange = (e) => {
      const { name, value } = e.target
      setForm((prev) => ({ ...prev, [name]: value }))
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      if (loading) return

      const idOrEmail = form.idOrEmail.trim()
      const password = form.password
      if (!idOrEmail) return alert('아이디 또는 이메일을 입력하세요.')
      if (!password) return alert('비밀번호를 입력하세요.')

      const payload = { idOrEmail, userId: idOrEmail, password }
      console.log('[AdminLoginForm] submitting admin login payload:', payload)

      try {
         const loggedAdmin = await dispatch(adminLoginThunk(payload)).unwrap()
         console.log('[AdminLoginForm] adminLoginThunk success →', loggedAdmin)

         // 여기 도달 = ADMIN 보장
         await dispatch(hydrateAuthThunk())
         alert('관리자 로그인 성공! 환영합니다 :)')
         navigate('/admin', { replace: true })
      } catch (err) {
         console.error('[AdminLoginForm] adminLoginThunk error →', err)
         alert(typeof err === 'string' ? err : '관리자 로그인에 실패했습니다.')
         // stay on /login
      } finally {
         // 보안: 비번 초기화
         setForm((prev) => ({ ...prev, password: '' }))
      }
   }

   return (
      <div className="admin-login mt-40">
         <form className="loginform" onSubmit={handleSubmit}>
            <InputField label="아이디" type="text" name="idOrEmail" placeholder="아이디 또는 이메일을 입력하세요." required value={form.idOrEmail} inputChange={onChange} autoComplete="username" disabled={loading} />
            <InputField marginTop="mt-20" label="비밀번호" type="password" name="password" value={form.password} inputChange={onChange} disabled={loading} autoComplete="current-password" placeholder="비밀번호를 입력하세요." required />
            <button type="submit" className="btn default main4 mt-40" disabled={loading}>
               {loading ? '로그인 중...' : '관리자 로그인'}
            </button>
         </form>
      </div>
   )
}
