import './FindSuccessPage.scss'

function FindSuccessPage() {
   return (
      <>
         <div class="container">
            <form action="submit" class="id-find">
               <p class="mt-80">회원님의 계정을 찾았어요</p>
               <div class="user-card mt-20">
                  <img src="" alt="user profile" class="user-avatar" />
                  <div class="user-info">
                     <div>example</div>
                     <div>2025.01.01 가입</div>
                  </div>
               </div>
               <button type="submit" class="btn default main1 mt-20">
                  로그인하러 가기
               </button>
               <a href="#" class="btn find">
                  비밀번호를 모르겠어요.
               </a>
            </form>
         </div>
      </>
   )
}

export default FindSuccessPage
