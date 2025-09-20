import React from 'react';
import '../mainpage.scss';
import qrImage from '../../../../assets/images/qr.png';
import phoneImage from '../../../../assets/images/phone.png';

export default function AppCtaSection() {
  return (
    <section id="app-cta" className="app-cta">
      <div className="container">
        <div className="row align-items-center d-flex">
              <div className='col-md-9'>
                <h4 className="font-weight-bold mb-0 text-center">"Re:earth App으로 더 편리하게, 일상의 탄소중립을 실천하세요."</h4>
              </div>
              <div className='col-md-3 d-flex align-items-center'>
                 <img src={qrImage} alt="qr" className='qr-image' />
                 <img src={phoneImage} alt="phone" className='phone-image' />
              </div>
            </div>
          </div>
    </section>
  );
}
