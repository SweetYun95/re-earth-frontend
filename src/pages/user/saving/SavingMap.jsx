import MapComponent from '../../../components/map/MapComponent'
import './SavingMap.scss'

function SavingMap() {
   const TestBox = () => {
      return (
         <div
            style={{
               width: '20px',
               height: '20px',
               borderRadius: '100%',
               backgroundColor: 'blue',
            }}
         ></div>
      )
   }

   return (
      <>
         <section id="main1">
            <div className="container" id="area">
               {/* 영역 */}
               <div className="finding">
                  <h2>내 주변 네프론</h2>
                  <div className="finding--content mt-40">
                     <div className="searchtap">
                        <input type="text" placeholder="장소, 주소, 버스 검색" />
                        <span className="mt-20 text-right">검색 결과 12</span>
                        <div className="searchtap--spot mt-10">
                           <TestBox />
                           <div className="spot--address">
                              <p>지명</p>
                              <p className="description">상세주소 (참고를 위한 임시 텍스트입니다.)</p>
                           </div>
                        </div>
                     </div>
                     <MapComponent />
                  </div>
               </div>
               <div className="verify mt-80">
                  <h3>인증하기</h3>
               </div>
            </div>
         </section>
      </>
   )
}

export default SavingMap
