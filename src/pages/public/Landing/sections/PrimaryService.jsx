// re-earth-frontend/src/pages/public/Landing/sections/PrimaryService.jsx
import './PrinmaryService.scss'

// 이미지 임포트
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
