import reEarth from "./http";

const BASE_API_URL = import.meta.env.VITE_APP_API_URL;

// 회원가입
export const registerUser = async (userData) => {
  const res = await reEarth.post("/auth/join", userData);
  return res;
};

// 회원 로그인
export const loginUser = async (credentials) => {
  const res = await reEarth.post("/auth/login", credentials);
  if (res?.status === 200 && res?.data?.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res;
};

// ★ 관리자 전용 로그인: 200 & ADMIN 아닐 시 무조건 throw
export const adminLogin = async (credentials) => {
  const res = await reEarth.post("/auth/login-admin", credentials);
  const ok = res?.status === 200;
  const user = res?.data?.user;
  if (!ok || !user || user.role !== "ADMIN") {
    const err = new Error(res?.data?.message || "관리자 로그인 실패");
    // axios 인터셉터가 resolve로 넘겨도 여기서 강제 throw
    err.response = res;
    throw err;
  }
  if (res?.data?.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res;
};

// 회원 정보 수정
export const userUpdate = async (formData) => {
  console.log("---------------------api");
  console.log("formdata-api:", formData);
  const res = await reEarth.patch("/auth/edit", formData);
  console.log("api통신 완료");
  return res;
};

// 로그아웃
export const logoutUser = async () => {
  const res = await reEarth.get("/auth/logout");
  localStorage.removeItem("token");
  return res;
};

// 회원 정보 조회
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

export const checkAuthStatus = async () => {
  const res = await reEarth.get("/auth/status");
  return res;
};

export const redirectToGoogleLogin = () => {
  window.location.href = `${BASE_API_URL}/auth/google`;
};

export const redirectToKakaoLogin = () => {
  window.location.href = `${BASE_API_URL}/auth/kakao`;
};

export const checkStatusAfterOAuth = async () => {
  return fetchMe();
};

export const checkUsername = async (userId) =>
  reEarth.post("/auth/check-username", { userId });
export const checkNickname = async (name) =>
  reEarth.post("/auth/check-nickname", { name });
export const checkEmail = async (email) =>
  reEarth.post("/auth/check-email", { email });
