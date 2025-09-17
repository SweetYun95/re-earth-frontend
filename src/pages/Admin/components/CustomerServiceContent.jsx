import React from 'react';
import AdminTableLayout from '../../../components/layout/AdminTableLayout';

const CustomerServiceContent = () => {
  const columns = ['문의일', '회원ID', '카테고리', '제목', '상태'];
  
  const inquiryData = [
    {
      '문의일': '2025-01-15',
      '회원ID': 'user001',
      '카테고리': '기부',
      '제목': '기부 승인 문의',
      '상태': '답변완료'
    },
    {
      '문의일': '2025-01-14',
      '회원ID': 'user002',
      '카테고리': '포인트',
      '제목': '포인트 적립 오류',
      '상태': '처리중'
    },
    {
      '문의일': '2025-01-13',
      '회원ID': 'user003',
      '카테고리': '계정',
      '제목': '비밀번호 재설정',
      '상태': '대기'
    }
  ];

  const filterOptions = {
    status: {
      label: '상태',
      type: 'select',
      options: [
        { value: '대기', label: '대기' },
        { value: '처리중', label: '처리중' },
        { value: '답변완료', label: '답변완료' }
      ]
    },
    category: {
      label: '카테고리',
      type: 'select',
      options: [
        { value: '기부', label: '기부' },
        { value: '포인트', label: '포인트' },
        { value: '계정', label: '계정' },
        { value: '기타', label: '기타' }
      ]
    }
  };

  return (
    <AdminTableLayout
      title="고객센터 관리"
      columns={columns}
      data={inquiryData}
      filterOptions={filterOptions}
    />
  );
};

export default CustomerServiceContent;
