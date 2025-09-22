// re-earth-frontend/src/components/randing/SolutionSlider.jsx
import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Pagination, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

// ✅ 이미지 import (상대경로는 파일 위치에 맞춰 조정)
import imgProblem1 from '../../assets/images/환경문제1img.png'
import imgProblem2 from '../../assets/images/환경문제2img.png'
import imgProblem3 from '../../assets/images/환경문제3img.png'

const SolutionSlider = () => {
   const [isMobile, setIsMobile] = useState(() => {
      if (typeof window !== 'undefined') {
         return window.innerWidth <= 991.98
      }
      return true
   })
   const swiperRef = useRef(null)

   useEffect(() => {
      const checkScreenSize = () => {
         const width = window.innerWidth
         const newIsMobile = width <= 991.98
         setIsMobile(newIsMobile)
      }

      checkScreenSize()

      let resizeTimeout
      const debouncedResize = () => {
         clearTimeout(resizeTimeout)
         resizeTimeout = setTimeout(checkScreenSize, 300)
      }

      window.addEventListener('resize', debouncedResize)
      const onOrient = () => setTimeout(checkScreenSize, 350)
      window.addEventListener('orientationchange', onOrient)

      return () => {
         window.removeEventListener('resize', debouncedResize)
         window.removeEventListener('orientationchange', onOrient)
         clearTimeout(resizeTimeout)
      }
   }, [])

   const solutionData = [
      {
         id: 1,
         question: {
            image: imgProblem1,
            alt: '아타카마 사막의 헌 옷 쓰레기 더미',
            title: '아타카마 사막의<br/>헌 옷 쓰레기 더미',
            description: "'패스트 패션'의 무덤, 헌 옷 4만톤이 매년 칠레 사막에 버려집니다.<br/>매립·소각 과정에서 탄소배출과 미세플라스틱이 발생합니다.",
         },
         solution: {
            title: '헌 옷 1kg 재사용',
            effect: '3.6kg CO₂ 절감',
            description: '재활용/리유즈 효과',
         },
      },
      {
         id: 2,
         question: {
            image: imgProblem2,
            alt: '태평양 쓰레기 섬',
            title: '태평양에 나타난<br/>두 개의 쓰레기 섬',
            description: '해류를 타고 모인 부유성 쓰레기가 바다 한가운데 섬을 이룹니다.<br/>해양 생태계에 치명적인 피해를 줍니다.',
         },
         solution: {
            title: '페트병 100만 개',
            effect: '60톤 CO₂ 절감',
            description: '나무 2,700그루 식재 효과',
         },
      },
      {
         id: 3,
         question: {
            image: imgProblem3,
            alt: '지구 열대화와 기후 위기',
            title: '지구 열대화와<br/>기후 위기',
            description: '온실가스로 지구 평균 기온이 상승 중입니다. 지금의 행동이 미래를 바꿉니다.',
         },
         solution: {
            title: '내 차 대신 대중교통',
            effect: 'CO₂ 약 20% 절감',
            description: '서울 기준 통근',
         },
      },
   ]

   const RecycleIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
         <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M22 12c0 6-4.39 10-9.806 10C7.792 22 4.24 19.665 3 16m-1-4C2 6 6.39 2 11.807 2C16.208 2 19.758 4.335 21 8" />
            <path d="m7 17l-4-1l-1 4M17 7l4 1l1-4" />
         </g>
      </svg>
   )

   const swiperConfig = {
      modules: [EffectFade, Pagination, Mousewheel],
      spaceBetween: isMobile ? 16 : 30,
      effect: isMobile ? 'slide' : 'fade',
      loop: !isMobile,
      mousewheel: isMobile ? false : { enabled: true, invert: false },
      pagination: { clickable: true },
      speed: isMobile ? 450 : 650,
      autoHeight: isMobile,
      allowTouchMove: true,
      simulateTouch: true,
      onSwiper: (swiper) => {
         swiperRef.current = swiper
      },
   }

   return (
      <div className="cards-swiper">
         <Swiper key={`swiper-${isMobile ? 'mobile' : 'desktop'}`} {...swiperConfig} className="blog-slider">
            {solutionData.map((item) => (
               <SwiperSlide key={item.id}>
                  <div className="blog-slider__item">
                     <article className="q-card">
                        <div className="q-card__media">
                           <img src={item.question.image} alt={item.question.alt} />
                        </div>
                        <div className="q-card__body">
                           <span className="eyebrow">question</span>
                           <h3 className="q-title" dangerouslySetInnerHTML={{ __html: item.question.title }} />
                           <p className="q-desc" dangerouslySetInnerHTML={{ __html: item.question.description }} />
                        </div>
                     </article>
                     <aside className="s-card">
                        <span className="s-eyebrow">solution</span>
                        <h4 className="s-title">{item.solution.title}</h4>
                        <div className="s-visual" aria-hidden="true">
                           <RecycleIcon />
                        </div>
                        <p className="s-cta">
                           <strong>{item.solution.effect}</strong>
                           <span>{item.solution.description}</span>
                        </p>
                     </aside>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}

export default SolutionSlider
