// re-earth-frontend/src/pages/public/Landing/sections/PointPanelSection.jsx
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import 'swiper/css'
import './PrinmaryService.scss'

// GSAP 플러그인 등록
gsap.registerPlugin(SplitText)

export default function PointPanelSection() {
   const textRef1 = useRef(null)
   const textRef2 = useRef(null)
   const sectionRef1 = useRef(null)
   const sectionRef2 = useRef(null)
   const animated1 = useRef(false)
   const animated2 = useRef(false)

   useEffect(() => {
      const animateText1 = (element) => {
         if (!element) return

         document.fonts.ready.then(() => {
            const split = SplitText.create(element, {
               type: "chars"
            })
            const tl = gsap.timeline({ repeat: 30 })

            gsap.set(element, { opacity: 1 })
            
            tl.from(split.chars, {
               duration: 1,
               y: 100,
               rotation: 90,
               opacity: 0,
               ease: "elastic",
               stagger: 0.03
            })

            // exploding text...
            tl.to(
               split.chars,
               {
                  duration: 2.5,
                  opacity: 0,
                  rotation: "random(-2000, 2000)",
                  physics2D: () => ({
                     angle: "random(240, 320)",
                     velocity: "random(300, 600)",
                     gravity: 800
                  }),
                  stagger: 0.015
               },
               3
            )
         })
      }

      const animateText2 = (element) => {
         if (!element) {
            console.log('No element provided for text2')
            return
         }

         console.log('animateText2 called with element:', element)

         // 즉시 실행하여 폰트 로딩 문제 해결
         gsap.set(element, { opacity: 1 })

         const split = SplitText.create(element, {
            type: "words"
         })

         console.log('Split words:', split.words, 'Length:', split.words.length)

         // 초기 상태 설정
         gsap.set(split.words, {
            y: -100,
            opacity: 0,
            rotation: 0
         })

         // 애니메이션 실행
         gsap.to(split.words, {
            y: 0,
            opacity: 1,
            rotation: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.7)",
            onComplete: () => {
               console.log('Text2 animation completed')
            }
         })
      }

      // Intersection Observer 설정
      const observerOptions = {
         threshold: 0.5, // 50% 보일 때 트리거
         rootMargin: '0px'
      }

      const observer1 = new IntersectionObserver((entries) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting && textRef1.current && !animated1.current) {
               console.log('Section 1 is visible, starting animation')
               animated1.current = true
               animateText1(textRef1.current)
            }
         })
      }, observerOptions)

      const observer2 = new IntersectionObserver((entries) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting && textRef2.current && !animated2.current) {
               console.log('Section 2 is visible, starting animation')
               animated2.current = true
               setTimeout(() => {
                  animateText2(textRef2.current)
               }, 500) // 0.5초 지연
            }
         })
      }, observerOptions)

      // Observer 시작
      if (sectionRef1.current) {
         observer1.observe(sectionRef1.current)
      }
      if (sectionRef2.current) {
         observer2.observe(sectionRef2.current)
      }

      // Cleanup
      return () => {
         observer1.disconnect()
         observer2.disconnect()
      }
   }, [])

   return (
      <>
         <section 
            id="showcase1" 
            className="panel showcase1" 
            ref={sectionRef1}
            style={{
               background: 'linear-gradient(to bottom, #ff6b6b 0%, #ffd93d 60%, #ffffff 100%)',
               textAlign: 'center',
               padding: '120px 24px 40px',
               height: '100vh',
               minHeight: '100vh',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center'
            }}
         >
            <div className="container text-center">
               <div className="highlight-text1" ref={textRef1} style={{ opacity: 0 }}>
                  환경보호, 기부, 세제혜택... 너무복잡했죠?
               </div>
            </div>
         </section>

         <section 
            id="showcase2" 
            className="panel showcase2" 
            ref={sectionRef2}
            style={{
               background: 'linear-gradient(to bottom, #d1e95d 0%, #ffffff 60%, #ffffff 100%)',
               textAlign: 'center',
               padding: '120px 24px 40px',
               height: '100vh',
               minHeight: '100vh',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center'
            }}
         >
            <div className="container text-center">
               <div className="highlight-text2" ref={textRef2} style={{ opacity: 0 }}>
                  이제 이 앱 하나면 끝.
               </div>
            </div>
         </section>
      </>
   )
}
