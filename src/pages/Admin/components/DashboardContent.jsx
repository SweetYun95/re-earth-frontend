import React from 'react';
import AdminChart from '../../../components/layout/AdminChart';

const DashboardContent = () => {
  // 대시보드 통계 데이터
  const stats = [
    { title: '총 회원수', value: '1,234', change: '+5.2%', changeType: 'increase' },
    { title: '이번 달 기부 건수', value: '456', change: '+12.3%', changeType: 'increase' },
    { title: '포인트 적립량', value: '789,123 P', change: '+8.7%', changeType: 'increase' },
    { title: '탄소 절감량', value: '12.5 톤', change: '+15.4%', changeType: 'increase' }
  ];

  // 차트 데이터 (예시)
  const chartData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    datasets: [
      {
        label: '회원 가입',
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
        borderColor: 'var(--maincolor)',
        backgroundColor: 'rgba(139, 195, 74, 0.1)',
        tension: 0.4
      },
      {
        label: '기부 건수',
        data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86],
        borderColor: 'var(--point-b)',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        tension: 0.4
      }
    ]
  };

  return (
    <div className="dashboard-content">
      {/* 페이지 헤더 */}
      <div className="dashboard-content__header mb-4">
        <h1 className="dashboard-content__title">대시보드</h1>
        <p className="dashboard-content__subtitle text-muted">
          이번 달 대중교통 사용률 <span className="text-danger font-weight-bold">20% ↑</span>
        </p>
      </div>

      {/* 통계 카드들 */}
      <div className="row mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-lg-3 col-md-6 mb-3">
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-card__body">
                <h6 className="dashboard-stat-card__title">{stat.title}</h6>
                <h3 className="dashboard-stat-card__value">{stat.value}</h3>
                <span className={`dashboard-stat-card__change dashboard-stat-card__change--${stat.changeType}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 차트 섹션 */}
      <div className="row">
        <div className="col-12">
          <div className="dashboard-chart-container">
            <div className="dashboard-chart-container__header">
              <h4>월별 통계</h4>
              <div className="dashboard-chart-container__controls">
                <select className="form-control form-control-sm">
                  <option>2025년</option>
                  <option>2024년</option>
                </select>
              </div>
            </div>
            <AdminChart data={chartData} type="line" />
          </div>
        </div>
      </div>

      {/* 최근 활동 */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="dashboard-activity-card">
            <h5 className="dashboard-activity-card__title">최근 회원 가입</h5>
            <div className="dashboard-activity-card__list">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="dashboard-activity-item">
                  <div className="dashboard-activity-item__avatar">
                    <img src="/src/assets/icons/profile.png" alt="사용자" />
                  </div>
                  <div className="dashboard-activity-item__info">
                    <span className="dashboard-activity-item__name">사용자{item}</span>
                    <span className="dashboard-activity-item__time">방금 전</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="dashboard-activity-card">
            <h5 className="dashboard-activity-card__title">최근 기부 현황</h5>
            <div className="dashboard-activity-card__list">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="dashboard-activity-item">
                  <div className="dashboard-activity-item__icon">📦</div>
                  <div className="dashboard-activity-item__info">
                    <span className="dashboard-activity-item__name">의류 {item * 10}개</span>
                    <span className="dashboard-activity-item__time">{item}시간 전</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
