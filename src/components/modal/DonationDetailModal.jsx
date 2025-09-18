import React, { useState } from 'react';
import AdminBaseModal from './AdminBaseModal';

const DonationDetailModal = ({ isOpen, onClose, donation, onApprove, onReject }) => {
  const [managerName, setManagerName] = useState('홍길동');
  const [isEditing, setIsEditing] = useState(false);

  if (!donation) return null;

  const handleApprove = () => {
    if (window.confirm(`${donation['회원ID']}의 헌옷 기부를 승인하시겠습니까?`)) {
      if (onApprove) onApprove(donation, managerName);
      alert('헌옷 기부가 승인되었습니다.');
      onClose();
    }
  };

  const handleSaveManager = () => {
    setIsEditing(false);
    alert('담당자 정보가 수정되었습니다.');
  };

  return (
    <AdminBaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="헌옷 기부 신청 내역"
      size="lg"
    >
      <div className="admin-modal-content">
        {/* 우상단 액션 버튼 */}
        <div className="admin-table-actions">
          <button 
            className="btn default main2"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? '저장' : '수정'}
          </button>
        </div>

        {/* 헌옷 기부 신청 내역 */}
        <div>
          <div className="section-header">
            <h6>기부물품 신청 내역</h6>
            <span className="item-count">00개</span>
          </div>
        </div>

        {/* 기부영수증 */}
        <div className='mt-20'>
          <h6>기부영수증</h6>
          <div className="info-grid">
            <div className="info-row">
              <span className="label">이름</span>
              <span className="value">{donation['회원ID']}</span>
            </div>
            <div className="info-row">
              <span className="label">휴대폰</span>
              <span className="value">010-1234-5678</span>
            </div>
            <div className="info-row">
              <span className="label">주소</span>
              <span className="value">인천광역시 남동구 00로 00-00</span>
            </div>
            <div className="info-row">
              <span className="label">이메일</span>
              <span className="value">rifehd1234@gmail.com</span>
            </div>
          </div>
        </div>

        {/* 포인트 정보 */}
        <div className='mt-20'>
          <h6>포인트</h6>
          <div className="info-grid">
            <div className="info-row">
              <span className="label">적립받은 포인트</span>
              <span className="value">nnn,nnnn</span>
            </div>
            <div className="info-row">
              <span className="label">사용한 포인트</span>
              <span className="value">nn,nnnn</span>
            </div>
          </div>
        </div>

        {/* 활동내역 (앞단 정렬) */}
        <div className='mt-20'>
          <h6>활동내역</h6>
          <div className="info-grid">
            <div className="info-row">
              <span className="label">등급</span>
              <span className="value status-good">나무</span>
            </div>
            <div className="info-row">
              <span className="label">기부 활동</span>
              <span className="value">10회</span>
            </div>
            <div className="info-row">
              <span className="label">인증 활동</span>
              <span className="value">18회</span>
            </div>
            <div className="info-row">
              <span className="label">대중교통</span>
              <span className="value">2회</span>
            </div>
            <div className="info-row">
              <span className="label">따돌이</span>
              <span className="value">8회</span>
            </div>
            <div className="info-row">
              <span className="label">네끼로</span>
              <span className="value">8회</span>
            </div>
          </div>
        </div>

        {/* 신청일 */}
        <div className='mt-20'>
          <h6>신청일</h6>
          <div className="info-grid">
            <div className="info-row">
              <span className="label">기부신청일</span>
              <span className="value">{donation['기부일자'] || '2025-10-10'}</span>
            </div>
            <div className="info-row">
              <span className="label">방문수거일</span>
              <span className="value">2025-10-10</span>
            </div>
          </div>
        </div>

        {/* 물품검수 */}
        <div className='mt-20'>
          <h6>물품검수</h6>
          <div className="inspection-grid">
            <div className="inspection-item">
              <span className="label">검수완료</span>
              <span className="value">2025-10-10</span>
            </div>
            <div className="inspection-item">
              <span className="label">물품상태</span>
              <span className="value status-good">양호</span>
            </div>
            <div className="inspection-item">
              <span className="label">검수완료</span>
              <span className={`value ${isEditing ? 'editable' : ''}`}>
                {isEditing ? (
                  <input
                    type="text"
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                    className="form-control form-control-sm"
                  />
                ) : (
                  `담당자:${managerName}`
                )}
              </span>
            </div>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="modal-actions">
          <button 
            className="btn-action btn-approve"
            onClick={handleApprove}
          >
            승인하기
          </button>
          <button 
            className="btn-action btn-reject"
            onClick={() => {
              if (window.confirm('정말 신고하시겠습니까?')) {
                alert('신고 처리되었습니다.');
                onClose();
              }
            }}
          >
            신고하기
          </button>
          <button 
            className="btn-action btn-warn"
            onClick={() => {
              if (window.confirm('경고를 주시겠습니까?')) {
                alert('경고가 전송되었습니다.');
                onClose();
              }
            }}
          >
            경고
          </button>
        </div>
      </div>
    </AdminBaseModal>
  );
};

export default DonationDetailModal;
