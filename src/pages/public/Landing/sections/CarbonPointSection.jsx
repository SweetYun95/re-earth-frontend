// re-earth-frontend/src/pages/public/Landing/sections/CarbonPointSection.jsx
import { Link } from 'react-router-dom'
import EarthImage from '../../../../assets/images/re_Earth-Freepik-Photoroom__1.svg'

export default function CarbonPointSection({ totalCO2 = '？', unitCO2 = 'kg', totalPoint = '？', unitPoint = 'P', treeCount = '？' }) {
   return (
      <section className="panel randing--carbon-point content">
         <div className="container">
            <div className="row text-center">
               <div className="col-lg-10 offset-lg-1">
                  {/* 헤드라인 */}
                  <h2 className="gmarket headline">
                     지금까지 절감한 탄소 배출량
                     <span className="value-box ms-2">
                        {totalCO2}
                        <small>{unitCO2}</small>
                     </span>
                  </h2>

                  {/* 서브카피 (간격 20px) */}
                  <p className="title__sub mt-20">나무 {treeCount} 그루 심은 것과 동일한 효과</p>

                  {/* 포인트 라인 (간격 60px) */}
                  <h3 className="point-title gmarket mt-60" style={{ fontWeight: 800, fontSize: 'clamp(24px, 5.6vw, 56px)' }}>
                     누적된 포인트
                     <span className="value-box ms-2">{totalPoint}</span>
                     <span className="ms-2 fw-bold">P</span>
                  </h3>
               </div>
            </div>

            {/* ROW 4: CTA(좌) + 이미지(우) 박스 */}
            <div className="row align-items-end mt-40">
               {/* CTA 박스: col-6, 왼쪽에서 시작 */}
               <div className="col-lg-6 offset-lg-1 mb-40">
                  <div className="cta-box text-center">
                     <p className="lead-ask">저희와 함께하시겠어요?</p>

                     <div className="carbon-point__cta mt-40">
                        <Link to="/register" className="btn btn--register">
                           Re:earth 프로젝트 참여하기
                        </Link>
                     </div>

                     <p className="login-text mt-20">
                        회원이신가요?{' '}
                        <Link to="/login" className="login-link">
                           로그인하러 가기
                        </Link>
                     </p>
                  </div>
               </div>

               {/* 이미지 박스: col-4 (그리드 오른쪽 붙음) */}
               <div className="col-lg-4">
                  <div className="image-box">
                     <img src={EarthImage} alt="지구를 두 손으로 감싸 안은 일러스트" className="img-fluid" />
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
