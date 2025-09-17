import React, { useState } from 'react';
import TableContent from '../layout/TableContent';

const PointInquiryContent = () => {
  const [activeSubTab, setActiveSubTab] = useState('bike');
  const [currentPage, setCurrentPage] = useState(1);
  
  const subTabs = [
    { id: 'bike', label: '따릉이' },
    { id: 'public-transport', label: '대중교통 이용' },
    { id: 'recycling', label: '분리수거 이용' },
    { id: 'tumbler', label: '텀블러 인증' }
  ];

  const columns = ['날짜', '내용', '포인트', '잔액', '상세'];
  
  const bikeData = [
    {
      '날짜': '2025-01-15',
      '내용': '따릉이 이용 (30분)',
      '포인트': '+100P',
      '잔액': '15,500P',
      '상세': '자세히 보기'
    },
    {
      '날짜': '2025-01-14',
      '내용': '따릉이 이용 (45분)',
      '포인트': '+150P',
      '잔액': '15,400P',
      '상세': '자세히 보기'
    }
  ];

  const publicTransportData = [
    {
      '날짜': '2025-01-15',
      '내용': '지하철 이용',
      '포인트': '+50P',
      '잔액': '15,450P',
      '상세': '자세히 보기'
    },
    {
      '날짜': '2025-01-14',
      '내용': '버스 이용',
      '포인트': '+50P',
      '잔액': '15,400P',
      '상세': '자세히 보기'
    }
  ];

  const recyclingData = [
    {
      '날짜': '2025-01-15',
      '내용': '플라스틱 분리수거',
      '포인트': '+200P',
      '잔액': '15,350P',
      '상세': '자세히 보기'
    },
    {
      '날짜': '2025-01-14',
      '내용': '종이 분리수거',
      '포인트': '+150P',
      '잔액': '15,150P',
      '상세': '자세히 보기'
    }
  ];

  const tumblerData = [
    {
      '날짜': '2025-01-15',
      '내용': '텀블러 사용 인증',
      '포인트': '+300P',
      '잔액': '15,000P',
      '상세': '자세히 보기'
    },
    {
      '날짜': '2025-01-14',
      '내용': '텀블러 사용 인증',
      '포인트': '+300P',
      '잔액': '14,700P',
      '상세': '자세히 보기'
    }
  ];

  const getCurrentData = () => {
    switch (activeSubTab) {
      case 'bike': return bikeData;
      case 'public-transport': return publicTransportData;
      case 'recycling': return recyclingData;
      case 'tumbler': return tumblerData;
      default: return bikeData;
    }
  };

  const handleDetailsClick = (row) => {
    console.log('포인트 상세:', row);
    // 상세 모달 또는 페이지로 이동
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= 3) {
      setCurrentPage(page);
    }
  };

  return (
    <TableContent
      title="포인트 입출금내역"
      subTabs={subTabs}
      activeSubTab={activeSubTab}
      onSubTabChange={setActiveSubTab}
      columns={columns}
      data={getCurrentData()}
      onDetailsClick={handleDetailsClick}
      currentPage={currentPage}
      totalPages={3}
      onPageChange={handlePageChange}
    />
  );
};

export default PointInquiryContent;
