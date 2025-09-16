import React from 'react';
import '../mainpage.scss';

const SUPPORT = [
  { 
    title: '1:1 문의', 
    desc: '고객님의 소중한 의견을 신속하게 접수하고 처리합니다.', 
    icon: '🤝'
  },
  { 
    title: 'FAQ', 
    desc: '자주 묻는 질문을 모아 보다 빠르게 문제를 해결하실 수 있습니다.', 
    icon: '📖'
  },
  { 
    title: '공지사항', 
    desc: '원활한 서비스를 위해 공지를 확인해주세요.', 
    icon: '📢'
  },
  { 
    title: '고객의 소리', 
    desc: '다양한 의견을 듣고 더 나은 서비스를 위해 반영하겠습니다.', 
    icon: '📝'
  },
];

export default function SupportSection() {
  return (
    <section id="support" className="section pt-120 pb-120">
      <div className="container">
        <div className="row">
        <div className="text-center col-md-4 mb-5">
          <h2 className="font-weight-bold mb-2 text-green">Customer Support</h2>
          <p className="text-muted">고객지원</p>
        </div>
        <div className='col-md-8'>
        <div className="row">
          {SUPPORT.map((item, idx) => (
            <div className="col-md-6 mb-4" key={idx}>
              <div className="card h-100 border">
                <div className="card-body text-center p-4">
                  <div className="mb-3 icon-large">
                    {item.icon}
                  </div>
                  <h6 className="card-title font-weight-bold mb-3">{item.title}</h6>
                  <p className="card-text text-muted small mb-3">{item.desc}</p>
                  <button className="btn btn-outline-secondary btn-sm">
                    바로가기
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
