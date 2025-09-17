import React from 'react';
import AdminBaseModal from './AdminBaseModal';

const AdminMemberDetailModal = ({ isOpen, onClose, member, onEdit }) => {
  if (!member) return null;

  return (
    <AdminBaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="회원 상세 정보"
      size="lg"
    >
      <div className="member-detail">
        {/* 기본 정보 섹션 */}
        <div className="member-detail__section mb-4">
          <h5 className="member-detail__section-title">기본 정보</h5>
          <div className="member-detail__info-grid">
            <div className="member-detail__info-item">
              <span className="member-detail__info-label">회원ID</span>
              <span className="member-detail__info-value">{member['회원ID']}</span>
            </div>
            <div className="member-detail__info-item">
              <span className="member-detail__info-label">이름</span>
              <span className="member-detail__info-value">{member['이름']}</span>
            </div>
            <div className="member-detail__info-item">
              <span className="member-detail__info-label">이메일</span>
              <span className="member-detail__info-value">{member['이메일']}</span>
            </div>
            <div className="member-detail__info-item">
              <span className="member-detail__info-label">휴대폰</span>
              <span className="member-detail__info-value">010-1234-5678</span>
            </div>
            <div className="member-detail__info-item">
              <span className="member-detail__info-label">주소</span>
              <span className="member-detail__info-value">인천광역시 남동구 00로 00-00</span>
            </div>
            <div className="member-detail__info-item">
              <span className="member-detail__info-label">가입일</span>
              <span className="member-detail__info-value">{member['가입일']}</span>
            </div>
            <div className="member-detail__info-item">
              <span className="member-detail__info-label">포인트</span>
              <span className="member-detail__info-value">{member['포인트']}</span>
            </div>
            <div className="member-detail__info-item">
              <span className="member-detail__info-label">상태</span>
              <span className={`admin-badge admin-badge--${member['상태'] === '활성' ? 'active' : 'inactive'}`}>
                {member['상태']}
              </span>
            </div>
          </div>
        </div>

        {/* 활동 내역 */}
        <div className="member-detail__section mb-4">
          <h5 className="member-detail__section-title">활동 내역</h5>
          <div className="row">
            <div className="col-md-4">
              <div className="member-detail__stat-card">
                <h6>총 기부</h6>
                <span className="member-detail__stat-value text-success">15회</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="member-detail__stat-card">
                <h6>포인트 사용</h6>
                <span className="member-detail__stat-value text-primary">8회</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="member-detail__stat-card">
                <h6>커뮤니티 활동</h6>
                <span className="member-detail__stat-value text-info">23회</span>
              </div>
            </div>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="member-detail__actions">
          <button 
            className="btn default main1"
            onClick={() => onEdit(member)}
          >
            정보 수정
          </button>
          <button className="btn default main3">
            계정 정지
          </button>
          <button className="btn default main2">
            포인트 조정
          </button>
          <button className="btn default main4">
            메시지 발송
          </button>
        </div>
      </div>
    </AdminBaseModal>
  );
};

export default AdminMemberDetailModal;
