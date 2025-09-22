<<<<<<< HEAD:src/pages/user/Login/UserLoginForm.jsx
// re-earth-frontend/src/pages/user/Login/UserLoginForm.jsx
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
=======
// re-earth-frontend/src/pages/user/Login/LoginForm.jsx
import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
>>>>>>> a8e8adc8150a987c33332d5fedec4489ec12900d:src/pages/user/Login/LoginForm.jsx

import { loginUserThunk, hydrateAuthThunk } from "../../../features/authSlice";
import {
  redirectToGoogleLogin,
  redirectToKakaoLogin,
} from "../../../api/authApi";

import InputField from "../../../components/common/InputField";
import googleIcon from "../../../assets/icons/google.svg";
import kakaoIcon from "../../../assets/icons/kakao.svg";

<<<<<<< HEAD:src/pages/user/Login/UserLoginForm.jsx
export default function UserLoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, user, error } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ idOrEmail: "", password: "" });

  // 중복 리다이렉트 방지
  const didRedirect = useRef(false);

  useEffect(() => {
    console.log("[UserLoginForm] auth state changed →", {
      isAuthenticated,
      user,
      loading,
      error,
    });
    // 리다이렉트는 제출 시점에서만 처리 (레이스 컨디션 방지)
  }, [isAuthenticated, user, loading, error]);
=======
export default function LoginForm() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, isAuthenticated, user, error, hydrated } = useSelector((s) => s.auth)
   const [form, setForm] = useState({ idOrEmail: '', password: '' })

   const didRedirect = useRef(false)

   // 이미 로그인 상태로 /login 접근 시 역할별 자동 이동
   useEffect(() => {
      console.log('[LoginForm] auth state changed →', { isAuthenticated, user, loading, error, hydrated })
      if (hydrated && isAuthenticated && user && !didRedirect.current) {
         didRedirect.current = true
         if (user.role === 'ADMIN') navigate('/admin', { replace: true })
         else navigate('/user', { replace: true })
      }
   }, [hydrated, isAuthenticated, user, loading, error, navigate])
>>>>>>> a8e8adc8150a987c33332d5fedec4489ec12900d:src/pages/user/Login/LoginForm.jsx

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const idOrEmail = form.idOrEmail.trim();
    const password = form.password;
    if (!idOrEmail) return alert("아이디 또는 이메일을 입력하세요.");
    if (!password) return alert("비밀번호를 입력하세요.");

<<<<<<< HEAD:src/pages/user/Login/UserLoginForm.jsx
    const payload = { idOrEmail, userId: idOrEmail, password };
    console.log("[UserLoginForm] submitting login payload:", payload);

    try {
      const loggedUser = await dispatch(loginUserThunk(payload)).unwrap();
      console.log("[UserLoginForm] loginUserThunk success →", loggedUser);

      // 로그인 성공 후, 유저 계정일 때만 즉시 /user 이동
      if (loggedUser?.role === "USER" && !didRedirect.current) {
        didRedirect.current = true;
        // 스토어 동기화(토큰/세션 기준 단일 진실원천을 따라감)
        await dispatch(hydrateAuthThunk());
        alert("로그인 성공! 환영합니다 :)");
        navigate("/user", { replace: true });
      } else {
        // ADMIN 등 다른 권한으로 이 폼을 썼을 경우는 이동/알림 없이 대기
        // (관리자 폼이 /admin으로 이동을 담당)
        await dispatch(hydrateAuthThunk());
=======
      const payload = { idOrEmail, userId: idOrEmail, password }
      console.log('[LoginForm] submitting login payload:', payload)

      try {
         const loggedUser = await dispatch(loginUserThunk(payload)).unwrap()
         console.log('[LoginForm] loginUserThunk success →', loggedUser)

         await dispatch(hydrateAuthThunk())

         // 역할별 리다이렉트
         if (!didRedirect.current) {
            didRedirect.current = true
            if (loggedUser?.role === 'ADMIN') {
               alert('관리자 로그인 성공! 환영합니다 :)')
               navigate('/admin', { replace: true })
            } else {
               alert('로그인 성공! 환영합니다 :)')
               navigate('/user', { replace: true })
            }
         }
      } catch (err) {
         console.error('[LoginForm] loginUserThunk error →', err)
         alert(typeof err === 'string' ? err : '로그인에 실패했습니다.')
      } finally {
         // 보안상 비밀번호 초기화
         setForm((prev) => ({ ...prev, password: '' }))
>>>>>>> a8e8adc8150a987c33332d5fedec4489ec12900d:src/pages/user/Login/LoginForm.jsx
      }
    } catch (err) {
      console.error("[UserLoginForm] loginUserThunk error →", err);
      alert(typeof err === "string" ? err : "로그인에 실패했습니다.");
    } finally {
      // 보안상 비밀번호 지우기
      setForm((prev) => ({ ...prev, password: "" }));
    }
  };

<<<<<<< HEAD:src/pages/user/Login/UserLoginForm.jsx
  const handleGoogle = () => {
    if (loading) return;
    console.log("[UserLoginForm] redirecting to Google OAuth");
    redirectToGoogleLogin();
  };

  const handleKakao = () => {
    if (loading) return;
    console.log("[UserLoginForm] redirecting to Kakao OAuth");
    redirectToKakaoLogin();
  };
=======
   const handleGoogle = () => {
      if (loading) return
      console.log('[LoginForm] redirecting to Google OAuth')
      redirectToGoogleLogin()
   }

   const handleKakao = () => {
      if (loading) return
      console.log('[LoginForm] redirecting to Kakao OAuth')
      redirectToKakaoLogin()
   }
>>>>>>> a8e8adc8150a987c33332d5fedec4489ec12900d:src/pages/user/Login/LoginForm.jsx

  return (
    <div className="user-login mt-40">
      <form className="loginform" onSubmit={handleSubmit}>
        <InputField
          label="아이디"
          type="text"
          name="idOrEmail"
          placeholder="아이디 또는 이메일을 입력하세요."
          value={form.idOrEmail}
          inputChange={onChange}
          disabled={loading}
          required
          autoComplete="username"
        />
        <InputField
          label="비밀번호"
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요."
          required
          value={form.password}
          inputChange={onChange}
          disabled={loading}
          marginTop="mt-20"
          autoComplete="current-password"
        />

        <a href="/finding" className="btn find">
          아이디 / 비밀번호 찾기
        </a>

        <button
          type="submit"
          className="btn default main1 mt-40"
          disabled={loading || didRedirect.current}
        >
          {loading ? "로그인 중…" : "로그인"}
        </button>
      </form>

      <div className="socialLogin mt-40">
        <button
          type="button"
          className="btn google"
          onClick={handleGoogle}
          disabled={loading}
        >
          <div className="btn--inside">
            <img src={googleIcon} alt="구글" />
            <span>구글 아이디로 로그인</span>
          </div>
        </button>

        <button
          type="button"
          className="btn kakao"
          onClick={handleKakao}
          disabled={loading}
        >
          <div className="btn--inside">
            <img src={kakaoIcon} alt="카카오" />
            <span>카카오 아이디로 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
}
