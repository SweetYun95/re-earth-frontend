import React from 'react';
import './PointShop.scss';

const ITEMS = [
  { 
    name: '친환경 칫솔', 
    point: 100, 
    img: '../../assets/images/친환경컵.png',
    description: '천연 재료로 만든 친환경 칫솔'
  },
  { 
    name: '친환경 수건', 
    point: 150, 
    img: '../../assets/images/친환경수건.png',
    description: '유기농 면으로 제작된 친환경수건.png'
  },
  { 
    name: '태양광 충전기', 
    point: 300, 
    img: '../../assets/images/태양광충전기.png',

    description: '태양광으로 충전하는 친환경 충전기'
  },
  { 
    name: '나무 조명', 
    point: 250, 
    img: '../../assets/images/나무조명.png',
    description: '자연 나무로 만든 조명'
  }
];

{/* 상품 영역 - col-9 */}
export default function PointShop() {
  return (
          <div className="col-md-9">
            <div className="row">
              {ITEMS.map((item, idx) => (
                <div className="col-md-3 col-sm-6 mb-4" key={idx}>
                  <div className="card border-0 shadow-sm product-card">
                    <div className="card-body d-flex flex-column">
                      <div>
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          className="img-fluid rounded" 
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <h6 className="card-title font-weight-bold text-ellipsis-1 mb-0">{item.name}</h6>
                        <div className="mt-auto">
                          <span className="product-point">
                            point: {item.point}p
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  );
}
