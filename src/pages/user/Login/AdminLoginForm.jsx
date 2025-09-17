// re-earth-frontend/src/pages/user/Login/AdminLoginForm.jsx
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk, checkUnifiedAuthThunk } from '../../../features/authSlice'
import InputField from '../../../components/common/InputField'

export default function AdminLoginForm() {
  const dispatch = useDispatch()
  const { loading, isAuthenticated, user, error } = useSelector((s) => s.auth)

  const [form, setForm] = useState({ idOrEmail: '', password: '' })

  useEffect(() => {
    console.log('[AdminLoginForm] auth state changed →', {
      isAuthenticated,
      user,
      loading,
      error,
    })
  }, [isAuthenticated, user, loading, error])

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

    // 양쪽 수용: 서버는 idOrEmail을 기본으로, userId도 폴백 허용
    const payload = { idOrEmail, userId: idOrEmail, password }
    console.log('[AdminLoginForm] submitting login payload:', payload)

    try {
      const loggedUser = await dispatch(loginUserThunk(payload)).unwrap()
      console.log('[AdminLoginForm] loginUserThunk success →', loggedUser)
      dispatch(checkUnifiedAuthThunk())
    } catch (err) {
      console.error('[AdminLoginForm] loginUserThunk error →', err)
      alert(typeof err === 'string' ? err : '로그인에 실패했습니다.')
    }
  }

  return (
    <div className="admin-login mt-40">
      <form className="loginform" onSubmit={handleSubmit}>
        {/* 아이디/이메일 */}
        <InputField
          label={'아이디'}
          type={'text'}
          name={'idOrEmail'}
          placeholder={'아이디 또는 이메일을 입력하세요.'}
          required={true}
          value={form.idOrEmail}
          inputChange={onChange}
          autoComplete="username"
          disabled={loading}
        />

        {/* 비밀번호 */}
        <InputField
          marginTop={'mt-20'}
          label={'비밀번호'}
          type={'password'}
          name={'password'}
          value={form.password}
          inputChange={onChange}
          disabled={loading}
          autoComplete={'current-password'}
          placeholder={'비밀번호를 입력하세요.'}
          required={true}
        />

        <button type="submit" className="btn default main4 mt-40" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  )
}
