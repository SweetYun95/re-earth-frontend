// re-earth-frontend/src/pages/user/Login/UserLoginForm.jsx
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loginUserThunk, checkUnifiedAuthThunk } from '../../../features/authSlice'
import { redirectToGoogleLogin, redirectToKakaoLogin } from '../../../api/authApi'

import googleIcon from '../../../assets/icons/google.svg'
import kakaoIcon from '../../../assets/icons/kakao.svg'

export default function UserLoginForm() {
   const dispatch = useDispatch()
   const loading = useSelector((s) => s.auth.loading)

   const [form, setForm] = useState({ id: '', password: '' })

   // 🔎 auth 상태가 변할 때마다 콘솔에 스냅샷 남기기
   useEffect(() => {
      console.log('[UserLoginForm] auth state changed →', {
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
      setForm((prev) => ({ ...prev, [name]: value }))
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      const userId = form.id.trim()
      const password = form.password

      if (!userId) return alert('아이디를 입력하세요.')
      if (!password) return alert('비밀번호를 입력하세요.')

      try {
         await dispatch(loginUserThunk({ userId, password })).unwrap()
         // (선택) 로컬/소셜 통합 상태도 갱신
         dispatch(checkUnifiedAuthThunk())
         alert('로그인 성공! 환영합니다 :)')
      } catch (err) {
         alert(typeof err === 'string' ? err : '로그인에 실패했습니다.')
      }
   }

   const handleGoogle = () => {
      if (loading) return
      redirectToGoogleLogin()
   }

   const handleKakao = () => {
      if (loading) return
      redirectToKakaoLogin()
   }

   return (
      <div className="user-login mt-40">
         {/* NOTE: action 제거하고 onSubmit으로 제어 */}
         <form className="loginform" onSubmit={handleSubmit}>
            <div className="form--input">
               <p>아이디</p>
               <input type="text" name="id" placeholder="아이디를 입력하세요." required autoComplete="username" value={form.id} onChange={onChange} disabled={loading} />
            </div>

            <div className="form--input mt-20">
               <p>비밀번호</p>
               <input type="password" name="password" placeholder="비밀번호를 입력하세요." required autoComplete="current-password" value={form.password} onChange={onChange} disabled={loading} />
            </div>

            <a href="#" className="btn find" onClick={(e) => e.preventDefault()}>
               아이디 / 비밀번호 찾기
            </a>

            <button type="submit" className="btn default main1 mt-40" disabled={loading}>
               {loading ? '로그인 중…' : '로그인'}
            </button>
         </form>

         {/* Social Login */}
         <div className="socialLogin mt-40">
            <button type="button" className="btn google" onClick={handleGoogle} disabled={loading}>
               <div className="btn--inside">
                  <img src={googleIcon} alt="구글" />
                  <span>구글 아이디로 로그인</span>
               </div>
            </button>

            <button type="button" className="btn kakao" onClick={handleKakao} disabled={loading}>
               <div className="btn--inside">
                  <img src={kakaoIcon} alt="카카오" />
                  <span>카카오 아이디로 로그인</span>
               </div>
            </button>
         </div>
      </div>
   )
}
