import React from 'react';
import './CarbonGraphContent.scss';

const CarbonGraphContent = () => {
  // 간단한 탄소 절감 그래프 데이터
  const monthlyData = [
    { month: '1월', reduction: 25 },
    { month: '2월', reduction: 30 },
    { month: '3월', reduction: 22 },
    { month: '4월', reduction: 35 },
    { month: '5월', reduction: 28 },
    { month: '6월', reduction: 40 }
  ];

  const maxReduction = Math.max(...monthlyData.map(d => d.reduction));

  return (
    <div className="carbon-graph-content">
      <h2 className="carbon-graph-content__title">탄소 절감 그래프</h2>
      
      <div className="carbon-graph-content__stats">
        <div className="carbon-graph-content__stat-card">
          <h3>이번 달 절감량</h3>
          <p className="carbon-graph-content__stat-value">40kg</p>
          <p className="carbon-graph-content__stat-desc">나무 2그루 심은 효과</p>
        </div>
        
        <div className="carbon-graph-content__stat-card">
          <h3>누적 절감량</h3>
          <p className="carbon-graph-content__stat-value">180kg</p>
          <p className="carbon-graph-content__stat-desc">나무 9그루 심은 효과</p>
        </div>
      </div>

      <div className="carbon-graph-content__chart">
        <h3>월별 탄소 절감량</h3>
        <div className="carbon-graph-content__bars">
          {monthlyData.map((data, index) => (
            <div key={index} className="carbon-graph-content__bar-container">
              <div 
                className="carbon-graph-content__bar"
                style={{ 
                  height: `${(data.reduction / maxReduction) * 200}px`,
                  backgroundColor: data.reduction === maxReduction ? 'var(--subcolor-d)' : 'var(--maincolor)'
                }}
              >
                <span className="carbon-graph-content__bar-value">{data.reduction}kg</span>
              </div>
              <span className="carbon-graph-content__bar-label">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="carbon-graph-content__achievements">
        <h3>환경 실천 달성 현황</h3>
        <div className="carbon-graph-content__achievement-list">
          <div className="carbon-graph-content__achievement">
            <span className="carbon-graph-content__achievement-icon">🚲</span>
            <span>자전거 이용: 15일</span>
          </div>
          <div className="carbon-graph-content__achievement">
            <span className="carbon-graph-content__achievement-icon">♻️</span>
            <span>재활용: 25회</span>
          </div>
          <div className="carbon-graph-content__achievement">
            <span className="carbon-graph-content__achievement-icon">🌱</span>
            <span>친환경 제품 구매: 8회</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonGraphContent;
