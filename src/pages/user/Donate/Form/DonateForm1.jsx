import './scss/donateform1.scss'
function DonateForm1() {
   return (
      <div className="donation--content">
         <div className="content--notice mt-80">
            <h3 className="notice title"> 기부하기 </h3>
            <div className="notice text mt-40">
               <p>
                  ① 기증 가능물품 확인 <br />
                  기증품은 매장에서 판매되거나 사회취약계층에게 전달되고 있습니다. <br /> 판매 수익금으로는 환경보호활동을 지원하고 있습니다. <br /> 소중한 기증품이 잘 활용될 수 있도록 기증 가능 물품을 꼭 확인해 주세요.
                  <br />
                  <br />② 기증품 수량확인 <br />
                  기증품을 포장하시거나 수량을 확인하신 경우 방문수거는 2박스부터 가능합니다. <br /> (가로+세로+높이=125cm) 기준 3박스 이상부터 방문수거가 가능합니다.
                  <br />
                  <br />* 기업 대량/재고 기부는 리어스 콜센터 1533-1234로 문의 주시면 안내 도와드리겠습니다.
               </p>
            </div>
         </div>
         <div className="content--terms mt-40">
            <h3 className="terms title">개인정보 동의</h3>
            <textarea
               className="mt-40"
               name="terms-of-use"
               rows={6}
               value={`[개인정보 수집 및 이용에 대한 동의]

Re:earth는 기증 신청 서비스 제공을 위해 아래와 같이 개인정보를 수집·이용합니다. 
내용을 충분히 읽어보신 후 동의해 주시기 바랍니다.

① 수집 항목  
- 필수: 이름, 휴대전화번호, 주소, 이메일  
- 선택: 기부 관련 추가 문의사항  
② 수집 및 이용 목적  
- 기부 신청 접수 및 기부 내역 관리  
`}
            />
         </div>
         <div className="content--bottom mt-40">
            <div className="content--checkbox">
               <input type="checkbox" />
               <p>본인은 위 내용을 확인하였으며, 개인정보 수집 및 이용에 동의합니다.</p>
            </div>
            <button className="btn  main1">1/4 →</button>
         </div>
      </div>
   )
}

export default DonateForm1
