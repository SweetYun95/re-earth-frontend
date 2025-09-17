import React, { useState } from 'react';
import AdminTableLayout from '../../../components/layout/AdminTableLayout';
import BaseModal from '../../../components/modal/BaseModal';
import MemberDetailModal from '../../../components/modal/MemberDetailModal';
import MemberEditModal from '../../../components/modal/MemberEditModal';

const MemberManagementContent = () => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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
    status: {
      label: '상태',
      type: 'select',
      options: [
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
    joinDate: {
      label: '가입일',
      type: 'date'
    }
  };

  const actionButtons = [
    {
      label: '회원 추가',
      className: 'btn default main1',
      onClick: () => setShowEditModal(true)
    },
    {
      label: '엑셀 다운로드',
      className: 'btn default main2',
      onClick: () => console.log('엑셀 다운로드')
    }
  ];

  const handleRowClick = (member) => {
    setSelectedMember(member);
    setShowDetailModal(true);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setShowEditModal(true);
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
      />

      {/* 회원 상세 모달 */}
      <MemberDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        member={selectedMember}
        onEdit={handleEditMember}
      />

      {/* 회원 편집 모달 */}
      <MemberEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        member={selectedMember}
        onSave={(memberData) => {
          console.log('회원 정보 저장:', memberData);
          setShowEditModal(false);
          setSelectedMember(null);
        }}
      />
    </div>
  );
};

export default MemberManagementContent;
