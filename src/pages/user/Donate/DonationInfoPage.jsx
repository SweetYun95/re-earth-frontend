import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import donateImg from '../../../assets/images/re-earth_donation_bannerCard.png'
import donateIcon from '../../../assets/icons/re-earth_donation_icon.png'
import './donationInfo.scss'

export default function DonationInfoPage() {
   const navigate = useNavigate()
   const guideRef = useRef(null)

   const goDonate = () => navigate('/donate')
   const scrollToGuide = () => guideRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

   return (
      <>
         {/* ─────────── Hero (섹션 1) ─────────── */}
         <section className="donation-hero">
            <div className="overlay" />
            <div className="hero-inner">
               <div className="hero-block">
                  <h2 className="hero-title">기부하기</h2>
                  <p className="hero-sub mt-40">Re:Wear(헌옷 기부하기)</p>
                  <p className="hero-tags mt-80">#recycling&nbsp;&nbsp;#헌옷기부&nbsp;&nbsp;#환경보호&nbsp;&nbsp;#탄소중립실천</p>
               </div>
            </div>

            <div className="hero-arrow">
               <button type="button" className="arrow-btn" aria-label="다음 섹션으로 이동" onClick={scrollToGuide}>
                  ↓
               </button>
            </div>
         </section>

         {/* ─────────── Guide (섹션 2) ─────────── */}
         <section className="donation-guide-wrapper" ref={guideRef}>
            <div>
               {/* 위쪽: 제목/설명 */}
               <div className="container guide-head">
                  <h3 className="guide-title">기부안내</h3>
                  <p className="guide-sub">Re:Wear Project (리:웨어 프로젝트) — 헌옷 기부 프로젝트</p>
               </div>

               {/* 아래쪽: 좌=이미지(4) / 우=텍스트(8) — 데스크탑에서 한 줄 */}
               <div className="container">
                  <div className="row align-items-center guide-row">
                     {/* 좌측: 이미지 */}
                     <div className="col-4 col-lg-5 mb-4 mb-lg-0">
                        <div className="guide-card guide-card--image">
                           <img src={donateImg} alt="기부 박스" />
                        </div>
                     </div>

                     {/* 우측: 텍스트 + 버튼 */}
                     <div className="col-8 col-lg-7">
                        <div className="guide-card guide-card--text">
                           <h5 className="guide-quote">“입던 옷, 다시 지구를 위한 가치로”</h5>

                           <p className="guide-body">
                              사용자는 옷을 기부하기만 하면 포인트가 자동 적립됩니다.
                              <br />
                              적립된 포인트는 기부, 친환경 쇼핑, 다양한 혜택으로 이어져 일상 속에서 탄소중립을 실천하는 선순환 구조를 완성합니다.
                           </p>

                           <div className="cta">
                              <button type="button" className="btn-donate" onClick={goDonate}>
                                 기부하러가기
                              </button>
                              <img className="cta-icon" src={donateIcon} alt="" aria-hidden="true" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}
