import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsThunk } from '../../../features/itemSlice';
import { formatWithComma } from '../../../utils/priceSet';
import Pagination from '../../../components/common/Pagination';
import "./PointShopPage.scss";

const CATEGORIES = [
  { value: "all", label: "전체" },
  { value: "daily", label: "생활용품" },
  { value: "electronics", label: "전자제품" },
  { value: "home", label: "홈데코" },
  { value: "office", label: "사무용품" },
];

const SORT_OPTIONS = [
  { value: "popular", label: "인기순" },
  { value: "latest", label: "최신순" },
  { value: "price_low", label: "포인트 낮은순" },
  { value: "price_high", label: "포인트 높은순" },
  { value: "name", label: "이름순" },
];

function ItemSellListPage() {
  const navigate = useNavigate();

  // 상태
  const [activeTab, setActiveTab] = useState("pointshop");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const handleTabChange = (tab) => {
    if (tab === "anabada") {
      // 추후 아나바다 라우팅 예정
      // navigate('/user/anabada');
      alert("아나바다 페이지는 준비중입니다.");
      return;
    }
    setActiveTab(tab);
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSortBy("popular");
    setSearchKeyword("");
    setPriceRange({ min: "", max: "" });
  };

  return (
    <section className="item-sell-list-page">
      <div className="container">
        <div className="row">
          <div className="pointshop-page">
            <div className="container-fluid">
              <div className="row">
                {/* 좌측 사이드바 */}
                <div className="col-md-3">
                  <div className="pointshop-sidebar">
                    {/* 사용자 정보 */}
                    <div className="user-info-card">
                      <div className="user-avatar">
                        <iconify-icon
                          icon="mdi:account-circle"
                          width="32"
                          height="32"
                        ></iconify-icon>
                      </div>
                      <span className="user-name">닉네임</span>
                    </div>

                    {/* 탭 메뉴 */}
                    <div className="tab-menu">
                      <button
                        className={`tab-item ${
                          activeTab === "pointshop" ? "active" : ""
                        }`}
                        onClick={() => handleTabChange("pointshop")}
                      >
                        <iconify-icon
                          icon="mdi:home"
                          width="20"
                          height="20"
                        ></iconify-icon>
                        홈
                      </button>
                      <button
                        className={`tab-item ${
                          activeTab === "anabada" ? "active" : ""
                        }`}
                        onClick={() => handleTabChange("anabada")}
                      >
                        <iconify-icon
                          icon="mdi:swap-horizontal"
                          width="20"
                          height="20"
                        ></iconify-icon>
                        아나바다장터
                      </button>
                      <button className="tab-item">
                        <iconify-icon
                          icon="mdi:gift"
                          width="20"
                          height="20"
                        ></iconify-icon>
                        포인트샵
                      </button>
                      <button className="tab-item">
                        <iconify-icon
                          icon="mdi:account"
                          width="20"
                          height="20"
                        ></iconify-icon>
                        마이페이지
                      </button>
                      <button className="tab-item">
                        <iconify-icon
                          icon="mdi:cog"
                          width="20"
                          height="20"
                        ></iconify-icon>
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
                            {/* 카테고리 */}
                            <select
                              className="filter-select"
                              value={selectedCategory}
                              onChange={(e) =>
                                setSelectedCategory(e.target.value)
                              }
                            >
                              {CATEGORIES.map((category) => (
                                <option
                                  key={category.value}
                                  value={category.value}
                                >
                                  {category.label}
                                </option>
                              ))}
                            </select>

                            {/* 정렬 */}
                            <select
                              className="filter-select"
                              value={sortBy}
                              onChange={(e) => setSortBy(e.target.value)}
                            >
                              {SORT_OPTIONS.map((option) => (
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
                                onChange={(e) =>
                                  setPriceRange((prev) => ({
                                    ...prev,
                                    min: e.target.value,
                                  }))
                                }
                              />
                              <span>~</span>
                              <input
                                type="number"
                                className="filter-input"
                                placeholder="최대"
                                value={priceRange.max}
                                onChange={(e) =>
                                  setPriceRange((prev) => ({
                                    ...prev,
                                    max: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 text-right">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={resetFilters}
                          >
                            <iconify-icon
                              icon="mdi:refresh"
                              width="16"
                              height="16"
                            ></iconify-icon>
                            필터 초기화
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 상품 그리드: 실제 데이터 리스트 */}
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
                          <div className="alert alert-danger" role="alert">
                            <iconify-icon icon="mdi:alert-circle" width="24" height="24" className="mr-2"></iconify-icon>
                            에러 발생: {String(error)}
                          </div>
                          <button className="btn btn-primary mt-3" onClick={() => dispatch(fetchItemsThunk({}))}>
                            다시 시도
                          </button>
                        </div>
                      ) : items?.length > 0 ? (
                        <div className="row">
                          {items.map((item) => {
                            // 대표 이미지 안전 접근
                            const images = item.ItemImages ?? item.Imgs ?? []
                            const repImg = images.find((img) => img?.repImgYn === 'Y') ?? images[0]
                            const imageUrl = repImg?.imgUrl ? `${import.meta.env.VITE_APP_API_URL}${repImg.imgUrl}` : '/placeholder.png'
                            
                            return (
                              <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                <div className="card h-100 shadow-sm product-card" onClick={() => navigate(`/items/detail/${item.id}`)} style={{ cursor: 'pointer' }}>
                                  {/* 상품 이미지 */}
                                  <div className="position-relative">
                                    <img
                                      src={imageUrl}
                                      alt={item.itemNm ?? 'item image'}
                                      className="card-img-top product-image"
                                      style={{ height: '200px', objectFit: 'cover' }}
                                      onError={(e) => {
                                        e.target.src = '/placeholder.png'
                                      }}
                                    />
                                    {/* 판매 상태 배지 */}
                                    {item.itemSellStatus === 'SELL' ? (
                                      <span className="badge badge-success position-absolute" style={{ top: '10px', right: '10px' }}>
                                        <iconify-icon icon="mdi:check-circle" width="12" height="12" className="mr-1"></iconify-icon>
                                        판매중
                                      </span>
                                    ) : (
                                      <span className="badge badge-secondary position-absolute" style={{ top: '10px', right: '10px' }}>
                                        <iconify-icon icon="mdi:close-circle" width="12" height="12" className="mr-1"></iconify-icon>
                                        품절
                                      </span>
                                    )}
                                  </div>

                                  {/* 상품 정보 */}
                                  <div className="card-body d-flex flex-column">
                                    <h6 className="card-title text-dark mb-2" style={{ 
                                      overflow: 'hidden', 
                                      textOverflow: 'ellipsis', 
                                      whiteSpace: 'nowrap',
                                      minHeight: '1.5em'
                                    }}>
                                      {item.itemNm}
                                    </h6>
                                    
                                    {/* 브랜드 정보 */}
                                    {item.brandName && (
                                      <p className="text-muted small mb-2">
                                        <iconify-icon icon="mdi:tag" width="14" height="14" className="mr-1"></iconify-icon>
                                        {item.brandName}
                                      </p>
                                    )}

                                    {/* 상품 요약 */}
                                    {item.itemSummary && (
                                      <p className="text-muted small mb-3" style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        minHeight: '2.4em'
                                      }}>
                                        {item.itemSummary}
                                      </p>
                                    )}

                                    {/* 가격 정보 */}
                                    <div className="mt-auto">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <span className="h5 text-primary mb-0 font-weight-bold">
                                          {formatWithComma(String(item.price))}P
                                        </span>
                                        {item.stockNumber && (
                                          <small className="text-muted">
                                            재고: {item.stockNumber}개
                                          </small>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* 카드 푸터 */}
                                  <div className="card-footer bg-transparent border-0 p-3">
                                    <div className="d-flex justify-content-center">
                                      <span className="btn btn-outline-primary btn-sm">
                                        <iconify-icon icon="mdi:eye" width="16" height="16" className="mr-1"></iconify-icon>
                                        상품 보기
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="col-12">
                          <div className="text-center py-5">
                            <iconify-icon icon="mdi:package-variant-remove" width="64" height="64" style={{ color: '#ccc' }}></iconify-icon>
                            <h5 className="mt-3 text-muted">등록된 상품이 없습니다</h5>
                            <p className="text-muted">새로운 상품이 등록되면 여기에 표시됩니다.</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 페이지네이션이 필요하다면 여기 배치 */}
                    {/* <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    /> */}
                  </div>
                </div>
                {/* // col-md-9 끝 */}
              </div>
              {/* // row 끝 */}
            </div>
            {/* // container-fluid 끝 */}
          </div>
          {/* // pointshop-page 끝 */}
        </div>
      </div>
    </section>
  );
}

export default ItemSellListPage;
