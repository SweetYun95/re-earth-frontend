import { useEffect, useState } from 'react'

import MapComponent from '../../../components/map/MapComponent'
import SearchTap from './SearchTap'
import QrScanner from '../../../components/common/QrScanner'

import './SavingMap.scss'

function SavingMap() {
   const category = 'transit'
   // category: nephron / transit
   // 데이터 확인용 임시 코드, 배포 전 삭제
   const [data, setData] = useState(null)
   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
   const [position, setPosition] = useState({
      lat: 37.5665,
      lng: 126.978,
   })
   useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   return (
      <>
         <section id="main1" className="savingmap">
            <div className="container" id="area">
               {/* 영역 */}
               <div className="finding">
                  <h2>내 주변 {category === 'nephron' ? '네프론' : '따릉이 대여소'}</h2>
                  <div className="finding--content mt-40">
                     <SearchTap category={category} isMobile={isMobile} data={data} setData={setData} position={position} />
                     <MapComponent category={category} setPosition={setPosition} position={position} data={data} />
                  </div>
               </div>

               {isMobile ? (
                  <div className="mobileOnly mt-40">
                     {category === 'nephron' ? <p>내가 찾는 네프론이 지도에 보이지 않나요?</p> : <p>내 주변 대여소가 지도에 보이지 않나요?</p>}
                     <QrScanner label={'QR코드 스캔하기'} />
                  </div>
               ) : (
                  <div className="verify mt-80">
                     <h3>인증하기</h3>
                     <div className="mobileOnly mt-20">
                        <a href="">어플리케이션 설치</a>
                        <p className="mt-40">해당 기능은 모바일 또는 태블릿 환경(가로 768px 이하)에서만 실행 가능합니다. </p>
                     </div>
                  </div>
               )}
            </div>
         </section>
      </>
   )
}

export default SavingMap
