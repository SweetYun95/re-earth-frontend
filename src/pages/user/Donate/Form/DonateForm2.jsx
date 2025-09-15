import './scss/donateform2.scss'
function DonateForm2() {
   return (
      <div className="donation--content">
         {/* 컨텐츠 영역 */}
         <div className="donation content--left">
            <h3 className="mt-80">기부 신청</h3>
            <h4 className="mt-40">온라인 기증 문자 인증</h4>
            <form action="submit" className="with-btn">
               <div className="form--input mt-20 ">
                  <p className="text-body">휴대폰번호</p>
                  <div className="input-phone">
                     <input type="number" name="phone1" placeholder="010" />
                     <span>-</span>
                     <input type="number" name="phone2" placeholder="1234" />
                     <span>-</span>
                     <input type="number" name="phone2" placeholder="5678" />
                     <button className="btn default main1">인증 요청</button>
                  </div>
               </div>
               <div className="form--input  mt-20">
                  <p>인증번호</p>
                  <div className="confirm with-btn">
                     <input type="number" placeholder="인증번호를 입력하세요." />
                     <button className="btn default main1">입력</button>
                  </div>
               </div>
            </form>
         </div>
         <div className="donation content--right">
            <button className="btn default main1">2/4 →</button>
         </div>
      </div>
   )
}

export default DonateForm2
