import React, { useState } from 'react';
import AdminTableLayout from '../../../components/layout/AdminTableLayout';

const PointShopContent = () => {
  const columns = ['상품명', '포인트', '재고', '판매량', '등록일', '상태'];
  
  const productData = [
    {
      '상품명': '친환경 칫솔',
      '포인트': '100P',
      '재고': '50개',
      '판매량': '25개',
      '등록일': '2025-01-10',
      '상태': '판매중'
    },
    {
      '상품명': '친환경 수건',
      '포인트': '150P',
      '재고': '30개',
      '판매량': '15개',
      '등록일': '2025-01-09',
      '상태': '판매중'
    },
    {
      '상품명': '태양광 충전기',
      '포인트': '300P',
      '재고': '0개',
      '판매량': '8개',
      '등록일': '2025-01-08',
      '상태': '품절'
    }
  ];

  const filterOptions = {
    status: {
      label: '상태',
      type: 'select',
      options: [
        { value: '판매중', label: '판매중' },
        { value: '품절', label: '품절' },
        { value: '중단', label: '판매중단' }
      ]
    },
    productName: {
      label: '상품명',
      type: 'input',
      placeholder: '상품명을 입력하세요'
    }
  };

  const actionButtons = [
    {
      label: '상품 추가',
      className: 'btn default main1',
      onClick: () => console.log('상품 추가')
    }
  ];

  return (
    <div className="point-shop-content">
      <AdminTableLayout
        title="포인트 샵 관리"
        columns={columns}
        data={productData}
        filterOptions={filterOptions}
        actionButtons={actionButtons}
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log('페이지 변경:', page)}
      />
    </div>
  );
};

export default PointShopContent;
