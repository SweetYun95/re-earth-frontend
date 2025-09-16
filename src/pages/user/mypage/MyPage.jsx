import React, { useState } from 'react';
import './MyPage.scss';

// 탭 컨텐츠 컴포넌트들
import PointInquiryContent from '../../../components/mypage/PointInquiryContent';
import OrderDeliveryContent from '../../../components/mypage/OrderDeliveryContent';
import DonationStatusContent from '../../../components/mypage/DonationStatusContent';
import CommunityContent from '../../../components/mypage/CommunityContent';
import InquiryContent from '../../../components/mypage/InquiryContent';
import CarbonGraphContent from '../../../components/chat/CarbonGraphContent';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('point-inquiry');

  const tabs = [
    { id: 'point-inquiry', label: '포인트조회' },
    { id: 'order-delivery', label: '주문/배송' },
    { id: 'donation-status', label: '기부 현황' },
    { id: 'community', label: '커뮤니티' },
    { id: 'inquiry', label: '1:1 문의' },
    { id: 'carbon-graph', label: '탄소 절감 그래프' }
  ];

  // 탭별 컨텐츠 렌더링 함수
  const renderTabContent = () => {
    switch (activeTab) {
      case 'point-inquiry':
        return <PointInquiryContent />;
      case 'order-delivery':
        return <OrderDeliveryContent />;
      case 'donation-status':
        return <DonationStatusContent />;
      case 'community':
        return <CommunityContent />;
      case 'inquiry':
        return <InquiryContent />;
      case 'carbon-graph':
        return <CarbonGraphContent />;
      default:
        return <PointInquiryContent />;
    }
  };

  return (
    <div className="mypage">
      <div className="mypage__container">
        {/* 사이드바 */}
        <aside className="mypage__sidebar">
          <div className="mypage__profile">
            <div className="mypage__avatar">
              <img src="/src/assets/icons/profile.png" alt="프로필" />
            </div>
            <div className="mypage__user-info">
              <span className="mypage__username">user name</span>
              <button className="mypage__edit-profile">프로필수정</button>
            </div>
          </div>

          <div className="mypage__sprout">
            <h4>새싹</h4>
            <div className="mypage__progress-bar">
              <div className="mypage__progress-fill"></div>
            </div>
            <p>나무가 되기까지 nnn점</p>
          </div>

          <div className="mypage__practice-count">
            <span>환경보호 실천 건수 15</span>
            <img src="/src/assets/icons/right-line.svg" alt="화살표" />
          </div>

          <div className="mypage__point-balance">
            <h4>포인트 잔액</h4>
            <p className="mypage__point-amount">nn,nnn P</p>
            <button className="btn main1 mypage__collect-points">
              포인트 모으러 가기
              <img src="/src/assets/icons/right-line.svg" alt="화살표" />
            </button>
          </div>

          <div className="mypage__carbon-reduction">
            <h4>이달 탄소 절감량</h4>
            <p>나무 n 그루 심은 것과 같은 효과</p>
            <div className="mypage__tree-icons">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className={`mypage__tree ${i <= 3 ? 'mypage__tree--filled' : ''}`}
                >
                  🌳
                </div>
              ))}
            </div>
          </div>

          <div className="mypage__bottom-links">
            <a href="#" className="mypage__link">보안 설정</a>
            <a href="#" className="mypage__link">로그아웃</a>
          </div>
        </aside>

        {/* 메인 컨텐츠 */}
        <main className="mypage__main">
          {/* 탭 네비게이션 */}
          <nav className="mypage__tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`mypage__tab ${activeTab === tab.id ? 'mypage__tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* 탭 컨텐츠 */}
          <div className="mypage__content">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyPage;

