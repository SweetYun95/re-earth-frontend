import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import ttareungiImg from '../../../assets/images/따릉이.png' // 따릉이 이미지
import savingBottleImg from '../../../assets/images/태양광충전기.png' // 텀블러/물병 이미지 (임시)
import savingIcon from '../../../assets/icons/re-earth_donation_icon.png' // 인증 아이콘 (기존 기부 아이콘 재사용)
import MenuBar from '../../../components/menu/MenuBar'
import './savingInfo.scss'


export default function SavingInfoPage() {
   const navigate = useNavigate()
   const guideRef = useRef(null)

   const goSaving = () => navigate('/saving/map') // SavingMap으로 이동
   const scrollToGuide = () => guideRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

   return (
      <>
        <MenuBar/>
         {/* ─────────── Hero (섹션 1) ─────────── */}
         <section className="saving-hero">
            <div className="overlay" />
            <div className="hero-inner container">
               <div className="hero-block">
                  <h2 className="hero-title">인증하기</h2>
                  <p className="hero-sub mt-40">Re:Move(대중교통 / 따릉이)</p>
                  <p className="hero-tags mt-80">#대중교통&nbsp;&nbsp;#따릉이&nbsp;&nbsp;#환경보호&nbsp;&nbsp;#탄소중립&nbsp;&nbsp;#탄소절감실천</p>
               </div>
            </div>

            <div className="hero-arrow">
               <button type="button" className="arrow-btn" aria-label="다음 섹션으로 이동" onClick={scrollToGuide}>
                  ↓
               </button>
            </div>
         </section>

         {/* ─────────── Guide (섹션 2) ─────────── */}
         <section className="saving-guide-wrapper" ref={guideRef}>
            <div>
               {/* 위쪽: 제목/설명 */}
               <div className="container guide-head">
                  <h3 className="guide-title">인증방법안내</h3>
                  <p className="guide-sub">대중교통/따릉이<br />Re:Move Project (리:무브 프로젝트)</p>
               </div>

               {/* 아래쪽: 좌=이미지(4) / 우=텍스트(8) — 데스크탑에서 한 줄 */}
               <div className="container">
                  <div className="row align-items-center guide-row">
                     {/* 좌측: 이미지 */}
                     <div className="col-4 col-lg-5 mb-4 mb-lg-0">
                        <div className="guide-card">
                           <div className="saving-images">
                              <div className="bike-icon-container">
                                 <iconify-icon icon="mdi:bike" width="200" height="200" style={{ color: '#72C63A' }}></iconify-icon>
                                 <p className="bike-label">따릉이</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* 우측: 텍스트 + 버튼 */}
                     <div className="col-8 col-lg-7">
                        <div className="guide-card guide-card--text">
                           <h5 className="guide-quote">"따릉이 실천을 지구를 위한 가치로"</h5>

                           <p className="guide-body">
                              Re:Move 프로젝트는 따릉이 이용을 친환경 실천으로 전환합니다.
                              <br />
                              따릉이를 이용한 경우, 출발지와 목적지를 입력하고 인증을 하면 포인트가 적립됩니다.
                              <br />
                              <br />
                              이렇게 획득한 포인트는 따릉이 이용의 친환경 실천을 실질적인 탄소 절감 성과로 전환하여 일상 속 친환경 라이프를 목적 삼습니다.
                           </p>

                           <div className="cta">
                              <button type="button" className="btn-saving" onClick={goSaving}>
                                 내 주변 따릉이 찾기
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* ─────────── 재활용 수거함 찾기 섹션 ─────────── */}
         <section className="recycling-finder-wrapper">
            <div className="container">
               <div className="row align-items-center guide-row">
                  {/* 좌측: 텍스트 */}
                  <div className="col-8 col-lg-7">
                     <div className="guide-card guide-card--text">
                        <h3 className="finder-title">재활용 수거함찾기</h3>
                        <p className="finder-sub">슈퍼빈 파트너쉽 - 네프론</p>
                        
                        <div className="finder-content">
                           <p className="finder-quote">"일상 속에서 재활용을 쉽게 실천하세요"</p>
                           <p className="finder-body">
                              Re:earth는 슈퍼빈과 함께 탄소 중립을 실천하는 새로운 방법을 제안합니다.
                           </p>
                           <p className="finder-body">
                              재활용 수거함 위치를 쉽게 찾을 수 있도록 도와드리며, 투명한 실천을 통해 실질적인 친환경 라이프를 목적 삼습니다.
                           </p>
                           <p className="finder-body">
                              이렇게 획득한 포인트는 출퇴길의 친환경 실천을 실질적인 탄소 절감 성과로 전환하여 일상 속 친환경 라이프를 목적 삼습니다.
                           </p>
                           
                           <div className="cta mt-4">
                              <button type="button" className="btn-finder" onClick={() => navigate('/saving/recycling')}>
                                 내 주변 네프론 찾기
                              </button>
                              <img className="cta-icon" src={savingIcon} alt="" aria-hidden="true" />
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* 우측: 이미지 */}
                  <div className="col-4 col-lg-5">
                     <div className="guide-card">
                        <img src={savingBottleImg} alt="재활용 수거함" className="recycling-img" />
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}
