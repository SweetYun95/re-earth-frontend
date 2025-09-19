import React, { useState } from 'react';
import AdminTableLayout from './common/AdminTableLayout';
import MemberManagementModal from '../modal/MemberManagementModal';

const MemberManagementContent = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const columns = ['회원ID', '이름', '이메일', '가입일', '포인트', '상태'];
  
  const memberData = [
    {
      '회원ID': 'user001',
      '이름': '홍길동',
      '이메일': 'hong@example.com',
      '가입일': '2025-01-15',
      '포인트': '1,500P',
      '상태': '활성'
    },
    {
      '회원ID': 'user002',
      '이름': '김철수',
      '이메일': 'kim@example.com',
      '가입일': '2025-01-14',
      '포인트': '2,300P',
      '상태': '활성'
    },
    {
      '회원ID': 'user003',
      '이름': '이영희',
      '이메일': 'lee@example.com',
      '가입일': '2025-01-13',
      '포인트': '890P',
      '상태': '비활성'
    }
  ];

  const filterOptions = {
    userId: {
      label: '회원ID',
      type: 'input',
      placeholder: '회원ID를 입력하세요'
    },
    status: {
      label: '상태',
      type: 'select',
      options: [
        { value: '', label: '전체' },
        { value: '활성', label: '활성' },
        { value: '비활성', label: '비활성' },
        { value: '정지', label: '정지' }
      ]
    },
    name: {
      label: '이름',
      type: 'input',
      placeholder: '이름을 입력하세요'
    },
    email: {
      label: '이메일',
      type: 'input',
      placeholder: '이메일을 입력하세요'
    },
    joinDate: {
      label: '가입일',
      type: 'date'
    },
    pointRange: {
      label: '포인트 범위',
      type: 'range',
      placeholder: { min: '최소 포인트', max: '최대 포인트' }
    }
  };

  const actionButtons = [
    {
      label: '회원 추가',
      className: 'btn default main1',
      onClick: () => console.log('회원 추가')
    },
    {
      label: '엑셀 다운로드',
      className: 'btn default main2',
      onClick: () => console.log('엑셀 다운로드')
    }
  ];

  const handleRowClick = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleDoubleClick = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  // 일괄 삭제 핸들러
  const handleBulkDelete = (selectedItems) => {
    console.log('회원 일괄 삭제:', selectedItems);
  };

  const handleSave = (formData) => {
    console.log('회원 정보 저장:', formData);
    alert('회원 정보가 저장되었습니다.');
  };

  return (
    <div className="member-management">
      <AdminTableLayout
        title="회원관리"
        columns={columns}
        data={memberData}
        onRowClick={handleRowClick}
        filterOptions={filterOptions}
        actionButtons={actionButtons}
        currentPage={1}
        totalPages={5}
        onPageChange={(page) => console.log('페이지 변경:', page)}
        enableCheckbox={true}
        enableDoubleClick={true}
        onRowDoubleClick={handleDoubleClick}
        onBulkDelete={handleBulkDelete}
      />

      {/* 회원 관리 통합 모달 */}
      <MemberManagementModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        member={selectedMember}
        onSave={handleSave}
      />
    </div>
  );
};

export default MemberManagementContent;
