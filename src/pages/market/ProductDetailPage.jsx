<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PointShopPage.scss";
import PointShop from "../../components/shop/PointShop";

// 임시 상품 데이터 (실제로는 API에서 가져올 예정)
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "친환경 칫솔",
    point: 1500,
    category: "daily",
    image: "/src/assets/images/친환경컵.png",
    description:
      "Stay hydrated and eco-friendly with our reusable water bottle. Made from sustainable materials, it's perfect for everyday use and helps reduce plastic waste. Support our mission to protect Finland's natural beauty with every purchase.",
    stock: 50,
    popular: true,
    specs: {
      material: "천연 대나무",
      size: "길이 18cm",
      weight: "15g",
      origin: "한국",
    },
  },
  {
    id: 2,
    name: "친환경 수건",
    point: 150,
    category: "daily",
    image: "/src/assets/images/친환경수건.png",
    description: "유기농 면으로 제작된 친환경수건",
    stock: 30,
    popular: false,
    specs: {
      material: "유기농 면 100%",
      size: "60cm x 120cm",
      weight: "300g",
      origin: "인도",
    },
  },
  {
    id: 3,
    name: "태양광 충전기",
    point: 300,
    category: "electronics",
    image: "/src/assets/images/태양광충전기.png",
    description: "태양광으로 충전하는 친환경 충전기",
    stock: 20,
    popular: true,
    specs: {
      capacity: "10000mAh",
      output: "5V/2A",
      weight: "250g",
      warranty: "1년",
    },
  },
  {
    id: 4,
    name: "나무 조명",
    point: 250,
    category: "home",
    image: "/src/assets/images/나무조명.png",
    description: "자연 나무로 만든 조명",
    stock: 15,
    popular: false,
    specs: {
      material: "천연 원목",
      power: "LED 5W",
      size: "높이 25cm",
      color: "웜화이트",
    },
  },
];
=======
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './PointShopPage.scss'
import PointShop from '../../components/shop/PointShop'
>>>>>>> a8e8adc8150a987c33332d5fedec4489ec12900d

