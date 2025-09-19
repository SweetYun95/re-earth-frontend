import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ItemDetail from '../../../components/shop/ItemDetail'

import './PointShopPage.scss'

const CATEGORIES = [
   { value: 'all', label: '전체' },
   { value: 'daily', label: '생활용품' },
   { value: 'electronics', label: '전자제품' },
   { value: 'home', label: '홈데코' },
   { value: 'office', label: '사무용품' },
]

const SORT_OPTIONS = [
   { value: 'popular', label: '인기순' },
   { value: 'latest', label: '최신순' },
   { value: 'price_low', label: '포인트 낮은순' },
   { value: 'price_high', label: '포인트 높은순' },
   { value: 'name', label: '이름순' },
]

function ItemSellDetailPage() {
   const navigate = useNavigate()

   // 상태
   const [activeTab, setActiveTab] = useState('pointshop')
   const [selectedCategory, setSelectedCategory] = useState('all')
   const [sortBy, setSortBy] = useState('popular')
   const [searchKeyword, setSearchKeyword] = useState('')
   const [priceRange, setPriceRange] = useState({ min: '', max: '' })

   const handleTabChange = (tab) => {
      setActiveTab(tab)
      if (tab === 'anabada') {
         // 추후 아나바다 라우팅 예정
         // navigate('/user/anabada');
         alert('아나바다 페이지는 준비중입니다.')
      }
   }

   const resetFilters = () => {
      setSelectedCategory('all')
      setSortBy('popular')
      setSearchKeyword('')
      setPriceRange({ min: '', max: '' })
   }

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
                                    <iconify-icon icon="mdi:account-circle" width="32" height="32"></iconify-icon>
                                 </div>
                                 <span className="user-name">닉네임</span>
                              </div>

                              {/* 탭 메뉴 */}
                              <div className="tab-menu">
                                 <button className={`tab-item ${activeTab === 'pointshop' ? 'active' : ''}`} onClick={() => handleTabChange('pointshop')}>
                                    <iconify-icon icon="mdi:home" width="20" height="20"></iconify-icon>홈
                                 </button>
                                 <button className={`tab-item ${activeTab === 'anabada' ? 'active' : ''}`} onClick={() => handleTabChange('anabada')}>
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
                                          {/* 카테고리 */}
                                          <select className="filter-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                             {CATEGORIES.map((category) => (
                                                <option key={category.value} value={category.value}>
                                                   {category.label}
                                                </option>
                                             ))}
                                          </select>

                                          {/* 정렬 */}
                                          <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                             {SORT_OPTIONS.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                   {option.label}
                                                </option>
                                             ))}
                                          </select>

                                          {/* 검색 */}
                                          <input type="text" className="filter-input" placeholder="상품 검색..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />

                                          {/* 가격 범위 */}
                                          <div className="price-range d-flex gap-2">
                                             <input type="number" className="filter-input" placeholder="최소" value={priceRange.min} onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))} />
                                             <span>~</span>
                                             <input type="number" className="filter-input" placeholder="최대" value={priceRange.max} onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))} />
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

                              {/* 상품 그리드: 실제 데이터 리스트 */}
                              <div className="products-grid">
                                 <ItemDetail />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default ItemSellDetailPage
