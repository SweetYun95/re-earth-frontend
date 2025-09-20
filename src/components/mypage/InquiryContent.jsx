import React, { useState } from 'react';
import TableContent from '../layout/TableContent';

const InquiryContent = () => {
  const [activeSubTab, setActiveSubTab] = useState('integrated');
  const [currentPage, setCurrentPage] = useState(1);
  
  const subTabs = [
    { id: 'integrated', label: '통합문의' },
    { id: 'pending', label: '답변대기' },
    { id: 'completed', label: '답변완료' },
    { id: 'new', label: '새 문의작성' }
  ];

  const columns = ['날짜', '제목', '상태'];
  
  const integratedData = [
    {
      '날짜': '2025-01-15',
      '제목': '게시글 1 예시 텍스트입니다.',
      '상태': '답변완료'
    },
    {
      '날짜': '2025-01-14',
      '제목': '게시글 2 예시 텍스트입니다.',
      '상태': '확인 중'
    },
    {
      '날짜': '2025-01-13',
      '제목': '포인트 적립 문의',
      '상태': '답변완료'
    }
  ];

  const pendingData = [
    {
      '날짜': '2025-01-14',
      '제목': '게시글 2 예시 텍스트입니다.',
      '상태': '확인 중'
    },
    {
      '날짜': '2025-01-12',
      '제목': '배송 관련 문의',
      '상태': '처리중'
    }
  ];

  const completedData = [
    {
      '날짜': '2025-01-15',
      '제목': '게시글 1 예시 텍스트입니다.',
      '상태': '답변완료'
    },
    {
      '날짜': '2025-01-13',
      '제목': '포인트 적립 문의',
      '상태': '답변완료'
    },
    {
      '날짜': '2025-01-11',
      '제목': '계정 관련 문의',
      '상태': '답변완료'
    }
  ];

  const newData = [
    {
      '날짜': '-',
      '제목': '새로운 문의를 작성해보세요',
      '상태': '작성하기'
    }
  ];

  const getCurrentData = () => {
    switch (activeSubTab) {
      case 'integrated': return integratedData;
      case 'pending': return pendingData;
      case 'completed': return completedData;
      case 'new': return newData;
      default: return integratedData;
    }
  };

  const handleDetailsClick = (row) => {
    console.log('문의 상세:', row);
    // 상세 모달 또는 페이지로 이동
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= 3) {
      setCurrentPage(page);
    }
  };

  return (
    <TableContent
      title="1:1 문의"
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

export default InquiryContent;
