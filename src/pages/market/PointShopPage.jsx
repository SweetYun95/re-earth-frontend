import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemsThunk } from '../../features/itemSlice';
import './PointShopPage.scss';
import Pagination from '../../components/common/Pagination';
import PointShop from '../../components/shop/PointShop';
import MenuBar from '../../components/menu/MenuBar';

const CATEGORIES = [
  { value: 'all', label: '전체' },
  { value: 'SELL', label: '판매중' },
  { value: 'SOLD_OUT', label: '품절' }
];

const SORT_OPTIONS = [
  { value: 'popular', label: '인기순' },
  { value: 'latest', label: '최신순' },
  { value: 'price_low', label: '포인트 낮은순' },
  { value: 'price_high', label: '포인트 높은순' },
  { value: 'name', label: '이름순' }
];

// 페이지당 보여줄 상품 수
const ITEMS_PER_PAGE = 12;

export default function PointShopPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Redux 상태
  const { items, loading, error } = useSelector((state) => state.items);
  
  // 상태 관리 - 현재 페이지는 pointshop이므로 홈 탭이 active
  const [activeTab, setActiveTab] = useState('home');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  
  // 필터링된 상품들
  const [filteredItems, setFilteredItems] = useState([]);

  // 컴포넌트 마운트 시 상품 데이터 가져오기
  useEffect(() => {
    dispatch(fetchItemsThunk());
  }, [dispatch]);

  // 필터링 로직
  useEffect(() => {
    if (!items) return;

    let filtered = [...items];

    // 카테고리 필터 (판매 상태 기준)
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.itemSellStatus === selectedCategory);
    }

    // 검색 키워드 필터
    if (searchKeyword.trim()) {
      filtered = filtered.filter(item => 
        item.itemNm.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        (item.itemDetail && item.itemDetail.toLowerCase().includes(searchKeyword.toLowerCase())) ||
        (item.itemSummary && item.itemSummary.toLowerCase().includes(searchKeyword.toLowerCase()))
      );
    }

    // 가격 범위 필터
    if (priceRange.min) {
      filtered = filtered.filter(item => item.price >= parseInt(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(item => item.price <= parseInt(priceRange.max));
    }

    // 정렬
    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.itemNm.localeCompare(b.itemNm));
        break;
      case 'latest':
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      default: // 'popular'
        // 인기순 정렬 로직 (예: 판매 상태나 브랜드명 기준)
        filtered.sort((a, b) => {
          if (a.itemSellStatus === 'SELL' && b.itemSellStatus !== 'SELL') return -1;
          if (a.itemSellStatus !== 'SELL' && b.itemSellStatus === 'SELL') return 1;
          return a.brandName.localeCompare(b.brandName);
        });
        break;
    }

    setFilteredItems(filtered);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  }, [items, selectedCategory, searchKeyword, priceRange, sortBy]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab); // 모든 탭 클릭 시 해당 탭이 active 상태가 됨
    if (tab === 'anabada') {
      // 아나바다는 준비중 페이지로 이동
      navigate('/readysoon');
    } else if (tab === 'mypage') {
      // 마이페이지로 이동
      navigate('/user/my');
    } else if (tab === 'pointshop') {
      // 포인트샵 페이지로 이동
      navigate('/pointshop');
    } else if (tab === 'settings') {
      // 설정은 준비중 페이지로 이동
      navigate('/readysoon');
    }
    // home 탭은 현재 페이지이므로 이동하지 않음
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
      <MenuBar />
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
                  className={`tab-item ${activeTab === 'home' ? 'active' : ''}`}
                  onClick={() => handleTabChange('home')}
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
                <button 
                  className={`tab-item ${activeTab === 'pointshop' ? 'active' : ''}`}
                  onClick={() => handleTabChange('pointshop')}
                >
                  <iconify-icon icon="mdi:gift" width="20" height="20"></iconify-icon>
                  포인트샵
                </button>
                <button 
                  className={`tab-item ${activeTab === 'mypage' ? 'active' : ''}`}
                  onClick={() => handleTabChange('mypage')}
                >
                  <iconify-icon icon="mdi:account" width="20" height="20"></iconify-icon>
                  마이페이지
                </button>
                <button 
                  className={`tab-item ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => handleTabChange('settings')}
                >
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

              {/* 상품 그리드 */}
              <div className="products-grid">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <p className="mt-3">상품을 불러오는 중...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-5">
                    <iconify-icon icon="mdi:alert-circle" width="64" height="64" style={{ color: '#dc3545' }}></iconify-icon>
                    <h5 className="mt-3 text-danger">오류가 발생했습니다</h5>
                    <p className="text-muted">{error}</p>
                    <button className="btn btn-primary mt-3" onClick={() => dispatch(fetchItemsThunk())}>
                      다시 시도
                    </button>
                  </div>
                ) : currentItems.length > 0 ? (
                  <PointShop items={currentItems} loading={loading} error={error} />
                ) : (
                  <div className="no-products text-center py-5">
                    <iconify-icon icon="mdi:package-variant" width="64" height="64" style={{ color: '#ccc' }}></iconify-icon>
                    <h5 className="mt-3 text-muted">상품이 없습니다.</h5>
                    <p className="text-muted">
                      {searchKeyword || selectedCategory !== 'all' || priceRange.min || priceRange.max 
                        ? '검색 조건에 맞는 상품이 없습니다.' 
                        : '등록된 상품이 없습니다.'}
                    </p>
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

              {/* 추천 상품 */}
              {!loading && !error && filteredItems.length > 0 && (
                <div className="recommended-products mt-5">
                  <h4>추천 상품</h4>
                  <PointShop items={filteredItems.slice(0, 4)} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
