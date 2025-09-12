import './scss/donateform3.scss'
function DonateForm3() {
   return (
      <div className="donation--content">
         {/* 컨텐츠 영역 */}
         <h3 className="mt-80">기부 물품 선택</h3>
         <div className="donation--setting">
            <div className="setting--count mt-40">
               <h4>물품 총 수량 </h4>
               <div className="counter">
                  <div className="counter--decrease" />
                  <input type="number" readOnly value={1} className="counter--count" />
                  <div className="counter--increase" />
               </div>
            </div>
            <div className="setting--package mt-40">
               <h4>포장방식 및 수량 </h4>
               <div className="counter-group">
                  <div className="counter">
                     <p>박스</p>
                     <div className="counter--decrease" />
                     <input type="number" readOnly value={1} className="counter--count" />
                     <div className="counter--increase" />
                  </div>
                  <div className="counter mt-20">
                     <p>봉투</p>
                     <div className="counter--decrease" />
                     <input type="number" readOnly value={1} className="counter--count" />
                     <div className="counter--increase" />
                  </div>
               </div>
            </div>
         </div>
         <h3 className="mt-40">수거 방식</h3>
         <div className="group mt-20">
            <button className="btn main2">방문수거</button>
            <button className="btn main1">택배수거</button>
         </div>
         <h3 className="mt-40">희망 수거 날짜</h3>
         <div className="donation--calendar mt-20">달력</div>
         <div className="donation--btn mt-40">
            <button className="btn default main1 ">신청하기</button>
         </div>
      </div>
   )
}

export default DonateForm3
