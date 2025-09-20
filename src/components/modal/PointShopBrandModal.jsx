import React, { useState } from 'react';
import AdminBaseModal from './AdminBaseModal';

const PointShopBrandModal = ({ isOpen, onClose, brand, onSave }) => {
  const [formData, setFormData] = useState({
    partner: brand?.['브랜드 파트너'] || '(주)000',
    brandInfo: brand?.['브랜드 인사말'] || '',
    phone: brand?.['대표전화번호'] || '010-1234-5678',
    address: brand?.['주소'] || '인천광역시 남동구 00로 00-00',
    email: brand?.['이메일'] || 'rifehd1234@gmail.com',
    contractStart: brand?.['계약시작일'] || '2025-10-10',
    contractEnd: brand?.['계약만료일'] || '2026-10-10',
    totalProducts: brand?.['총 상품'] || '50개',
    clothingProducts: brand?.['의류'] || '40개',
    livingProducts: brand?.['생활용품'] || '10개'
  });

  if (!brand) return null;

  const handleSave = () => {
    if (!formData.partner.trim()) {
      alert('브랜드 파트너명을 입력해주세요.');
      return;
    }

    if (onSave) onSave(formData);
    alert('브랜드 정보가 수정되었습니다.');
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      alert('브랜드가 삭제되었습니다.');
      onClose();
    }
  };

  return (
    <AdminBaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="포인트샵 브랜드 관리"
      size="lg"
    >
      <div className="admin-modal-content">
        {/* 우상단 액션 버튼 */}
        <div className="admin-table-actions">
          <button 
            className="btn default main2"
            onClick={handleSave}
          >
            수정
          </button>
          <button 
            className="btn default main3"
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>

        {/* 브랜드 파트너 */}
        <div>
          <h6>브랜드 파트너</h6>
          <div className="info-grid">
            <div className="info-row">
              <input
                type="text"
                className="form-control"
                value={formData.partner}
                onChange={(e) => setFormData({...formData, partner: e.target.value})}
                placeholder="브랜드 파트너명을 입력하세요"
              />
            </div>
          </div>
        </div>

        {/* 브랜드 상세정보 */}
        <div className='mt-20'>
          <h6>브랜드 상세정보</h6>
          <div className="info-grid">
            <div className="info-row">
              <span className="label">브랜드 인사말</span>
              <span className="value">
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.brandInfo}
                  onChange={(e) => setFormData({...formData, brandInfo: e.target.value})}
                  placeholder="브랜드 인사말을 입력하세요"
                />
              </span>
            </div>
            <div className="info-row">
              <span className="label">대표전화번호</span>
              <span className="value">
                <input
                  type="text"
                  className="form-control"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </span>
            </div>
            <div className="info-row">
              <span className="label">주소</span>
              <span className="value">
                <input
                  type="text"
                  className="form-control"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </span>
            </div>
            <div className="info-row">
              <span className="label">이메일</span>
              <span className="value">
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </span>
            </div>
          </div>
        </div>

        {/* 계약기간 */}
        <div className='mt-20'>
          <h6>계약기간</h6>
          <div className="info-grid">
            <div className="info-row">
              <span className="label">계약시작일</span>
              <span className="value">
                <input
                  type="date"
                  className="form-control"
                  value={formData.contractStart}
                  onChange={(e) => setFormData({...formData, contractStart: e.target.value})}
                />
              </span>
            </div>
            <div className="info-row">
              <span className="label">계약만료일</span>
              <span className="value">
                <input
                  type="date"
                  className="form-control"
                  value={formData.contractEnd}
                  onChange={(e) => setFormData({...formData, contractEnd: e.target.value})}
                />
              </span>
            </div>
          </div>
        </div>

        {/* 상품 정보 */}
        <div className='mt-20'>
          <h6>상품 정보</h6>
          <div className="info-grid">
            <div className="info-row">
              <span className="label">총 상품</span>
              <span className="value">
                <input
                  type="text"
                  className="form-control"
                  value={formData.totalProducts}
                  onChange={(e) => setFormData({...formData, totalProducts: e.target.value})}
                />
              </span>
            </div>
            <div className="info-row">
              <span className="label">의류</span>
              <span className="value">
                <input
                  type="text"
                  className="form-control"
                  value={formData.clothingProducts}
                  onChange={(e) => setFormData({...formData, clothingProducts: e.target.value})}
                />
              </span>
            </div>
            <div className="info-row">
              <span className="label">생활용품</span>
              <span className="value">
                <input
                  type="text"
                  className="form-control"
                  value={formData.livingProducts}
                  onChange={(e) => setFormData({...formData, livingProducts: e.target.value})}
                />
              </span>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="modal-actions">
          <button 
            className="btn-action btn-approve"
            onClick={handleSave}
          >
            수정하기
          </button>
        </div>
      </div>
    </AdminBaseModal>
  );
};

export default PointShopBrandModal;
