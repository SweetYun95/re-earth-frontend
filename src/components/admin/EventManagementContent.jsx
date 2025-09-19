import React, { useState } from 'react';
import AdminTableLayout from './common/AdminTableLayout';
import EventEditModal from '../modal/EventEditModal';

const EventManagementContent = () => {
  const [activeSubTab, setActiveSubTab] = useState('hero-banner');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 서브 탭 목록
  const subTabs = [
    { id: 'hero-banner', label: '히어로 배너 관리', icon: 'mdi:image-frame' },
    { id: 'daily-mission', label: '오늘의 미션 관리', icon: 'mdi:target' }
  ];

  // 히어로 배너 데이터
  const heroBannerData = [
    {
      '배너명': '환경보호 캠페인',
      '제목': '지구를 구하는 작은 실천',
      '부제목': '당신의 작은 행동이 큰 변화를 만듭니다',
      '이미지': 'hero-banner-1.jpg',
      '링크': '/campaign/environment',
      '시작일': '2025-01-01',
      '종료일': '2025-01-31',
      '노출순서': '1',
      '상태': '활성'
    },
    {
      '배너명': '신년 포인트 이벤트',
      '제목': '새해 맞이 특별 혜택',
      '부제목': '포인트 2배 적립 이벤트',
      '이미지': 'hero-banner-2.jpg',
      '링크': '/event/newyear',
      '시작일': '2025-01-01',
      '종료일': '2025-02-28',
      '노출순서': '2',
      '상태': '활성'
    },
    {
      '배너명': '친환경 제품 소개',
      '제목': '지속가능한 라이프스타일',
      '부제목': '친환경 제품으로 시작하는 녹색생활',
      '이미지': 'hero-banner-3.jpg',
      '링크': '/products/eco',
      '시작일': '2024-12-01',
      '종료일': '2025-03-31',
      '노출순서': '3',
      '상태': '비활성'
    }
  ];

  // 오늘의 미션 데이터
  const dailyMissionData = [
    {
      '미션명': '대중교통 이용하기',
      '설명': '오늘 대중교통을 이용해보세요',
      '포인트': '50P',
      '미션타입': '대중교통',
      '달성조건': '1회 이상 대중교통 이용',
      '제한시간': '24시간',
      '생성일': '2025-01-15',
      '상태': '활성'
    },
    {
      '미션명': '환경 게시글 작성',
      '설명': '환경보호에 대한 생각을 공유해보세요',
      '포인트': '100P',
      '미션타입': '커뮤니티',
      '달성조건': '게시글 1개 작성',
      '제한시간': '24시간',
      '생성일': '2025-01-15',
      '상태': '활성'
    },
    {
      '미션명': '친환경 제품 구매',
      '설명': '포인트샵에서 친환경 제품을 구매해보세요',
      '포인트': '200P',
      '미션타입': '구매',
      '달성조건': '친환경 제품 1개 구매',
      '제한시간': '24시간',
      '생성일': '2025-01-14',
      '상태': '비활성'
    },
    {
      '미션명': '기부 참여하기',
      '설명': '환경단체에 기부해보세요',
      '포인트': '300P',
      '미션타입': '기부',
      '달성조건': '1,000원 이상 기부',
      '제한시간': '24시간',
      '생성일': '2025-01-13',
      '상태': '활성'
    }
  ];

  // 서브탭별 컬럼 설정
  const getColumns = () => {
    switch (activeSubTab) {
      case 'hero-banner':
        return ['배너명', '제목', '이미지', '시작일', '종료일', '노출순서', '상태'];
      case 'daily-mission':
        return ['미션명', '포인트', '미션타입', '달성조건', '제한시간', '생성일', '상태'];
      default:
        return [];
    }
  };

  // 서브탭별 데이터 설정
  const getData = () => {
    switch (activeSubTab) {
      case 'hero-banner':
        return heroBannerData;
      case 'daily-mission':
        return dailyMissionData;
      default:
        return [];
    }
  };

  // 서브탭별 필터 옵션
  const getFilterOptions = () => {
    switch (activeSubTab) {
      case 'hero-banner':
        return {
          status: {
            label: '상태',
            type: 'select',
            options: [
              { value: '', label: '전체' },
              { value: '활성', label: '활성' },
              { value: '비활성', label: '비활성' },
              { value: '예약', label: '예약' }
            ]
          },
          bannerName: {
            label: '배너명',
            type: 'input',
            placeholder: '배너명을 입력하세요'
          },
          title: {
            label: '제목',
            type: 'input',
            placeholder: '제목을 입력하세요'
          },
          dateRange: {
            label: '노출기간',
            type: 'daterange'
          },
          orderRange: {
            label: '노출순서',
            type: 'range',
            placeholder: { min: '최소 순서', max: '최대 순서' }
          }
        };
      case 'daily-mission':
        return {
          missionType: {
            label: '미션타입',
            type: 'select',
            options: [
              { value: '', label: '전체' },
              { value: '대중교통', label: '대중교통' },
              { value: '커뮤니티', label: '커뮤니티' },
              { value: '구매', label: '구매' },
              { value: '기부', label: '기부' },
              { value: '인증', label: '인증' }
            ]
          },
          status: {
            label: '상태',
            type: 'select',
            options: [
              { value: '', label: '전체' },
              { value: '활성', label: '활성' },
              { value: '비활성', label: '비활성' },
              { value: '임시저장', label: '임시저장' }
            ]
          },
          missionName: {
            label: '미션명',
            type: 'input',
            placeholder: '미션명을 입력하세요'
          },
          pointRange: {
            label: '포인트 범위',
            type: 'range',
            placeholder: { min: '최소 포인트', max: '최대 포인트' }
          },
          dateRange: {
            label: '생성일',
            type: 'daterange'
          }
        };
      default:
        return {};
    }
  };

  // 서브탭별 액션 버튼
  const getActionButtons = () => {
    switch (activeSubTab) {
      case 'hero-banner':
        return [
          {
            label: '배너 추가',
            className: 'btn default main1',
            onClick: () => console.log('배너 추가')
          },
          {
            label: '순서 변경',
            className: 'btn default main2',
            onClick: () => console.log('순서 변경')
          },
          {
            label: '일괄 비활성화',
            className: 'btn default main3',
            onClick: () => console.log('일괄 비활성화')
          }
        ];
      case 'daily-mission':
        return [
          {
            label: '미션 추가',
            className: 'btn default main1',
            onClick: () => console.log('미션 추가')
          },
          {
            label: '미션 템플릿',
            className: 'btn default main2',
            onClick: () => console.log('미션 템플릿')
          },
          {
            label: '일괄 활성화',
            className: 'btn default main1',
            onClick: () => console.log('일괄 활성화')
          },
          {
            label: '일괄 비활성화',
            className: 'btn default main3',
            onClick: () => console.log('일괄 비활성화')
          }
        ];
      default:
        return [];
    }
  };

  // 더블클릭 핸들러
  const handleDoubleClick = (item) => {
    setSelectedEvent(item);
    setShowEditModal(true);
  };

  // 일괄 삭제 핸들러
  const handleBulkDelete = (selectedItems) => {
    console.log('일괄 삭제:', selectedItems);
  };

  return (
    <div className="event-management">
      {/* 서브 탭 네비게이션 */}
      <div className="sub-tabs mb-4">
        <div className="d-flex flex-wrap gap-2">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              className={`btn ${activeSubTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveSubTab(tab.id)}
            >
              <iconify-icon icon={tab.icon} className="me-2"></iconify-icon>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 서브탭별 컨텐츠 */}
      <AdminTableLayout
        title={subTabs.find(tab => tab.id === activeSubTab)?.label || '이벤트 관리'}
        columns={getColumns()}
        data={getData()}
        filterOptions={getFilterOptions()}
        actionButtons={getActionButtons()}
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log('페이지 변경:', page)}
        enableCheckbox={true}
        enableDoubleClick={true}
        onRowDoubleClick={handleDoubleClick}
        onBulkDelete={handleBulkDelete}
      />

      {/* 이벤트 편집 모달 */}
      <EventEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        event={selectedEvent}
        type={activeSubTab === 'hero-banner' ? 'banner' : 'mission'}
        onSave={(data) => {
          console.log('이벤트 저장:', data);
          setShowEditModal(false);
        }}
      />
    </div>
  );
};

export default EventManagementContent;