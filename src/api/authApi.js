// re-earth-frontend/src/api/authApi.js
import reEarth from "./http";

const BASE_API_URL = import.meta.env.VITE_APP_API_URL;

// 회원가입
export const registerUser = async (userData) => {
  const res = await reEarth.post("/auth/join", userData);
  return res;
};

// 일반 로그인
export const loginUser = async (credentials) => {
  const res = await reEarth.post("/auth/login", credentials);

  // 세션 쿠키 기반이 기본이지만, 서버가 토큰을 발급할 경우엔 저장
  if (res?.status === 200 && res?.data?.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res;
};

// ★ 관리자 전용 로그인
// - ADMIN 계정만 성공 처리
export const adminLogin = async (credentials) => {
  const res = await reEarth.post("/auth/login-admin", credentials);
  const ok = res?.status === 200;
  const user = res?.data?.user;
  if (!ok || !user || user.role !== "ADMIN") {
    const err = new Error(res?.data?.message || "관리자 로그인 실패");
    err.response = res;
    throw err;
  }
  if (res?.data?.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res;
};

// 로그아웃 (세션 쿠키 제거)
export const logoutUser = async () => {
  const res = await reEarth.get("/auth/logout");
  localStorage.removeItem("token");
  return res;
};

// 내 정보 조회
export const fetchMe = async () => {
  try {
    const res = await reEarth.get("/auth/me");
    return res;
  } catch (err) {
    if (err?.response?.status === 401) return err.response;
    throw err;
  }
};

// 이메일로 아이디 찾기

// 임시 비밀번호 발급

// 인증 상태 확인
export const checkAuthStatus = async () => {
  const res = await reEarth.get("/auth/status");
  return res;
};

// 소셜 로그인 리다이렉트
export const redirectToGoogleLogin = () => {
  window.location.href = `${BASE_API_URL}/auth/google`;
};

export const redirectToKakaoLogin = () => {
  window.location.href = `${BASE_API_URL}/auth/kakao`;
};

// 소셜 로그인 후 상태 확인
export const checkStatusAfterOAuth = async () => {
  return fetchMe();
};

// 중복 체크 API
export const checkUsername = async (userId) =>
  reEarth.post("/auth/check-username", { userId });
export const checkNickname = async (name) =>
  reEarth.post("/auth/check-nickname", { name });
export const checkEmail = async (email) =>
  reEarth.post("/auth/check-email", { email });
