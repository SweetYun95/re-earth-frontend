import React from 'react';
import './CarbonReductionCard.scss';

const CarbonReductionCard = ({ 
  title = "이달 탄소 절감량",
  description = "나무 3 그루 심은 것과 같은 효과",
  treeCount = 3,
  totalTrees = 5,
  className = ""
}) => {
  return (
    <div className={`carbon-reduction-card ${className}`}>
      <div className="carbon-reduction-card__body">
        <h4 className="carbon-reduction-card__title">{title}</h4>
        <p className="carbon-reduction-card__description">{description}</p>
        <div className="carbon-reduction-card__tree-icons d-flex">
          {Array.from({ length: totalTrees }, (_, i) => i + 1).map((i) => (
            <div 
              key={i} 
              className={`carbon-reduction-card__tree mr-1 ${i <= treeCount ? 'carbon-reduction-card__tree--filled' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <rect width="24" height="24" fill="none"/>
                <path 
                  fill={i <= treeCount ? '#72C63A' : '#E0E0E0'} 
                  d="M11 21v-4.26c-.47.17-.97.26-1.5.26C7 17 5 15 5 12.5c0-1.27.5-2.41 1.36-3.23C6.13 8.73 6 8.13 6 7.5C6 5 8 3 10.5 3c1.56 0 2.94.8 3.75 2h.25a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5q-.75 0-1.5-.21V21z" 
                  strokeWidth="1" 
                  stroke="#000"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarbonReductionCard;
