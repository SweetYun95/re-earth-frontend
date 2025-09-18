import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './PointShopPage.scss';
import Pagination from '../../components/common/Pagination';
import PointShop from '../../components/shop/PointShop';

const CATEGORIES = [
  { value: 'all', label: '전체' },
  { value: 'daily', label: '생활용품' },
  { value: 'electronics', label: '전자제품' },
  { value: 'home', label: '홈데코' },
  { value: 'office', label: '사무용품' }
];

const SORT_OPTIONS = [
  { value: 'popular', label: '인기순' },
  { value: 'latest', label: '최신순' },
  { value: 'price_low', label: '포인트 낮은순' },
  { value: 'price_high', label: '포인트 높은순' },
  { value: 'name', label: '이름순' }
];

// PointShop 컴포넌트는 4개의 상품을 보여주므로, 페이지당 5개의 PointShop 컴포넌트 = 20개 상품
const POINTSHOP_COMPONENTS_PER_PAGE = 5;

export default function PointShopPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // 상태 관리
  const [activeTab, setActiveTab] = useState('pointshop');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // PointShop 컴포넌트를 여러 개 생성하기 위한 배열 (예시로 10개 생성)
  const totalPointShopComponents = 10; // 실제로는 API에서 총 상품 수에 따라 결정
  
  // 페이지네이션 계산
  const totalPages = Math.ceil(totalPointShopComponents / POINTSHOP_COMPONENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POINTSHOP_COMPONENTS_PER_PAGE;
  const currentComponents = Array.from(
    { length: Math.min(POINTSHOP_COMPONENTS_PER_PAGE, totalPointShopComponents - startIndex) },
    (_, index) => startIndex + index
  );

  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'anabada') {
      // 아나바다는 유저 전용 페이지로 이동 (아직 구현 안됨)
      // navigate('/user/anabada');
      alert('아나바다 페이지는 준비중입니다.');
    }
  };

  // 필터 초기화
  const resetFilters = () => {
    setSelectedCategory('all');
    setSortBy('popular');
    setSearchKeyword('');
    setPriceRange({ min: '', max: '' });
    setCurrentPage(1);
  };

  return (
    <div className="pointshop-page">
      <div className="container-fluid">
        <div className="row">
          {/* 사이드바 - 필터 영역 */}
          <div className="col-md-3">
            <div className="pointshop-sidebar">
              {/* 사용자 정보 */}
              <div className="user-info-card">
                <div className="user-avatar">
                  <iconify-icon icon="mdi:account-circle" width="32" height="32"></iconify-icon>
                </div>
                <span className="user-name">닉네임</span>
              </div>

              {/* 탭 메뉴 */}
              <div className="tab-menu">
                <button
                  className={`tab-item ${activeTab === 'pointshop' ? 'active' : ''}`}
                  onClick={() => handleTabChange('pointshop')}
                >
                  <iconify-icon icon="mdi:home" width="20" height="20"></iconify-icon>
                  홈
                </button>
                <button
                  className={`tab-item ${activeTab === 'anabada' ? 'active' : ''}`}
                  onClick={() => handleTabChange('anabada')}
                >
                  <iconify-icon icon="mdi:swap-horizontal" width="20" height="20"></iconify-icon>
                  아나바다장터
                </button>
                <button className="tab-item">
                  <iconify-icon icon="mdi:gift" width="20" height="20"></iconify-icon>
                  포인트샵
                </button>
                <button className="tab-item">
                  <iconify-icon icon="mdi:account" width="20" height="20"></iconify-icon>
                  마이페이지
                </button>
                <button className="tab-item">
                  <iconify-icon icon="mdi:cog" width="20" height="20"></iconify-icon>
                  설정
                </button>
              </div>
            </div>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="col-md-9">
            <div className="pointshop-content">
              {/* 헤더 */}
              <div className="content-header">
                <h2 className="page-title">PointShop</h2>
              </div>

              {/* 필터 바 */}
              <div className="filter-bar">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <div className="filter-controls d-flex flex-wrap gap-3">
                      {/* 카테고리 선택 */}
                      <select
                        className="filter-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        {CATEGORIES.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>

                      {/* 정렬 선택 */}
                      <select
                        className="filter-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        {SORT_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>

                      {/* 검색 */}
                      <input
                        type="text"
                        className="filter-input"
                        placeholder="상품 검색..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                      />

                      {/* 가격 범위 */}
                      <div className="price-range d-flex gap-2">
                        <input
                          type="number"
                          className="filter-input"
                          placeholder="최소"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                        />
                        <span>~</span>
                        <input
                          type="number"
                          className="filter-input"
                          placeholder="최대"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-right">
                    <button className="btn btn-sm btn-outline-secondary" onClick={resetFilters}>
                      <iconify-icon icon="mdi:refresh" width="16" height="16"></iconify-icon>
                      필터 초기화
                    </button>
                  </div>
                </div>
              </div>

              {/* 상품 그리드 - PointShop 컴포넌트를 5열로 나열 */}
              <div className="products-grid">
                {currentComponents.length > 0 ? (
                  currentComponents.map((componentIndex) => (
                    <div key={componentIndex} className="pointshop-component-wrapper mb-4">
                      <PointShop />
                    </div>
                  ))
                ) : (
                  <div className="no-products text-center py-5">
                    <iconify-icon icon="mdi:package-variant" width="64" height="64" style={{ color: '#ccc' }}></iconify-icon>
                    <h5 className="mt-3 text-muted">상품이 없습니다.</h5>
                    <p className="text-muted">나중에 다시 확인해보세요.</p>
                  </div>
                )}
              </div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination 
                    pagination={{
                      currentPage,
                      totalPages,
                      onPageChange: setCurrentPage
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
