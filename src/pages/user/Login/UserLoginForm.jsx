// re-earth-frontend/src/pages/user/Login/UserLoginForm.jsx
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loginUserThunk, checkUnifiedAuthThunk } from '../../../features/authSlice'
import { redirectToGoogleLogin, redirectToKakaoLogin } from '../../../api/authApi'

import InputField from '../../../components/common/InputField'

import googleIcon from '../../../assets/icons/google.svg'
import kakaoIcon from '../../../assets/icons/kakao.svg'

export default function UserLoginForm() {
  const dispatch = useDispatch()
  const { loading, isAuthenticated, user, googleAuthenticated, kakaoAuthenticated, localAuthenticated, error } = useSelector((s) => s.auth)

  const [form, setForm] = useState({ idOrEmail: '', password: '' })

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
    const idOrEmail = form.idOrEmail.trim()
    const password = form.password

    if (!idOrEmail) return alert('아이디 또는 이메일을 입력하세요.')
    if (!password) return alert('비밀번호를 입력하세요.')

    // 과도기 호환: 서버는 idOrEmail을 기본으로, 폴백으로 userId도 허용
    const payload = { idOrEmail, userId: idOrEmail, password }
    console.log('[UserLoginForm] submitting login payload:', payload)

    try {
      const loggedUser = await dispatch(loginUserThunk(payload)).unwrap()
      console.log('[UserLoginForm] loginUserThunk success →', loggedUser)
      dispatch(checkUnifiedAuthThunk())
      alert('로그인 성공! 환영합니다 :)')
    } catch (err) {
      console.error('[UserLoginForm] loginUserThunk error →', err)
      alert(typeof err === 'string' ? err : '로그인에 실패했습니다.')
    }
  }

  const handleGoogle = () => {
    if (loading) return
    console.log('[UserLoginForm] redirecting to Google OAuth')
    redirectToGoogleLogin()
  }

  const handleKakao = () => {
    if (loading) return
    console.log('[UserLoginForm] redirecting to Kakao OAuth')
    redirectToKakaoLogin()
  }

  return (
    <div className="user-login mt-40">
      <form className="loginform" onSubmit={handleSubmit}>
        {/* 아이디/이메일 */}
        <InputField
          label="아이디"
          type="text"
          name="idOrEmail"
          placeholder="아이디 또는 이메일을 입력하세요."
          value={form.idOrEmail}
          inputChange={onChange}
          disabled={loading}
          required={true}
          autoComplete="username"
        />

        {/* 비밀번호 */}
        <InputField
          label="비밀번호"
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요."
          required={true}
          value={form.password}
          inputChange={onChange}
          disabled={loading}
          marginTop="mt-20"
          autoComplete="current-password"
        />

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
