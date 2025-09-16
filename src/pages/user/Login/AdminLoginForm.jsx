// re-earth-frontend/src/pages/user/Login/AdminLoginForm.jsx
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loginUserThunk, logoutUserThunk } from '@/features/authSlice'

function AdminLoginForm() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const loading = useSelector((s) => s.auth.loading)

   const [form, setForm] = useState({
      idOrEmail: '',
      password: '',
   })

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

      // 이메일 형식이면 email로, 아니면 userId로 보냄
      const isEmail = idOrEmail.includes('@')
      const payload = isEmail ? { email: idOrEmail, password } : { userId: idOrEmail, password }

      try {
         const user = await dispatch(loginUserThunk(payload)).unwrap()
         // 로그인은 성공했지만, 관리자가 아닐 수 있음
         if (user?.role !== 'ADMIN') {
            alert('관리자 권한이 없습니다. 일반 사용자 로그인으로 이동합니다.')
            // 관리자가 아니면 원하는 UX로 처리:
            // 1) 그냥 사용자 홈으로 이동:
            // navigate('/app', { replace: true })
            // 2) 또는 세션 정리를 원하면 다음 라인 주석 해제:
            // await dispatch(logoutUserThunk())
            navigate('/app', { replace: true })
            return
         }

         // 관리자면 대시보드로
         navigate('/admin/dashboard', { replace: true })
      } catch (err) {
         const msg = err || '로그인에 실패했습니다.'
         alert(typeof msg === 'string' ? msg : '로그인에 실패했습니다.')
      }
   }

   return (
      <div className="admin-login mt-40">
         <form className="loginform" onSubmit={onSubmit}>
            <div className="form--input">
               <p>아이디</p>
               <input type="text" name="idOrEmail" placeholder="아이디 또는 이메일을 입력하세요." required value={form.idOrEmail} onChange={onChange} autoComplete="username" />
            </div>

            <div className="form--input mt-20">
               <p>비밀번호</p>
               <input type="password" name="password" placeholder="비밀번호를 입력하세요." required value={form.password} onChange={onChange} autoComplete="current-password" />
            </div>

            <button type="submit" className="btn default main4 mt-40" disabled={loading}>
               {loading ? '로그인 중...' : '로그인'}
            </button>
         </form>
      </div>
   )
}

export default AdminLoginForm
