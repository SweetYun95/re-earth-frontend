import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.scss';

// 탭 컨텐츠 컴포넌트들
import DashboardContent from '../../components/admin/DashboardContent';
import MemberManagementContent from '../../components/admin/MemberManagementContent';
import PointShopContent from '../../components/admin/PointShopContent';
import DonationManagementContent from '../../components/admin/DonationManagementContent';
import PublicTransportContent from '../../components/admin/PublicTransportContent';
import CommunityManagementContent from '../../components/admin/CommunityManagementContent';
import PartnershipContent from '../../components/admin/PartnershipContent';
import EventManagementContent from '../../components/admin/EventManagementContent';
import CustomerServiceContent from '../../components/admin/CustomerServiceContent';
import SettingsContent from '../../components/admin/SettingsContent';

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'member-management', label: '회원관리', icon: '👥' },
    { id: 'point-shop', label: '포인트 샵', icon: '🛍️' },
    { id: 'donation-management', label: '기부현황', icon: '📦' },
    { id: 'public-transport', label: '대중교통', icon: '🚌' },
    { id: 'community', label: '커뮤니티', icon: '💬' },
    { id: 'partnership', label: '파트너십', icon: '🤝' },
    { id: 'event', label: '이벤트', icon: '🎉' },
    { id: 'customer-service', label: '고객센터', icon: '💬' },
    { id: 'settings', label: '설정', icon: '⚙️' }
  ];

  // 탭별 컨텐츠 렌더링 함수
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'member-management':
        return <MemberManagementContent />;
      case 'point-shop':
        return <PointShopContent />;
      case 'donation-management':
        return <DonationManagementContent />;
      case 'public-transport':
        return <PublicTransportContent />;
      case 'community':
        return <CommunityManagementContent />;
      case 'partnership':
        return <PartnershipContent />;
      case 'event':
        return <EventManagementContent />;
      case 'customer-service':
        return <CustomerServiceContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <div className="row d-flex">
          {/* 사이드바 */}
          <aside className="col-lg-3 col-md-4 admin-page__sidebar">
            <div className='admin-page__sidebar__contents'>
            {/* 프로필 섹션 */}
            <div className="admin-page__profile">
              <div className="admin-page__avatar">
                <img src="/src/assets/icons/profile.png" alt="관리자" />
              </div>
              <span className="admin-page__username">관리자</span>
            </div>

            {/* 탭 메뉴 */}
            <nav className="admin-page__nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`admin-page__nav-item ${activeTab === tab.id ? 'admin-page__nav-item--active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="admin-page__nav-icon">{tab.icon}</span>
                  <span className="admin-page__nav-label">{tab.label}</span>
                </button>
              ))}
            </nav>
            </div>
          </aside>

          {/* 메인 컨텐츠 */}
          <main className="col-lg-9 col-md-8 admin-page__main">
            <div className="admin-page__content">
              {renderTabContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
