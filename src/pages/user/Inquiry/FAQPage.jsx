import './FAQpage.scss'
import askIcon from '../../../assets/icons/ask.svg'
import answerIcon from '../../../assets/icons/answer.svg'
import linkIcon from '../../../assets/icons/link.svg'
import rightIcon from '../../../assets/icons/right-line.svg'
import dropdownIcon from '../../../assets/icons/dropdown.svg'

function FAQPage() {
   return (
      <section id="main1">
         <div className="container">
            <div className="col-md-10 faq-area ">
               <div className="faq">
                  <h3>FAQ | 자주 묻는 질문</h3>
                  {/* 탭 */}
                  <div className="faq--tab ">
                     <div className="tab delivery">배송</div>
                     <div className="tab donation">기부</div>
                     <div className="tab inquire">인증/적립</div>
                     <div className="tab order">주문/결제</div>
                     <div className="tab service active">서비스</div>
                     <div className="tab etc">기타</div>
                  </div>
                  {/* 목록 */}
                  <div className="faq--board">
                     <div className="faq--board--title">
                        <div className="board--content">
                           <img src={askIcon} alt="ask icon" />
                           <p>연말정산 시 세액을 공제받을 수 있나요?</p>
                           <img src={dropdownIcon} alt="" />
                        </div>
                        <div className="custom-border"></div>
                        <div className="board--toggle">
                           <img src={answerIcon} alt="answer icon" />
                           <div>
                              <span>Re:earth</span>와 연계된 기부처는 모두 지정 기부금 단체로, 세액 공제용 기부금 영수증을 발급해 드립니다. 개인 기부자는 근로소득 금액의 30% 한도 내에서 기부금의 15%~30%를 공제받을 수 있습니다. 연말정산 관련 자세한 사항은 국세청에서 확인 바랍니다.
                              <div className="btn link-btn main1 mt-40">
                                 <img src={linkIcon} alt="" />
                                 <p>국세청 바로가기</p>
                                 <img src={rightIcon} alt="" />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default FAQPage
