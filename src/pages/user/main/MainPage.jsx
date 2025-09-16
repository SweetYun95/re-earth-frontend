import React from 'react';
import './mainpage.scss';

import HeroSection from './sections/HeroSection';
import StatsAndMapSection from './sections/StatsAndMapSection';
import NewsSection from './sections/NewsSection';
import SupportSection from './sections/SupportSection';
import AppCtaSection from './sections/AppCtaSection';

import PointShop from '../../../components/shop/PointShop';

export default function MainPage() {
  return (
    <main>
      <HeroSection />
      <StatsAndMapSection />
      <section id="pointshop" className="section pt-120 pb-120">
        <div className="container">
         <div className="row">
          {/* 제목 영역 - col-3 */}
          <div className="col-md-3 mb-4 mb-md-0">
            <div className="h-100 d-flex flex-column justify-content-center">
              <h2 className="font-weight-bold mb-3 section-title-green">
                PointShop
              </h2>
              <p className="mb-4">Re:earth의 다양한 상품을 만나보세요</p>
              <div className="d-flex align-items-center">
                <span className="mr-2">더보기</span>
                <span className="section-arrow">→</span>
              </div>
            </div>
          </div>
          <PointShop />
         </div>
       </div>
      </section>
      <NewsSection />
      <SupportSection />
      <AppCtaSection />
    </main>
  );
}