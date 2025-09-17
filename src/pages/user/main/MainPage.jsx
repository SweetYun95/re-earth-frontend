import React from 'react';
import './mainpage.scss';
import ArrowIcon from '../../../components/common/ArrowIcon';

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
      <section id="pointshop" className="main--pointshop section">
        <div className="container">
         <div className="row">
          {/* 제목 영역 - col-3 */}
          <div className="col-md-3">
            <div className="h-100 d-flex pb-5 p-2 flex-column justify-content-center">
              <h2 className="mb-2 font-weight-bold main--section__title main--section__title--pointshop">
                PointShop
              </h2>
              <p className="mb-4">Re:earth의 다양한 상품을 만나보세요</p>
              <div className="d-flex align-items-center">
                <a href="#">
                  <ArrowIcon variant="section" size={32} />
                </a>
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