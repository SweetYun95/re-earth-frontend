import React, { useState } from 'react';
import TableContent from '../layout/TableContent';

const DonationStatusContent = () => {
  const [activeSubTab, setActiveSubTab] = useState('integrated');
  const [currentPage, setCurrentPage] = useState(1);
  
  const subTabs = [
    { id: 'integrated', label: '통합조회' },
    { id: 'approved', label: '승인된 기부' },
    { id: 'pending', label: '미승인 기부' },
    { id: 'receipt', label: '기부영수증' }
  ];

  const columns = ['기부일자', '물품', '수량', '적립예정포인트', '상태', '주문 상세'];
  
  const integratedData = [
    {
      '기부일자': '2025-01-15',
      '물품': '의류',
      '수량': '50개',
      '적립예정포인트': '7,000P',
      '상태': '승인',
      '주문 상세': '자세히 보기'
    },
    {
      '기부일자': '2025-01-14',
      '물품': '의류',
      '수량': '70개',
      '적립예정포인트': '12,000P',
      '상태': '대기',
      '주문 상세': '자세히 보기'
    },
    {
      '기부일자': '2025-01-13',
      '물품': '도서',
      '수량': '30권',
      '적립예정포인트': '5,000P',
      '상태': '승인',
      '주문 상세': '자세히 보기'
    }
  ];

  const approvedData = [
    {
      '기부일자': '2025-01-15',
      '물품': '의류',
      '수량': '50개',
      '적립예정포인트': '7,000P',
      '상태': '승인',
      '주문 상세': '자세히 보기'
    },
    {
      '기부일자': '2025-01-13',
      '물품': '도서',
      '수량': '30권',
      '적립예정포인트': '5,000P',
      '상태': '승인',
      '주문 상세': '자세히 보기'
    }
  ];

  const pendingData = [
    {
      '기부일자': '2025-01-14',
      '물품': '의류',
      '수량': '70개',
      '적립예정포인트': '12,000P',
      '상태': '대기',
      '주문 상세': '자세히 보기'
    },
    {
      '기부일자': '2025-01-12',
      '물품': '전자제품',
      '수량': '5개',
      '적립예정포인트': '8,000P',
      '상태': '대기',
      '주문 상세': '자세히 보기'
    }
  ];

  const receiptData = [
    {
      '기부일자': '2025-01-15',
      '물품': '의류',
      '수량': '50개',
      '적립예정포인트': '7,000P',
      '상태': '영수증 발급완료',
      '주문 상세': '자세히 보기'
    },
    {
      '기부일자': '2025-01-13',
      '물품': '도서',
      '수량': '30권',
      '적립예정포인트': '5,000P',
      '상태': '영수증 발급완료',
      '주문 상세': '자세히 보기'
    }
  ];

  const getCurrentData = () => {
    switch (activeSubTab) {
      case 'integrated': return integratedData;
      case 'approved': return approvedData;
      case 'pending': return pendingData;
      case 'receipt': return receiptData;
      default: return integratedData;
    }
  };

  const handleDetailsClick = (row) => {
    console.log('기부 상세:', row);
    // 상세 모달 또는 페이지로 이동
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= 3) {
      setCurrentPage(page);
    }
  };

  return (
    <TableContent
      title="기부 현황"
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

export default DonationStatusContent;
