import React, { useState } from 'react';
import TableContent from '../layout/TableContent';

const OrderDeliveryContent = () => {
  const [activeSubTab, setActiveSubTab] = useState('point-shop');
  const [currentPage, setCurrentPage] = useState(1);
  
  const subTabs = [
    { id: 'point-shop', label: '포인트 샵' },
    { id: 'anabada-market', label: '아나바다 장터' }
  ];

  const columns = ['주문일자', '상품', '결제 금액', '상태', '주문 상세'];
  
  const pointShopData = [
    {
      '주문일자': '2025-01-15',
      '상품': '친환경 칫솔',
      '결제 금액': '7,000P',
      '상태': '배송 중',
      '주문 상세': '자세히 보기'
    },
    {
      '주문일자': '2025-01-14',
      '상품': '리사이클 에코백',
      '결제 금액': '12,000P',
      '상태': '결제 완료',
      '주문 상세': '자세히 보기'
    }
  ];

  const anabadaData = [
    {
      '주문일자': '2025-01-13',
      '상품': '중고 책상',
      '결제 금액': '25,000원',
      '상태': '거래 완료',
      '주문 상세': '자세히 보기'
    },
    {
      '주문일자': '2025-01-12',
      '상품': '재활용 가방',
      '결제 금액': '8,000원',
      '상태': '배송 완료',
      '주문 상세': '자세히 보기'
    }
  ];

  const currentData = activeSubTab === 'point-shop' ? pointShopData : anabadaData;

  const handleDetailsClick = (row) => {
    console.log('주문 상세:', row);
    // 상세 모달 또는 페이지로 이동
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= 3) {
      setCurrentPage(page);
    }
  };

  return (
    <TableContent
      title="주문/배송"
      subTabs={subTabs}
      activeSubTab={activeSubTab}
      onSubTabChange={setActiveSubTab}
      columns={columns}
      data={currentData}
      onDetailsClick={handleDetailsClick}
      currentPage={currentPage}
      totalPages={3}
      onPageChange={handlePageChange}
    />
  );
};

export default OrderDeliveryContent;
