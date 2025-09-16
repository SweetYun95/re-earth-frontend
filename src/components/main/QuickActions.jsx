import React from 'react';
import './QuickActions.scss';

const QUICK_ITEMS = [
  { 
    title: '인증하기', 
    sub: '나의 작은 루틴이 지구를 바꿔요',
    icon: '↗',
    className: 'action-certify'
  },
  { 
    title: '기부하기', 
    sub: '버리면 쓰레기, 기부하면 포인트',
    icon: '↗',
    className: 'action-donate'
  },
  { 
    title: '쇼핑하기', 
    sub: '착한 소비 루프, 여기서 완성',
    icon: '↗',
    className: 'action-shop'
  },
  { 
    title: '커뮤니티', 
    sub: '혼자가 아닌, 함께여서 더 즐겁다',
    icon: '↗',
    className: 'action-community'
  }
];

export default function QuickActions() {
  return (
    <div className="col-md-6">
      <div className="quick-actions">
        <div className="row">
          {QUICK_ITEMS.map((item, idx) => (
            <div className="col-md-6 col-sm-6 mb-3" key={idx}>
              <div className={`card h-100 border-0 quick-action-card ${item.className}`}>
                <div className="card-body">
                  <div className="action-content">
                    <h6 className="action-title">{item.title}</h6>
                    <p className="action-description">{item.sub}</p>
                  </div>
                  <div className="action-icon">
                    {item.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
