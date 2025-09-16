// re-earth-frontend/src/pages/user/Login/AdminLoginForm.jsx
function AdminLoginForm() {
   return (
      <>
         <div className="admin-login mt-40">
            <form action="submit" className="loginform">
               <div className="form--input">
                  <p>아이디</p>
                  <input type="text" name="id" placeholder="아이디를 입력하세요." required />
               </div>
               <div className="form--input mt-20">
                  <p>비밀번호</p>
                  <input type="password" name="password" placeholder="비밀번호를 입력하세요. " required />
               </div>
               <button type="submit" className="btn default main4 mt-40">
                  로그인
               </button>
            </form>
         </div>
      </>
   )
}

export default AdminLoginForm
