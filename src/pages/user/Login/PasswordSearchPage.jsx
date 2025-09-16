function passwordSearchPage() {
   return (
      <>
         <div class="container">
            <form action="submit" class="login">
               <div class="form--input">
                  <p>아이디</p>
                  <input type="text" name="id" placeholder="아이디를 입력하세요." required />
               </div>
               <div class="form--input mt-20">
                  <p>이메일</p>
                  <input type="password" name="password" placeholder="이메일을 입력하세요. 예 example@gamil.com " required />
               </div>
               <div className="form--input mt-20">
                  <p className="text-body">휴대폰번호</p>
                  <div className="input-phone">
                     <input type="number" name="phone1" placeholder="010" />
                     <span>-</span>
                     <input type="number" name="phone2" placeholder="1234" />
                     <span>-</span>
                     <input type="number" name="phone2" placeholder="5678" />
                  </div>
               </div>
               <button type="submit" class="btn default main1 mt-40">
                  재발급받기
               </button>
            </form>
         </div>
      </>
   )
}
export default passwordSearchPage
