import React from 'react';
import AdminTableLayout from './common/AdminTableLayout';

const EventManagementContent = () => {
  const columns = ['이벤트명', '시작일', '종료일', '참여자수', '상태'];
  
  const eventData = [
    {
      '이벤트명': '신년 기부 이벤트',
      '시작일': '2025-01-01',
      '종료일': '2025-01-31',
      '참여자수': '234명',
      '상태': '진행중'
    },
    {
      '이벤트명': '대중교통 챌린지',
      '시작일': '2025-01-15',
      '종료일': '2025-02-15',
      '참여자수': '156명',
      '상태': '진행중'
    }
  ];

  const filterOptions = {
    status: {
      label: '상태',
      type: 'select',
      options: [
        { value: '진행중', label: '진행중' },
        { value: '예정', label: '예정' },
        { value: '종료', label: '종료' }
      ]
    }
  };

  return (
    <AdminTableLayout
      title="이벤트 관리"
      columns={columns}
      data={eventData}
      filterOptions={filterOptions}
    />
  );
};

export default EventManagementContent;
