// re-earth-frontend/src/components/admin/common/AdminChart.jsx
import './AdminChart.scss'

const AdminChart = ({ data, type = 'line', height = 300 }) => {
   // 실제 프로젝트에서는 Chart.js나 다른 차트 라이브러리 사용
   // 여기서는 시각적 표현을 위한 간단한 구현

   const maxValue = Math.max(...data.datasets.flatMap((dataset) => dataset.data))

   return (
      <div className="admin-chart" style={{ height: `${height}px` }}>
         <div className="admin-chart__container">
            {/* Y축 라벨 */}
            <div className="admin-chart__y-axis">
               {[0, 25, 50, 75, 100].map((value) => (
                  <div key={value} className="admin-chart__y-label">
                     {Math.round((maxValue * value) / 100)}
                  </div>
               ))}
            </div>

            {/* 차트 영역 */}
            <div className="admin-chart__plot-area">
               {/* 그리드 라인 */}
               <div className="admin-chart__grid">
                  {[0, 25, 50, 75, 100].map((value) => (
                     <div key={value} className="admin-chart__grid-line" style={{ bottom: `${value}%` }} />
                  ))}
               </div>

               {/* 데이터 시각화 */}
               <svg className="admin-chart__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {data.datasets.map((dataset, datasetIndex) => (
                     <g key={datasetIndex}>
                        {type === 'line' && <polyline fill="none" stroke={dataset.borderColor} strokeWidth="0.5" points={dataset.data.map((value, index) => `${(index / (dataset.data.length - 1)) * 100},${100 - (value / maxValue) * 100}`).join(' ')} />}

                        {/* 데이터 포인트 */}
                        {dataset.data.map((value, index) => (
                           <circle key={index} cx={(index / (dataset.data.length - 1)) * 100} cy={100 - (value / maxValue) * 100} r="1" fill={dataset.borderColor} className="admin-chart__point" />
                        ))}
                     </g>
                  ))}
               </svg>
            </div>

            {/* X축 라벨 */}
            <div className="admin-chart__x-axis">
               {data.labels.map((label, index) => (
                  <div key={index} className="admin-chart__x-label">
                     {label}
                  </div>
               ))}
            </div>
         </div>

         {/* 범례 */}
         <div className="admin-chart__legend">
            {data.datasets.map((dataset, index) => (
               <div key={index} className="admin-chart__legend-item">
                  <div className="admin-chart__legend-color" style={{ backgroundColor: dataset.borderColor }} />
                  <span className="admin-chart__legend-label">{dataset.label}</span>
               </div>
            ))}
         </div>
      </div>
   )
}

export default AdminChart
