// re-earth-frontend/src/pages/user/Donate/Form/DonateForm4.jsx
// 4단계: 기부 물품 신청 내역
import './scss/donateform4.scss'
function DonateForm4() {
   return (
      <div className="donation--content">
         {/* 컨텐츠 영역 */}
         <h3 className="mt-80">기부 물품 신청 내역</h3>
         <div className="content--section mt-20">
            <div className="section--item">
               <p>의류</p>
               <p>00개</p>
            </div>
         </div>

         <h3 className="mt-40">기부영수증</h3>
         <div className="content--section mt-20">
            <div className="section--item">
               <p>이름</p>
               <p>홍길동</p>
            </div>
            <div className="section--item">
               <p>휴대폰</p>
               <p>010-1234-5678</p>
            </div>
            <div className="section--item">
               <p>주소</p>
               <p>인천광역시 남동구 00로 00-00</p>
            </div>
            <div className="section--item">
               <p>이메일</p>
               <p>rlfehd1234@gmail.com</p>
            </div>
         </div>

         <h3 className="mt-40">신청일</h3>
         <div className="content--section mt-20">
            <div className="section--item">
               <p>기부신청일</p>
               <p>2025-12-31</p>
            </div>
            <div className="section--item">
               <p>방문수거일</p>
               <p>2025-12-31</p>
            </div>
         </div>
         <div className="donation--btn mt-40">
            <button className="btn default main1 ">확인</button>
         </div>
      </div>
   )
}

export default DonateForm4
