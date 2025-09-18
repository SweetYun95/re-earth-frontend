import React from 'react'
import AdminTableLayout from './common/AdminTableLayout'

const PartnershipContent = () => {
   const columns = ['파트너명', '업종', '계약일', '계약상태', '수수료율']

   const partnerData = [
      {
         파트너명: '슈퍼빈',
         업종: '재활용 기술',
         계약일: '2025-01-10',
         계약상태: '활성',
         수수료율: '5%',
      },
      {
         파트너명: '그린컴퍼니',
         업종: '친환경 제품',
         계약일: '2025-01-05',
         계약상태: '활성',
         수수료율: '3%',
      },
   ]

   const filterOptions = {
      status: {
         label: '계약상태',
         type: 'select',
         options: [
            { value: '활성', label: '활성' },
            { value: '만료', label: '만료' },
            { value: '정지', label: '정지' },
         ],
      },
   }

   return <AdminTableLayout title="파트너십 관리" columns={columns} data={partnerData} filterOptions={filterOptions} />
}

export default PartnershipContent
