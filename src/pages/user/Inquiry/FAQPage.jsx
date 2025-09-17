import './FAQpage.scss'
import askIcon from '../../../assets/icons/ask.svg'
import answerIcon from '../../../assets/icons/answer.svg'

import dropdownIcon from '../../../assets/icons/dropdown.svg'
import Pagination from '../../../components/common/Pagination'
import faqData from './faqData'
import { useState } from 'react'

function FAQPage() {
   const [activeTab, setActiveTab] = useState('delivery')
   const [toggled, setToggled] = useState(null)
   const tabs = [
      { id: 'delivery', label: '배송' },
      { id: 'donation', label: '기부' },
      { id: 'savings', label: '인증/적립' },
      { id: 'order', label: '주문/결제' },
      { id: 'service', label: '서비스' },
      { id: 'etc', label: '기타' },
   ]

   console.log(faqData[activeTab])

   return (
      <section id="main1">
         <div className="container">
            <div className="col-md-10 faq-area ">
               <div className="faq">
                  <h3>FAQ | 자주 묻는 질문</h3>
                  {/* 탭 */}
                  <div className="faq--tab ">
                     {tabs.map((tab) => (
                        <div key={tab.id} className={`tab ${tab.id} ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                           {tab.label}
                        </div>
                     ))}
                  </div>
                  {/* 목록 */}
                  <div className="faq--board">
                     {faqData[activeTab].length > 0 ? (
                        faqData[activeTab].map((data, index) => (
                           <div className="faq--board--title" key={`content${index}`}>
                              <div className={`board--content ${toggled === index ? 'toggled' : ''}`} onClick={() => setToggled(toggled === index ? null : index)}>
                                 <img src={askIcon} alt="ask icon" />
                                 <p>{data?.q}</p>
                                 <img src={dropdownIcon} alt="" />
                              </div>

                              <div className={`board--toggle ${toggled === index ? 'open' : ''}`}>
                                 <img src={answerIcon} alt="answer icon" />
                                 <p>{data?.a}</p>
                              </div>
                           </div>
                        ))
                     ) : (
                        <p className="text-center mt-80">조회할 데이터가 없습니다.</p>
                     )}
                  </div>
                  <Pagination />
               </div>
            </div>
         </div>
      </section>
   )
}

export default FAQPage
