import React, { useState } from 'react';

const BANNER_ITEMS = [
  '배너이미지추가',
  '1. 앱 설치 소개',
  '2. 슈퍼빈 파트너쉽 소개',
  '3. 카본프리 프로젝트 소개(대중교통/따릉이)',
  '4. 이벤트 배너(오늘의 미션 소개)',
  '5. 아나바다장터 소개'
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNER_ITEMS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + BANNER_ITEMS.length) % BANNER_ITEMS.length);
  };

  return (
    <div className="col-md-6">
      <div className="row align-items-center">
        {/* Left: Banner List */}
        <div className="col-md-12 mb-4 mb-md-0">
          <div className="banner-content">
                <img src="#" alt="배너 슬라이드" />
            <div className="banner-controls d-flex align-items-center">
              <button 
                className="btn btn-sm btn-outline-secondary mr-2" 
                onClick={prevSlide}
                style={{borderRadius: '50%', width: '30px', height: '30px'}}
              >
                ←
              </button>
              <div className="d-flex">
                {BANNER_ITEMS.map((_, index) => (
                  <div 
                    key={index}
                    className={`mr-1`}
                    style={{
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%',
                      backgroundColor: index === currentSlide ? '#72C63A' : '#e9ecef'
                    }}
                  />
                ))}
              </div>
              <button 
                className="btn btn-sm btn-outline-secondary ml-2" 
                onClick={nextSlide}
                style={{borderRadius: '50%', width: '30px', height: '30px'}}
              >
                →
              </button>
            </div>
          </div>
        </div>
        
        {/* Right: Hero Image */}
        <div className="col-md-12">
          <div className="hero-image-container">
            <img 
              className="img-fluid rounded" 
              src="https://images.unsplash.com/photo-1569163139394-de6e4d2be8c4?w=600&h=400&fit=crop&crop=center" 
              alt="Re:earth hero" 
              style={{borderRadius: '12px'}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
