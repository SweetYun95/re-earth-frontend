// re-earth-frontend/src/components/main/HeroBanner.jsx
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import ArrowIcon from '../common/ArrowIcon';
import './HeroBanner.scss';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';

export default function HeroBanner() {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: 'Re:Earth 앱으로 시작하는 친환경 라이프',
      subtitle: '일상 속 작은 실천이 지구를 구합니다',
      description: '따릉이 이용부터 재활용까지, 모든 친환경 활동을 한 곳에서',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=600&fit=crop',
      badge: 'NEW',
    },
    {
      id: 2,
      title: '슈퍼빈과 함께하는 스마트 재활용',
      subtitle: '네프론으로 쉽고 간편하게',
      description: '플라스틱병, 캔을 버리고 포인트를 받아보세요',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
      badge: 'HOT',
      cta: '내 주변 네프론 찾기',
      link: '/saving/map'
    },
    {
      id: 3,
      title: '탄소 절감으로 지구를 지키는 방법',
      subtitle: '매일 쌓이는 친환경 포인트',
      description: '대중교통 이용, 재활용으로 실질적인 탄소 절감 효과 창출',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
      badge: 'ECO',
      cta: '탄소 절감량 확인',
      link: '/user/my'
    },
    {
      id: 4,
      title: '오늘의 친환경 미션 도전하기',
      subtitle: '매일 새로운 미션으로 지구 사랑 실천',
      description: '간단한 미션 완료로 포인트 획득하고 상품도 받아가세요',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=600&fit=crop',
      badge: 'DAILY',
      cta: '오늘의 미션 보기',
      link: '/readysoon'
    },
    {
      id: 5,
      title: '아나바다장터에서 지속가능한 소비',
      subtitle: '나눔과 순환의 경제 플랫폼',
      description: '중고거래부터 친환경 제품까지, 지속가능한 라이프스타일',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
      badge: 'SHARE',
      cta: '아나바다장터 둘러보기',
      link: '/readysoon'
    }
  ];

  return (
    <div className="col-lg-6 col-md-12 mb-3">
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
          style={{ height: '100%' }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="hero-slide">
              <div className="hero-card">
                <div className="hero-image">
                  <img src={slide.image} alt={slide.title} />
                </div>
                <div className="hero-overlay">
                  <div className="hero-badge">
                    <span className={`badge badge-${slide.badge.toLowerCase()}`}>
                      {slide.badge}
                    </span>
                  </div>
                  <div className="hero-content">
                    <h1 className="hero-title">{slide.title}</h1>
                    <p className="hero-subtitle">{slide.subtitle}</p>
                    <p className="hero-description">{slide.description}</p>
                    {slide.id !== 1 && (
                      <button 
                        className="hero-cta-btn"
                        onClick={() => navigate(slide.link)}
                      >
                        {slide.cta}
                        <ArrowIcon direction="right" size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 커스텀 네비게이션 버튼
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
        </div> */}
      </div>
    </div>
  );
}
