import React from 'react';
import AdminTableLayout from './common/AdminTableLayout';
import AdminChart from './common/AdminChart';

const PublicTransportContent = () => {
  const columns = ['날짜', '노선', '이용자수', '포인트 적립', '승인상태'];
  
  const transportData = [
    {
      '날짜': '2025-01-15',
      '노선': '지하철 1호선',
      '이용자수': '1,234명',
      '포인트 적립': '12,340P',
      '승인상태': '완료'
    },
    {
      '날짜': '2025-01-14',
      '노선': '버스 101번',
      '이용자수': '567명',
      '포인트 적립': '5,670P',
      '승인상태': '완료'
    },
    {
      '날짜': '2025-01-13',
      '노선': '지하철 2호선',
      '이용자수': '890명',
      '포인트 적립': '8,900P',
      '승인상태': '대기'
    }
  ];

  // 대중교통 이용률 차트 데이터
  const chartData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    datasets: [
      {
        label: '지하철',
        data: [1200, 1350, 1100, 1400, 1600, 1800, 1900, 1750, 1650, 1800, 1950, 2100],
        borderColor: 'var(--point-b)',
        backgroundColor: 'rgba(33, 150, 243, 0.1)'
      },
      {
        label: '버스',
        data: [800, 950, 750, 900, 1100, 1200, 1300, 1150, 1050, 1200, 1350, 1400],
        borderColor: 'var(--maincolor)',
        backgroundColor: 'rgba(139, 195, 74, 0.1)'
      }
    ]
  };

  const filterOptions = {
    route: {
      label: '노선',
      type: 'input',
      placeholder: '노선을 입력하세요'
    },
    status: {
      label: '승인상태',
      type: 'select',
      options: [
        { value: '완료', label: '완료' },
        { value: '대기', label: '대기' },
        { value: '반려', label: '반려' }
      ]
    },
    date: {
      label: '날짜',
      type: 'date'
    }
  };

  return (
    <div className="public-transport-content">
      {/* 대중교통 이용률 차트 */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="dashboard-chart-container">
            <div className="dashboard-chart-container__header">
              <h4>이번 달 대중교통 이용률 <span className="text-danger">20% ↑</span></h4>
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
      />
    </div>
  );
};

export default PublicTransportContent;
