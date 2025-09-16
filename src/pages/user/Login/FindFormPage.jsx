import './FindFormPage.scss'

function FindFormPage() {
   return (
      <>
         <div class="container">
            <form action="submit" class="login">
               <div class="form--input">
                  <p>이메일</p>
                  <input type="text" name="id" placeholder="이메일을 입력하세요. 예 example@gmail.com" required />
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
                  찾기
               </button>
            </form>
         </div>
      </>
   )
}
export default FindFormPage
