// re-earth-frontend/src/routes/AppRouter.jsx
import { Routes, Route } from 'react-router-dom'

// Guards
import GuestOnly from './guards/GuestOnly'
import UserOnly from './guards/UserOnly'
import AdminOnly from './guards/AdminOnly'

// Public / Guest pages
import LandingPage from '../pages/public/Landing/LandingPage'
import LoginPage from '../pages/user/Login/LoginPage'
import RegisterPage from '../pages/user/Register/RegisterPage'
import FAQPage from '../pages/user/Inquiry/FAQPage'
import FindingPage from '../pages/user/Finding/FindingPage'

// User pages
// 유저메인페이지
import MainPage from '../pages/user/main/MainPage'
//기부
import DonationInfoPage from '../pages/user/Donate/DonationInfoPage'
import DonationPage from '../pages/user/Donate/DonationPage'
//인증

// 고객센터
import InquiryForm from '../pages/user/Inquiry/Create/InquiryForm'

//마이페이지
// import MyPage from '../pages/user/mypage/MyPage'

// Extra
import LoadingPage from '../pages_extra/Unloaded/LoadingPage'
import ErrorPage from '../pages_extra/Unloaded/ErrorPage'

// TODO: 추후 유저 메인, 마켓, 관리자 페이지 등 추가
// import AdminLoginPage from '../pages/admin/AdminLoginPage'
// import DashboardPage from '../pages/admin/DashboardPage'

export default function AppRouter() {
   return (
      <Routes>
         {/* 손님 전용(로그인/회원가입/FAQ 등 공개 페이지) */}
         <Route element={<GuestOnly />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/finding" element={<FindingPage />} />
         </Route>

         {/* 로그인 유저 전용 */}
         <Route element={<UserOnly />}>
            {/* <Route path="/user/my" element={<MyPage />} /> */}
            <Route path="/donate/info" element={<DonationInfoPage />} />
            <Route path="/donate" element={<DonationPage />} />
            <Route path="/inquiry/new" element={<InquiryForm />} />
         </Route>

         {/* 관리자 전용 (필요 시 해제) */}
         {/* 
      <Route element={<AdminOnly />}>
        <Route path="/admin" element={<DashboardPage />} />
      </Route>
      */}

         {/* 유틸 페이지 */}
         <Route path="/loading" element={<LoadingPage />} />
         <Route path="*" element={<ErrorPage />} />
      </Routes>
   )
}
