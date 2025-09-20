import React from 'react'
import './PrinmaryService.scss' // 파일명이 'Primary'가 아니라 'Prinmary'면 그대로 두세요.

// 이미지 임포트 (경로/파일명은 실제 프로젝트에 맞게 유지)
import card1 from '../../../../assets/images/randingpage(card2) (1).svg'
import card2 from '../../../../assets/images/randingpage(card2) (2).svg'
import card3 from '../../../../assets/images/randingpage(card2) (3).svg'
import card4 from '../../../../assets/images/randingpage(card2).svg'

export default function PrimaryService() {
   const slides = [card1, card2, card3, card4].filter(Boolean)

   return (
      <>
         <section id="showcase" className="showcase">
            <div className="container">
               <div className="highlight-text">이제 이 앱 하나면 끝.</div>
            </div>
         </section>

         <section className="ps-wrapper">
            {/* 오른쪽 정렬을 위한 컨테이너 */}
            <div class="container">
               <div class="service-text1">이렇게 해결할 수 있어요.</div>
               <div class="service-text2">Primary Service</div>
            </div>
            <div className="ps-rail">
               {slides.map((src, idx) => (
                  <div className="ps-card" key={idx}>
                     <img
                        src={src}
                        alt={`benefit-${idx + 1}`}
                        onError={(e) => {
                           e.currentTarget.style.visibility = 'hidden'
                        }}
                     />
                  </div>
               ))}
            </div>
         </section>
      </>
   )
}
