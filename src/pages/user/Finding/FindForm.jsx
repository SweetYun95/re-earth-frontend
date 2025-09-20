import './Finding.scss'

function FindForm() {
   return (
      <>
         <div class="container">
            <h2>ID찾기</h2>
            <form action="submit" className="user-register">
               <div class="form--input">
                  <p>이메일</p>
                  <input type="text" name="id" placeholder="이메일을 입력하세요. 예 example@gmail.com" required />
               </div>
               <div className="form--input mt-20">
                  <p className="text-body">휴대폰번호</p>
                  <div className="input-phone">
                     <input type="tel" name="phone1" placeholder="010" />
                     <span>-</span>
                     <input type="tel" name="phone2" placeholder="1234" />
                     <span>-</span>
                     <input type="tel" name="phone2" placeholder="5678" />
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
export default FindForm
