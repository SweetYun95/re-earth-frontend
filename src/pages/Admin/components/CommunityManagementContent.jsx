import React from 'react';
import AdminTableLayout from '../../../components/layout/AdminTableLayout';

const CommunityManagementContent = () => {
  const columns = ['작성일', '작성자', '제목', '조회수', '댓글수', '상태'];
  
  const communityData = [
    {
      '작성일': '2025-01-15',
      '작성자': 'user001',
      '제목': '환경보호 실천 후기',
      '조회수': '156',
      '댓글수': '12',
      '상태': '게시중'
    },
    {
      '작성일': '2025-01-14',
      '작성자': 'user002',
      '제목': '기부 인증 사진',
      '조회수': '89',
      '댓글수': '5',
      '상태': '게시중'
    },
    {
      '작성일': '2025-01-13',
      '작성자': 'user003',
      '제목': '부적절한 내용',
      '조회수': '45',
      '댓글수': '2',
      '상태': '신고접수'
    }
  ];

  const filterOptions = {
    status: {
      label: '상태',
      type: 'select',
      options: [
        { value: '게시중', label: '게시중' },
        { value: '신고접수', label: '신고접수' },
        { value: '블라인드', label: '블라인드' },
        { value: '삭제', label: '삭제' }
      ]
    },
    title: {
      label: '제목',
      type: 'input',
      placeholder: '제목을 입력하세요'
    },
    author: {
      label: '작성자',
      type: 'input',
      placeholder: '작성자를 입력하세요'
    }
  };

  return (
    <AdminTableLayout
      title="커뮤니티 관리"
      columns={columns}
      data={communityData}
      filterOptions={filterOptions}
      currentPage={1}
      totalPages={15}
      onPageChange={(page) => console.log('페이지 변경:', page)}
    />
  );
};

export default CommunityManagementContent;
