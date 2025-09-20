// re-earth-frontend/src/components/main/HeroBanner.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import ArrowIcon from '../common/ArrowIcon';
import './HeroBanner.scss';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';

export default function HeroBanner() {
  const slides = [
    {
      id: 1,
      title: '앱 설치 소개',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=600&fit=crop'
    },
    {
      id: 2,
      title: '슈퍼빈 파트너쉽 소개',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop'
    },
    {
      id: 3,
      title: '카본프리 프로젝트 소개',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop'
    },
    {
      id: 4,
      title: '이벤트 배너(오늘의 미션 소개)',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=600&fit=crop'
    },
    {
      id: 5,
      title: '아나바다장터 소개',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=600&fit=crop'
    }
  ];

  return (
    <div className="col-md-6 mb-3">
      <div className="hero-banner-swiper">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={800}
          className="hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="hero-slide">
              <div className="hero-card">
                <div className="hero-image">
                  <img src={slide.image} alt={slide.title} />
                </div>
                <div className="hero-overlay">
                      <h1 className="hero-title">{slide.title}</h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 커스텀 네비게이션 버튼 */}
        <div className="swiper-button-prev-custom">
          <ArrowIcon 
            direction="left" 
            size={32} 
            variant="stroke"
            color="var(--maintext)"
          />
        </div>
        <div className="swiper-button-next-custom">
          <ArrowIcon 
            direction="right" 
            size={32} 
            variant="stroke"
            color="var(--maintext)"
          />
        </div>
      </div>
    </div>
  );
}
