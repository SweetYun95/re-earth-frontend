import React from 'react';
import '../mainpage.scss';

export default function AppCtaSection() {
  return (
    <section id="app-cta" className="card-green-bg">
      <div className="container">
        <div className="row align-items-center d-flex">
              <div className='col-md-9'>
                <h4 className="font-weight-bold mb-2">"Re:earth App으로 더 편리하게, 일상의 탄소중립을 실천하세요."</h4>
              </div>
              <div className='col-md-3'>
                 <img src="../../../../assets/images/phone.svg" alt="qr코드" />
              </div>
            </div>
          </div>
    </section>
  );
}
