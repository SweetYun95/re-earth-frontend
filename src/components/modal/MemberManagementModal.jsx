import React, { useState } from 'react';
import AdminBaseModal from './AdminBaseModal';

const MemberManagementModal = ({ isOpen, onClose, member, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userId: member?.['회원ID'] || '',
    name: member?.['이름'] || '',
    email: member?.['이메일'] || '',
    phone: '010-1234-5678',
    address: '인천광역시 남동구 00로 00-00',
    joinDate: member?.['가입일'] || '2025-10-10',
    visitDate: '2025-10-10',
    earnedPoints: 'nnn,nnnn',
    usedPoints: 'nn,nnnn',
    grade: '나무',
    donationCount: '10회',
    certificationCount: '18회',
    transportCount: '2회',
    ddolCount: '8회',
    nekkiroCount: '8회',
    inspectionDate: '2025-10-10',
    itemStatus: '양호',
    manager: '홍길동'
  });

  if (!member) return null;

  const handleSave = () => {
    if (!formData.userId.trim() || !formData.name.trim() || !formData.email.trim()) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    if (onSave) onSave(formData);
    alert('회원 정보가 저장되었습니다.');
    setIsEditing(false);
  };

  const handleAction = (action) => {
    switch (action) {
      case 'approve':
        if (window.confirm(`${formData.name} 회원을 승인하시겠습니까?`)) {
          alert('승인되었습니다.');
          onClose();
        }
        break;
      case 'reject':
        if (window.confirm(`${formData.name} 회원을 회원강퇴하시겠습니까?`)) {
          alert('회원강퇴 처리되었습니다.');
          onClose();
        }
        break;
      case 'warn':
        if (window.confirm(`${formData.name} 회원에게 경고를 주시겠습니까?`)) {
          alert('경고가 전송되었습니다.');
          onClose();
        }
        break;
      default:
        break;
    }
  };

  return (
    <AdminBaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="회원 상세 정보"
      size="lg"
    >
      <div className="admin-modal-content">
        {/* 우상단 액션 버튼 */}
        <div className="admin-table-actions">
          <button 
            className="btn default main2"
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? '저장' : '수정'}
          </button>
          <button 
            className="btn default main3"
            onClick={() => {
              if (window.confirm(`${formData.name} 회원을 삭제하시겠습니까?`)) {
                alert('회원이 삭제되었습니다.');
                onClose();
              }
            }}
          >
            삭제
          </button>
        </div>

        {/* 기부물품 신청 내역 */}
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
              <span className="value">
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                ) : (
                  formData.name
                )}
              </span>
            </div>
            <div className="info-row">
              <span className="label">휴대폰</span>
              <span className="value">
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                ) : (
                  formData.phone
                )}
              </span>
            </div>
            <div className="info-row">
              <span className="label">주소</span>
              <span className="value">
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                ) : (
                  formData.address
                )}
              </span>
            </div>
            <div className="info-row">
              <span className="label">이메일</span>
              <span className="value">
                {isEditing ? (
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                ) : (
                  formData.email
                )}
              </span>
            </div>
          </div>
        </div>

        {/* 포인트 정보 */}
        <div className='mt-20'>
          <h6>포인트</h6>
          <div className="info-grid">
            <div className="info-row">
              <span className="label">적립받은 포인트</span>
              <span className="value">{formData.earnedPoints}</span>
            </div>
            <div className="info-row">
              <span className="label">사용한 포인트</span>
              <span className="value">{formData.usedPoints}</span>
            </div>
          </div>
        </div>

        {/* 활동내역 */}
        <div className='mt-20'>
          <h6>활동내역</h6>
          <div className="info-grid">
            <div className="info-row">
              <span className="label">등급</span>
              <span className="value status-good">{formData.grade}</span>
            </div>
            <div className="info-row">
              <span className="label">기부 활동</span>
              <span className="value">{formData.donationCount}</span>
            </div>
            <div className="info-row">
              <span className="label">인증 활동</span>
              <span className="value">{formData.certificationCount}</span>
            </div>
            <div className="info-row">
              <span className="label">대중교통</span>
              <span className="value">{formData.transportCount}</span>
            </div>
            <div className="info-row">
              <span className="label">따돌이</span>
              <span className="value">{formData.ddolCount}</span>
            </div>
            <div className="info-row">
              <span className="label">네끼로</span>
              <span className="value">{formData.nekkiroCount}</span>
            </div>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="modal-actions">
          <button 
            className="btn-action btn-approve"
            onClick={() => handleAction('approve')}
          >
            승인하기
          </button>
          <button 
            className="btn-action btn-reject"
            onClick={() => handleAction('reject')}
          >
            회원강퇴
          </button>
          <button 
            className="btn-action btn-warn"
            onClick={() => handleAction('warn')}
          >
            경고
          </button>
        </div>
      </div>
    </AdminBaseModal>
  );
};

export default MemberManagementModal;
