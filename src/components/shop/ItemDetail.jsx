// src/components/shop/ItemDetail.jsx
import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchItemByIdThunk } from '../../features/itemSlice.js'
import { createOrderThunk } from '../../features/pointOrderSlice'
// import '../../pages/market/PointShopPage.scss'

export default function ItemDetail() {
   const { id } = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const { item, loading, error } = useSelector((state) => state.items)

   // 부트스트랩 스타일에 맞춘 상태값들
   const [quantity, setQuantity] = useState(1)
   const [orderComplete, setOrderComplete] = useState(false)
   const [userPoints] = useState(150000) // 데모용. 실제로는 유저 포인트 API에서 불러오세요.

   // 이미지 배열 정규화 + 대표 이미지 우선 정렬
   const images = useMemo(() => {
      const arr = (Array.isArray(item?.ItemImages) && item.ItemImages) || (Array.isArray(item?.Imgs) && item.Imgs) || (Array.isArray(item?.images) && item.images) || []
      return [...arr].sort((a, b) => (b?.repImgYn === 'Y') - (a?.repImgYn === 'Y'))
   }, [item])

   const baseURL = import.meta.env.VITE_APP_API_URL
   const mainImage = images[0]?.imgUrl ? `${baseURL}${images[0].imgUrl}` : '/placeholder.png'

   useEffect(() => {
      dispatch(fetchItemByIdThunk(id))
   }, [dispatch, id, orderComplete])

   const handlePurchase = async () => {
      if (!item) return
      if ((item.stockNumber || 0) < quantity) {
         alert('재고가 부족합니다.')
         return
      }
      const totalPoints = (item.price || 0) * quantity
      if (userPoints < totalPoints) {
         alert('포인트가 부족합니다.')
         return
      }

      const ok = window.confirm(`${item.itemNm} ${quantity}개를 ${totalPoints.toLocaleString()}P로 구매하시겠습니까?`)
      if (!ok) return

      try {
         await dispatch(
            createOrderThunk({
               items: [{ itemId: id, count: quantity }],
            })
         ).unwrap()
         alert('구매가 완료되었습니다!')
         setOrderComplete((p) => !p)
         navigate('/items/list') // 필요 시 다른 경로로 변경
      } catch (err) {
         console.error('주문 에러:', err)
         alert('주문에 실패했습니다. ' + err)
      }
   }

   if (loading) {
      return (
         <div className="product-detail-page">
            <div className="detail-container">
               <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                     <span className="sr-only">Loading...</span>
                  </div>
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
                  <h5 className="text-danger">상품 정보를 불러오는 중 오류가 발생했습니다.</h5>
                  <p className="text-muted">{String(error)}</p>
                  <button className="btn btn-primary mt-3" onClick={() => navigate('/items/list')}>
                     목록으로 돌아가기
                  </button>
               </div>
            </div>
         </div>
      )
   }

   if (!item) return null

   const totalPoints = (item.price || 0) * quantity

   return (
      <div className="product-detail-page">
         <div className="detail-container">
            <div className="product-detail">
               <div className="row">
                  {/* 상품 이미지 */}
                  <div className="col-md-6">
                     <div className="product-image-section">
                        <img
                           src={mainImage}
                           alt={item.itemNm}
                           className="product-main-image"
                           onError={(e) => {
                              e.currentTarget.src = '/src/assets/images/친환경컵.png'
                           }}
                        />
                     </div>
                  </div>

                  {/* 상품 정보 */}
                  <div className="col-md-6">
                     <div className="product-info-section">
                        <h1 className="product-title">{item.itemNm}</h1>

                        <p className="product-description">{item.itemDetail || '상세 설명이 없습니다.'}</p>

                        <div className="product-price">Price: {item.price?.toLocaleString()} points</div>

                        <div className="mb-3">
                           <span className="text-muted">재고: {item.stockNumber}개</span>
                        </div>

                        <div className="mb-3">
                           <span className="text-muted">내 포인트: {userPoints.toLocaleString()}P</span>
                        </div>

                        {/* 총 가격 */}
                        <div className="total-price mb-4">
                           <h5>총 결제 금액: {totalPoints.toLocaleString()}P</h5>
                        </div>

                        {/* 구매 버튼 */}
                        <div className="product-actions">
                           <button className="btn-purchase" onClick={handlePurchase} disabled={item.stockNumber < 1 || userPoints < totalPoints}>
                              <iconify-icon icon="mdi:cart" width="20" height="20"></iconify-icon>
                              구매하기
                           </button>
                           <button className="btn-back" onClick={() => navigate('/items/list')}>
                              목록으로
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
