// re-earth-frontend/src/pages/user/Donate/DonationInfoPage.jsx
import { useNavigate } from 'react-router-dom'
import donateImg from '../../../assets/images/re-earth_donation_bannerCard.png'
import './donationInfo.scss'

export default function DonationInfoPage() {
   const navigate = useNavigate()
   const goDonate = () => navigate('/donate')

   return (
      <section className="donation-info">
         {/* Hero 섹션 */}
         <div className="jumbotron jumbotron-fluid bg-light text-left mb-0">
            <div className="container">
               <h2 className="display-5 font-weight-bold">기부하기</h2>
               <p className="lead">Re:Wear(헌옷 기부하기)</p>
               <p className="hashtags text-muted">#recycling #헌옷기부 #환경보호 #탄소중립실천</p>
               <div className="arrow-down text-center mt-3">↓</div>
            </div>
         </div>

         {/* 기부 안내 섹션 */}
         <div className="container py-5">
            <h3 className="mb-4">기부안내</h3>
            <div className="row align-items-center bg-white shadow-sm rounded p-4">
               {/* 이미지 */}
               <div className="col-md-6 mb-3 mb-md-0">
                  <img src={donateImg} alt="기부 박스" className="img-fluid rounded" />
               </div>

               {/* 텍스트 */}
               <div className="col-md-6">
                  <h5 className="font-weight-bold mb-2">Re:Wear Project (리:웨어 프로젝트)</h5>
                  <p className="text-muted">헌옷 기부 프로젝트</p>
                  <blockquote className="font-italic font-weight-bold mt-4">“입던 옷, 다시 지구를 위한 가치로”</blockquote>
                  <p className="mt-3">
                     사용자는 옷을 기부하기만 하면 포인트가 자동 적립됩니다.
                     <br />
                     적립된 포인트는 기부, 친환경 쇼핑, 다양한 혜택으로 이어져 일상 속에서 탄소중립을 실천하는 선순환 구조를 완성합니다.
                  </p>

                  <button type="button" className="btn btn-success mt-4 d-inline-flex align-items-center" onClick={goDonate}>
                     기부하러가기
                     <img
                        src="/icons/recycle-box.png" // 실제 아이콘 경로 교체
                        alt="기부 아이콘"
                        className="ml-2"
                        style={{ width: 32, height: 32 }}
                     />
                  </button>
               </div>
            </div>
         </div>
      </section>
   )
}
