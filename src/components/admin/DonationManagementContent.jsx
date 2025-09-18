import React, { useState } from 'react';
import AdminTableLayout from './common/AdminTableLayout';
import DonationDetailModal from '../modal/DonationDetailModal';

const DonationManagementContent = () => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  const columns = ['신청일자', '회원ID', '헌옷 수량', '포인트', '상태', '승인일자'];
  
  const donationData = [
    {
      id: 1,
      '신청일자': '2025-01-15',
      '회원ID': 'user001',
      '헌옷 수량': '5kg',
      '포인트': '500P',
      '상태': '승인완료',
      '승인일자': '2025-01-15',
      '수거일자': '2025-01-16',
      '검수일자': '2025-01-17'
    },
    {
      id: 2,
      '신청일자': '2025-01-14',
      '회원ID': 'user002',
      '헌옷 수량': '3kg',
      '포인트': '300P',
      '상태': '검토중',
      '승인일자': '',
      '수거일자': '2025-01-15',
      '검수일자': ''
    },
    {
      id: 3,
      '신청일자': '2025-01-13',
      '회원ID': 'user003',
      '헌옷 수량': '8kg',
      '포인트': '800P',
      '상태': '승인대기',
      '승인일자': '',
      '수거일자': '2025-01-14',
      '검수일자': ''
    },
    {
      id: 4,
      '신청일자': '2025-01-12',
      '회원ID': 'user004',
      '헌옷 수량': '12kg',
      '포인트': '1200P',
      '상태': '승인완료',
      '승인일자': '2025-01-13',
      '수거일자': '2025-01-13',
      '검수일자': '2025-01-14'
    },
    {
      id: 5,
      '신청일자': '2025-01-11',
      '회원ID': 'user005',
      '헌옷 수량': '2kg',
      '포인트': '200P',
      '상태': '반려',
      '승인일자': '',
      '수거일자': '',
      '검수일자': ''
    }
  ];

  const filterOptions = {
    status: {
      label: '상태',
      type: 'select',
      options: [
        { value: '', label: '전체' },
        { value: '승인완료', label: '승인완료' },
        { value: '검토중', label: '검토중' },
        { value: '승인대기', label: '승인대기' },
        { value: '반려', label: '반려' },
        { value: '취소', label: '취소' }
      ]
    },
    userId: {
      label: '회원ID',
      type: 'input',
      placeholder: '회원ID를 입력하세요'
    },
    weightRange: {
      label: '헌옷 수량(kg)',
      type: 'range',
      placeholder: { min: '최소 무게', max: '최대 무게' }
    },
    pointRange: {
      label: '포인트 범위',
      type: 'range',
      placeholder: { min: '최소 포인트', max: '최대 포인트' }
    },
    applicationDateRange: {
      label: '신청일자',
      type: 'daterange'
    },
    approvalDateRange: {
      label: '승인일자',
      type: 'daterange'
    },
    collectionDateRange: {
      label: '수거일자',
      type: 'daterange'
    },
    inspectionDateRange: {
      label: '검수일자',
      type: 'daterange'
    }
  };

  const actionButtons = [
    {
      label: '일괄 승인',
      className: 'btn default main1',
      onClick: () => console.log('일괄 승인')
    },
    {
      label: '일괄 반려',
      className: 'btn default main3',
      onClick: () => console.log('일괄 반려')
    },
    {
      label: '기부 통계',
      className: 'btn btn-info',
      onClick: () => console.log('기부 통계')
    },
    {
      label: '엑셀 다운로드',
      className: 'btn btn-success',
      onClick: () => console.log('엑셀 다운로드')
    }
  ];

  // 더블클릭 핸들러
  const handleDoubleClick = (donation) => {
    setSelectedDonation(donation);
    setShowDetailModal(true);
  };

  // 일괄 삭제 핸들러
  const handleBulkDelete = (selectedItems) => {
    console.log('기부 일괄 삭제:', selectedItems);
  };

  return (
    <div className="donation-management">
      <AdminTableLayout
        title="헌옷 기부 현황 관리"
        columns={columns}
        data={donationData}
        filterOptions={filterOptions}
        actionButtons={actionButtons}
        currentPage={1}
        totalPages={10}
        onPageChange={(page) => console.log('페이지 변경:', page)}
        enableCheckbox={true}
        enableDoubleClick={true}
        onRowDoubleClick={handleDoubleClick}
        onBulkDelete={handleBulkDelete}
      />

      {/* 헌옷 기부 상세 모달 */}
      <DonationDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        donation={selectedDonation}
        onApprove={(donation, manager) => {
          console.log('승인:', donation, '담당자:', manager);
          setShowDetailModal(false);
        }}
        onReject={(donation) => {
          console.log('반려:', donation);
          setShowDetailModal(false);
        }}
      />
    </div>
  );
};

export default DonationManagementContent;
