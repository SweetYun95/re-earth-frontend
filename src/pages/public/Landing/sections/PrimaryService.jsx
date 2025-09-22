// re-earth-frontend/src/pages/public/Landing/sections/PrimaryService.jsx
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Mousewheel } from 'swiper/modules'
import 'swiper/css'
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
         <section className="panel ps-wrapper">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-12 col-md-10">
                     <div className="randing--section__title mt-40">
                        <p>이렇게 해결할 수 있어요.</p>
                        <h2>Primary Service</h2>
                     </div>
                  </div>

                  <div className="col-12 col-md-10 mt-40">
                     <div className="ps-swiper-container">
               <Swiper
                  modules={[Autoplay, Mousewheel]}
                  spaceBetween={30}
                  slidesPerView={3}
                  autoplay={{
                     delay: 3000,
                     disableOnInteraction: false,
                  }}
                  mousewheel={{
                     forceToAxis: true,
                     sensitivity: 1,
                     releaseOnEdges: true,
                  }}
                  loop={true}
                  breakpoints={{
                     480: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                     },
                     768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                     },
                     1024: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                     },
                     1200: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                     }
                  }}
                  className="ps-swiper"
               >
                  {slides.map((src, idx) => (
                     <SwiperSlide key={idx}>
                        <div className="ps-card">
                           <img 
                              src={src} 
                              alt={`Service ${idx + 1}`}
                              className="ps-card-image"
                              onError={(e) => {
                                 console.error('이미지 로딩 실패:', src);
                                 e.target.style.display = 'none';
                              }}
                           />

                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}