export default function ProductDetailPage() {
   const { id } = useParams()
   const navigate = useNavigate()
   const [product, setProduct] = useState(null)
   const [loading, setLoading] = useState(true)
   const [quantity, setQuantity] = useState(1)
   const [userPoints, setUserPoints] = useState(150000) // 임시 사용자 포인트

<<<<<<< HEAD
  useEffect(() => {
    // 실제로는 API 호출
    const fetchProduct = () => {
      const foundProduct = MOCK_PRODUCTS.find((p) => p.id === parseInt(id));
      setProduct(foundProduct);
      setLoading(false);
    };
=======
   useEffect(() => {
      // 실제로는 API 호출
      const fetchProduct = () => {}
>>>>>>> a8e8adc8150a987c33332d5fedec4489ec12900d

      fetchProduct()
   }, [id])

<<<<<<< HEAD
  console.log(product);

  const handlePurchase = () => {
    if (!product || product.stock < quantity) {
      alert("재고가 부족합니다.");
      return;
    }

    const totalPoints = product.point * quantity;
    if (userPoints < totalPoints) {
      alert("포인트가 부족합니다.");
      return;
    }

    // 실제로는 구매 API 호출
    if (
      window.confirm(
        `${product.name} ${quantity}개를 ${totalPoints}P로 구매하시겠습니까?`
      )
    ) {
      alert("구매가 완료되었습니다!");
      navigate("/pointshop");
    }
  };
=======
   const handlePurchase = () => {
      if (!product || product.stock < quantity) {
         alert('재고가 부족합니다.')
         return
      }

      const totalPoints = product.point * quantity
      if (userPoints < totalPoints) {
         alert('포인트가 부족합니다.')
         return
      }

      // 실제로는 구매 API 호출
      if (window.confirm(`${product.name} ${quantity}개를 ${totalPoints}P로 구매하시겠습니까?`)) {
         alert('구매가 완료되었습니다!')
         navigate('/pointshop')
      }
   }
>>>>>>> a8e8adc8150a987c33332d5fedec4489ec12900d

   const handleQuantityChange = (change) => {
      const newQuantity = quantity + change
      if (newQuantity >= 1 && newQuantity <= product.stock) {
         setQuantity(newQuantity)
      }
   }

<<<<<<< HEAD
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
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="detail-container">
          <div className="text-center py-5">
            <iconify-icon
              icon="mdi:package-variant"
              width="64"
              height="64"
              style={{ color: "#ccc" }}
            ></iconify-icon>
            <h5 className="mt-3 text-muted">상품을 찾을 수 없습니다.</h5>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("/pointshop")}
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="detail-container">
        {/* 뒤로가기 버튼 */}
        <div className="mb-4">
          <button
            className="btn btn-link p-0 text-decoration-none"
            onClick={() => navigate("/pointshop")}
          >
            <iconify-icon
              icon="mdi:arrow-left"
              width="20"
              height="20"
            ></iconify-icon>
            목록으로 돌아가기
          </button>
        </div>

        <div className="product-detail">
          <div className="row">
            {/* 상품 이미지 */}
            <div className="col-md-6">
              <div className="product-image-section">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-main-image"
                  onError={(e) => {
                    e.target.src = "/src/assets/images/친환경컵.png";
                  }}
                />
              </div>
            </div>

            {/* 상품 정보 */}
            <div className="col-md-6">
              <div className="product-info-section">
                <h1 className="product-title">{product.name}</h1>

                {product.popular && (
                  <div className="mb-3">
                    <span className="badge badge-danger">
                      <iconify-icon
                        icon="mdi:fire"
                        width="16"
                        height="16"
                      ></iconify-icon>
                      인기상품
                    </span>
=======
   if (loading) {
      return (
         <div className="product-detail-page">
            <div className="detail-container">
               <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                     <span className="sr-only">Loading...</span>
>>>>>>> a8e8adc8150a987c33332d5fedec4489ec12900d
                  </div>
               </div>
            </div>
         </div>
      )
   }

<<<<<<< HEAD
                <p className="product-description">{product.description}</p>

                <div className="product-price">
                  Price: {product.point} points
                </div>

                <div className="mb-3">
                  <span className="text-muted">재고: {product.stock}개</span>
                </div>

                <div className="mb-3">
                  <span className="text-muted">
                    내 포인트: {userPoints.toLocaleString()}P
                  </span>
                </div>

                {/* 수량 선택 */}
                <div className="quantity-selector mb-4">
                  <label className="form-label">수량</label>
                  <div className="d-flex align-items-center gap-3">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-display px-3">{quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 총 가격 */}
                <div className="total-price mb-4">
                  <h5>
                    총 결제 금액: {(product.point * quantity).toLocaleString()}P
                  </h5>
                </div>

                {/* 구매 버튼 */}
                <div className="product-actions">
                  <button
                    className="btn-purchase"
                    onClick={handlePurchase}
                    disabled={
                      product.stock < 1 || userPoints < product.point * quantity
                    }
                  >
                    <iconify-icon
                      icon="mdi:cart"
                      width="20"
                      height="20"
                    ></iconify-icon>
                    구매하기
                  </button>
                  <button
                    className="btn-back"
                    onClick={() => navigate("/pointshop")}
                  >
                    목록으로
                  </button>
                </div>

                {/* 상품 상세 정보 */}
                {product.specs && (
                  <div className="product-specs">
                    <h5>상품 정보</h5>
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div className="spec-item" key={key}>
                        <span className="spec-label">
                          {key === "material"
                            ? "재질"
                            : key === "size"
                            ? "크기"
                            : key === "weight"
                            ? "무게"
                            : key === "origin"
                            ? "원산지"
                            : key === "capacity"
                            ? "용량"
                            : key === "output"
                            ? "출력"
                            : key === "warranty"
                            ? "보증기간"
                            : key === "power"
                            ? "전력"
                            : key === "color"
                            ? "색상"
                            : key}
                        </span>
                        <span className="spec-value">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
=======
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
>>>>>>> a8e8adc8150a987c33332d5fedec4489ec12900d
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
                           src={product.image}
                           alt={product.name}
                           className="product-main-image"
                           onError={(e) => {
                              e.target.src = '/src/assets/images/친환경컵.png'
                           }}
                        />
                     </div>
                  </div>

                  {/* 상품 정보 */}
                  <div className="col-md-6">
                     <div className="product-info-section">
                        <h1 className="product-title">{product.name}</h1>

                        {product.popular && (
                           <div className="mb-3">
                              <span className="badge badge-danger">
                                 <iconify-icon icon="mdi:fire" width="16" height="16"></iconify-icon>
                                 인기상품
                              </span>
                           </div>
                        )}

                        <p className="product-description">{product.description}</p>

                        <div className="product-price">Price: {product.point} points</div>

                        <div className="mb-3">
                           <span className="text-muted">재고: {product.stock}개</span>
                        </div>

                        <div className="mb-3">
                           <span className="text-muted">내 포인트: {userPoints.toLocaleString()}P</span>
                        </div>

                        {/* 수량 선택 */}
                        <div className="quantity-selector mb-4">
                           <label className="form-label">수량</label>
                           <div className="d-flex align-items-center gap-3">
                              <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                                 -
                              </button>
                              <span className="quantity-display px-3">{quantity}</span>
                              <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock}>
                                 +
                              </button>
                           </div>
                        </div>

                        {/* 총 가격 */}
                        <div className="total-price mb-4">
                           <h5>총 결제 금액: {(product.point * quantity).toLocaleString()}P</h5>
                        </div>

                        {/* 구매 버튼 */}
                        <div className="product-actions">
                           <button className="btn-purchase" onClick={handlePurchase} disabled={product.stock < 1 || userPoints < product.point * quantity}>
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
               <PointShop />
            </div>
         </div>
      </div>
   )
}
