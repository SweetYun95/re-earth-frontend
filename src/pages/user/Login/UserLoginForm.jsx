import googleIcon from '../../../assets/icons/google.svg'
import kakaoIcon from '../../../assets/icons/kakao.svg'
function UserLoginForm() {
   return (
      <>
         <div className="user-login mt-40">
            <form action="submit" class="loginform">
               <div class="form--input">
                  <p>아이디</p>
                  <input type="text" name="id" placeholder="아이디를 입력하세요." require />
               </div>
               <div class="form--input mt-20">
                  <p>비밀번호</p>
                  <input type="password" name="password" placeholder="비밀번호를 입력하세요. " require />
               </div>
               <a href="#" class="btn find">
                  아이디 / 비밀번호 찾기
               </a>
               <button type="submit" class="btn default main1 mt-40">
                  로그인
               </button>
            </form>
            <div class="socialLogin mt-40">
               <div class="btn google">
                  <div class="btn--inside">
                     <img src={googleIcon} alt="구글" />
                     <a href="">구글 아이디로 로그인</a>
                  </div>
               </div>
               <div class="btn kakao">
                  <div class="btn--inside">
                     <img src={kakaoIcon} alt="카카오" />
                     <a href="">카카오 아이디로 로그인</a>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default UserLoginForm
