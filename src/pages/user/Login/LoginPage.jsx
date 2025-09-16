// re-earth-frontend/src/pages/user/Login/LoginPage.jsx
import AdminLoginForm from './AdminLoginForm'
import UserLoginForm from './UserLoginForm'
import './login.scss'

function LoginPage() {
   return (
      <>
         <section id="main1">
            <div id="area" className="container">
               <div id="login">
                  <h2>로그인하기</h2>
                  <UserLoginForm />
                  <AdminLoginForm />
               </div>
            </div>
         </section>
      </>
   )
}

export default LoginPage
