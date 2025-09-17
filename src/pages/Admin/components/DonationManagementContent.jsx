import React from 'react';
import AdminTableLayout from '../../../components/layout/AdminTableLayout';

const DonationManagementContent = () => {
  const columns = ['기부일자', '회원ID', '물품', '수량', '포인트', '상태'];
  
  const donationData = [
    {
      '기부일자': '2025-01-15',
      '회원ID': 'user001',
      '물품': '의류',
      '수량': '5kg',
      '포인트': '500P',
      '상태': '승인완료'
    },
    {
      '기부일자': '2025-01-14',
      '회원ID': 'user002',
      '물품': '도서',
      '수량': '10권',
      '포인트': '300P',
      '상태': '검토중'
    },
    {
      '기부일자': '2025-01-13',
      '회원ID': 'user003',
      '물품': '전자제품',
      '수량': '2개',
      '포인트': '800P',
      '상태': '승인대기'
    }
  ];

  const filterOptions = {
    status: {
      label: '상태',
      type: 'select',
      options: [
        { value: '승인완료', label: '승인완료' },
        { value: '검토중', label: '검토중' },
        { value: '승인대기', label: '승인대기' },
        { value: '반려', label: '반려' }
      ]
    },
    item: {
      label: '물품',
      type: 'select',
      options: [
        { value: '의류', label: '의류' },
        { value: '도서', label: '도서' },
        { value: '전자제품', label: '전자제품' },
        { value: '가구', label: '가구' }
      ]
    },
    donationDate: {
      label: '기부일자',
      type: 'date'
    }
  };

  return (
    <div className="donation-management">
      <AdminTableLayout
        title="기부 현황 관리"
        columns={columns}
        data={donationData}
        filterOptions={filterOptions}
        currentPage={1}
        totalPages={10}
        onPageChange={(page) => console.log('페이지 변경:', page)}
      />
    </div>
  );
};

export default DonationManagementContent;
