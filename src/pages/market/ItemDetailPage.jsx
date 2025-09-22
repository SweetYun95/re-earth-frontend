import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchItemByIdThunk } from '../../features/itemSlice'
import cupImage from '../../assets/images/친환경컵.png'
import towelImage from '../../assets/images/친환경수건.png'
import chargerImage from '../../assets/images/태양광충전기.png'
import lampImage from '../../assets/images/나무조명.png'

export default function ProductDetailPage() {
   const { id } = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   
   // Redux 상태
   const { item: product, loading, error } = useSelector((state) => state.items)
   
   const quantity = 1 // 수량 고정
   const [userPoints, setUserPoints] = useState(150000) // 임시 사용자 포인트

   // 기본 이미지 배열
   const DEFAULT_IMAGES = [cupImage, towelImage, chargerImage, lampImage]

   useEffect(() => {
      if (id) {
         dispatch(fetchItemByIdThunk(id))
      }
   }, [dispatch, id])

   // 컴포넌트 언마운트 시 상품 상태 초기화 (선택사항)
   useEffect(() => {
      return () => {
         // 필요시 상품 상태 초기화 로직 추가
      }
   }, [])

   const handlePurchase = () => {
      if (!product || (product.stockNumber !== undefined && product.stockNumber < 1)) {
         alert('재고가 부족합니다.')
         return
      }

      if (userPoints < product.price) {
         alert('포인트가 부족합니다.')
         return
      }

      // 실제로는 구매 API 호출 (pointOrderApi 등을 사용)
      if (window.confirm(`${product.itemNm} 1개를 ${product.price}P로 구매하시겠습니까?`)) {
         alert('구매가 완료되었습니다!')
         navigate('/pointshop')
      }
   }


   // 상품 이미지 가져오기 함수
   const getProductImage = () => {
      if (product?.ItemImages && product.ItemImages.length > 0) {
         const repImage = product.ItemImages.find(img => img.repImgYn === 'Y')
         return repImage ? repImage.imgUrl : product.ItemImages[0].imgUrl
      }
      // 기본 이미지 중 하나를 랜덤하게 선택
      return DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)]
   }

   if (loading) {
      return (
         <div className="product-detail-page">
            <div className="detail-container">
               <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                     <span className="sr-only">Loading...</span>
                  </div>
                  <p className="mt-3">상품 정보를 불러오는 중...</p>
               </div>
            </div>
         </div>
      )
   }

   if (error) {
      return (
         <div className="product-detail-page">
            <div className="detail-container">
               <div className="text-center py-5">
                  <iconify-icon icon="mdi:alert-circle" width="64" height="64" style={{ color: '#dc3545' }}></iconify-icon>
                  <h5 className="mt-3 text-danger">오류가 발생했습니다</h5>
                  <p className="text-muted">{error}</p>
                  <button className="btn btn-primary mt-3" onClick={() => dispatch(fetchItemByIdThunk(id))}>
                     다시 시도
                  </button>
                  <button className="btn btn-secondary mt-3 ms-2" onClick={() => navigate('/pointshop')}>
                     목록으로 돌아가기
                  </button>
               </div>
            </div>
         </div>
      )
   }

   if (!product) {
      return (
         <div className="product-detail-page">
            <div className="detail-container">
               <div className="text-center py-5">
                  <iconify-icon icon="mdi:package-variant" width="64" height="64" style={{ color: '#ccc' }}></iconify-icon>
                  <h5 className="mt-3 text-muted">상품을 찾을 수 없습니다.</h5>
                  <button className="btn btn-primary mt-3" onClick={() => navigate('/pointshop')}>
                     목록으로 돌아가기
                  </button>
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className="product-detail-page">
         <div className="detail-container">
            {/* 뒤로가기 버튼 */}
            <div className="mb-4">
               <button className="btn btn-link p-0 text-decoration-none" onClick={() => navigate('/pointshop')}>
                  <iconify-icon icon="mdi:arrow-left" width="20" height="20"></iconify-icon>
                  목록으로 돌아가기
               </button>
            </div>

            <div className="product-detail">
               <div className="row">
                  {/* 상품 이미지 */}
                  <div className="col-md-6">
                     <div className="product-image-section">
                        <img
                           src={getProductImage()}
                           alt={product.itemNm}
                           className="product-main-image"
                           onError={(e) => {
                              e.target.src = cupImage
                           }}
                        />
                     </div>
                  </div>

                  {/* 상품 정보 */}
                  <div className="col-md-6">
                     <div className="product-info-section">
                        <h1 className="product-title">{product.itemNm}</h1>

                        {product.itemSellStatus === 'SELL' && (
                           <div className="mb-3">
                              <span className="badge badge-success">
                                 <iconify-icon icon="mdi:check-circle" width="16" height="16"></iconify-icon>
                                 판매중
                              </span>
                           </div>
                        )}

                        <p className="product-description">{product.itemDetail}</p>

                        <div className="product-price">Price: {product.price} points</div>

                        <div className="mb-3">
                           <span className="text-muted">
                              재고: {product.stockNumber !== undefined ? `${product.stockNumber}개` : '재고 정보 없음'}
                           </span>
                        </div>

                        <div className="mb-3">
                           <span className="text-muted">내 포인트: {userPoints.toLocaleString()}P</span>
                        </div>

                        {/* 총 가격 */}
                        <div className="total-price mb-4">
                           <h5>결제 금액: {product.price?.toLocaleString()}P</h5>
                        </div>

                        {/* 구매 버튼 */}
                        <div className="product-actions">
                           <button 
                              className="btn-purchase" 
                              onClick={handlePurchase} 
                              disabled={
                                 (product.stockNumber !== undefined && product.stockNumber < 1) || 
                                 userPoints < product.price
                              }
                           >
                              <iconify-icon icon="mdi:cart" width="20" height="20"></iconify-icon>
                              구매하기
                           </button>
                           <button className="btn-back" onClick={() => navigate('/pointshop')}>
                              목록으로
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* 추천 상품 */}
            <div className="recommended-products">
               <h4>추천 상품</h4>
               <div className="row">
                  {/* 간단한 추천 상품 표시 - 실제로는 별도 API로 추천 상품을 가져와야 함 */}
                  {DEFAULT_IMAGES.map((img, idx) => (
                     <div className="col-md-3 col-sm-6 mb-4" key={idx}>
                        <div className="product__card" style={{ cursor: 'pointer' }}>
                           <div className="product__card__body d-flex flex-column">
                              <div>
                                 <img src={img} alt={`추천상품${idx + 1}`} className="img-fluid rounded" />
                              </div>
                              <div className="d-flex flex-column">
                                 <h6 className="product__card__title font-weight-bold text-ellipsis-1 mb-0">
                                    추천 상품 {idx + 1}
                                 </h6>
                                 <div className="mt-auto">
                                    <span className="product__card__point">point: {(idx + 1) * 100}p</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}
