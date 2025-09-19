import React, { useState } from 'react'
import AdminTableLayout from './common/AdminTableLayout'
import AdminChart from './common/AdminChart'
import TransportDetailModal from '../modal/TransportDetailModal'

const PublicTransportContent = () => {
   const [showDetailModal, setShowDetailModal] = useState(false)
   const [selectedTransport, setSelectedTransport] = useState(null)

   const columns = ['날짜', '회원ID', '이동거리(km)', '포인트 적립', '승인상태']

   const transportData = [
      {
         id: 1,
         날짜: '2025-01-15',
         회원ID: 'user001',
         '이동거리(km)': '15.2km',
         '포인트 적립': '152P',
         승인상태: '완료',
         상세정보: {
            교통수단: '지하철',
            출발지: '강남역',
            도착지: '홍대입구역',
            이용시간: '14:30 - 15:15',
            실제거리: '15.2km',
         },
      },
      {
         id: 2,
         날짜: '2025-01-14',
         회원ID: 'user002',
         '이동거리(km)': '8.7km',
         '포인트 적립': '87P',
         승인상태: '완료',
         상세정보: {
            교통수단: '버스',
            출발지: '신촌역',
            도착지: '여의도역',
            이용시간: '09:20 - 10:05',
            실제거리: '8.7km',
         },
      },
      {
         id: 3,
         날짜: '2025-01-13',
         회원ID: 'user003',
         '이동거리(km)': '12.5km',
         '포인트 적립': '125P',
         승인상태: '대기',
         상세정보: {
            교통수단: '지하철',
            출발지: '잠실역',
            도착지: '종로3가역',
            이용시간: '18:45 - 19:30',
            실제거리: '12.5km',
         },
      },
      {
         id: 4,
         날짜: '2025-01-12',
         회원ID: 'user004',
         '이동거리(km)': '6.3km',
         '포인트 적립': '63P',
         승인상태: '완료',
         상세정보: {
            교통수단: '버스',
            출발지: '건대입구역',
            도착지: '성수역',
            이용시간: '12:15 - 12:45',
            실제거리: '6.3km',
         },
      },
   ]

   // 대중교통 이용률 차트 데이터
   const chartData = {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      datasets: [
         {
            label: '지하철',
            data: [1200, 1350, 1100, 1400, 1600, 1800, 1900, 1750, 1650, 1800, 1950, 2100],
            borderColor: 'var(--point-b)',
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
         },
         {
            label: '버스',
            data: [800, 950, 750, 900, 1100, 1200, 1300, 1150, 1050, 1200, 1350, 1400],
            borderColor: 'var(--maincolor)',
            backgroundColor: 'rgba(139, 195, 74, 0.1)',
         },
      ],
   }

   // 더블클릭 핸들러
   const handleDoubleClick = (transport) => {
      setSelectedTransport(transport)
      setShowDetailModal(true)
   }

   // 일괄 삭제 핸들러
   const handleBulkDelete = (selectedItems) => {
      console.log('대중교통 일괄 삭제:', selectedItems)
   }

   const filterOptions = {
      userId: {
         label: '회원ID',
         type: 'input',
         placeholder: '회원ID를 입력하세요',
      },
      transportType: {
         label: '교통수단',
         type: 'select',
         options: [
            { value: '', label: '전체' },
            { value: '지하철', label: '지하철' },
            { value: '버스', label: '버스' },
            { value: '택시', label: '택시' },
         ],
      },
      distanceRange: {
         label: '이동거리(km)',
         type: 'range',
         placeholder: { min: '최소 거리', max: '최대 거리' },
      },
      userCount: {
         label: '이용자수 범위',
         type: 'range',
         placeholder: { min: '최소 인원', max: '최대 인원' },
      },
      status: {
         label: '승인상태',
         type: 'select',
         options: [
            { value: '', label: '전체' },
            { value: '완료', label: '완료' },
            { value: '대기', label: '대기' },
            { value: '반려', label: '반려' },
         ],
      },
      date: {
         label: '날짜',
         type: 'date',
      },
      pointRange: {
         label: '포인트 범위',
         type: 'range',
         placeholder: { min: '최소 포인트', max: '최대 포인트' },
      },
   }

   return (
      <div className="public-transport-content">
         {/* 대중교통 이용률 차트 */}
         <div className="row mb-4">
            <div className="col-12">
               <div className="dashboard-chart-container">
                  <div className="dashboard-chart-container__header">
                     <h4>
                        이번 달 대중교통 이용률 <span className="text-danger">20% ↑</span>
                     </h4>
                     <p className="text-muted mb-0">전월 대비 20일 증가</p>
                  </div>
                  <AdminChart data={chartData} type="line" height={300} />
               </div>
            </div>
         </div>

         {/* 대중교통 데이터 테이블 */}
         <AdminTableLayout
            title="대중교통 이용 내역"
            columns={columns}
            data={transportData}
            filterOptions={filterOptions}
            currentPage={1}
            totalPages={8}
            onPageChange={(page) => console.log('페이지 변경:', page)}
            enableCheckbox={true}
            enableDoubleClick={true}
            onRowDoubleClick={handleDoubleClick}
            onBulkDelete={handleBulkDelete}
         />

         {/* 대중교통 상세 모달 */}
         <TransportDetailModal
            isOpen={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            transport={selectedTransport}
            onSave={(data) => {
               console.log('대중교통 데이터 저장:', data)
               setShowDetailModal(false)
            }}
         />
      </div>
   )
}

export default PublicTransportContent
