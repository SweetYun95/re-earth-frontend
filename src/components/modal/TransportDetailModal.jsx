import React, { useState } from 'react';
import AdminBaseModal from './AdminBaseModal';

const TransportDetailModal = ({ isOpen, onClose, transport, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userId: transport?.['회원ID'] || '',
    date: transport?.['날짜'] || '',
    distance: transport?.['이동거리(km)'] || '',
    points: transport?.['포인트 적립'] || '',
    status: transport?.['승인상태'] || '',
    transportType: transport?.['상세정보']?.['교통수단'] || '',
    startLocation: transport?.['상세정보']?.['출발지'] || '',
    endLocation: transport?.['상세정보']?.['도착지'] || '',
    usageTime: transport?.['상세정보']?.['이용시간'] || '',
    actualDistance: transport?.['상세정보']?.['실제거리'] || ''
  });

  if (!transport) return null;

  const handleSave = () => {
    if (onSave) onSave(formData);
    alert('대중교통 이용 내역이 수정되었습니다.');
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      alert('대중교통 이용 내역이 삭제되었습니다.');
      onClose();
    }
  };

  return (
    <AdminBaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="대중교통 이용 상세"
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
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>

        {/* 기본 정보 */}
        <div className='mt-20'>
          <h6>이용 정보</h6>
          <div className="info-grid">
            <div className="info-row">
              <span className="label">회원ID</span>
              <span className="value">{formData.userId}</span>
            </div>
            <div className="info-row">
              <span className="label">이용일자</span>
              <span className="value">{formData.date}</span>
            </div>
            <div className="info-row">
              <span className="label">교통수단</span>
              <span className="value">{formData.transportType}</span>
            </div>
            <div className="info-row">
              <span className="label">이동거리</span>
              <span className="value">{formData.distance}</span>
            </div>
            <div className="info-row">
              <span className="label">적립 포인트</span>
              <span className="value">{formData.points}</span>
            </div>
          </div>
        </div>

        {/* 상세 이용 정보 */}
        <div className='mt-20'>
          <h6>상세 정보</h6>
          <div className="info-grid">
            <div className="info-row">
              <span className="label">출발지</span>
              <span className="value">{formData.startLocation}</span>
            </div>
            <div className="info-row">
              <span className="label">도착지</span>
              <span className="value">{formData.endLocation}</span>
            </div>
            <div className="info-row">
              <span className="label">이용시간</span>
              <span className="value">{formData.usageTime}</span>
            </div>
            <div className="info-row">
              <span className="label">실제거리</span>
              <span className="value">{formData.actualDistance}</span>
            </div>
          </div>
        </div>

        {/* 승인 상태 */}
        <div className='mt-20'>
          <h6>승인 상태</h6>
          <div className="info-grid">
            <div className="info-row">
              <span className="label">현재 상태</span>
              <span className="value">
                {isEditing ? (
                  <select
                    className="form-control form-control-sm"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="완료">완료</option>
                    <option value="대기">대기</option>
                    <option value="반려">반려</option>
                  </select>
                ) : (
                  <span className={`badge ${formData.status === '완료' ? 'badge-success' : formData.status === '대기' ? 'badge-warning' : 'badge-danger'}`}>
                    {formData.status}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="modal-actions">
          <button 
            className="btn-action btn-approve"
            onClick={() => {
              if (window.confirm('이용 내역을 승인하시겠습니까?')) {
                alert('승인되었습니다.');
                onClose();
              }
            }}
          >
            승인하기
          </button>
          <button 
            className="btn-action btn-reject"
            onClick={() => {
              if (window.confirm('이용 내역을 반려하시겠습니까?')) {
                alert('반려되었습니다.');
                onClose();
              }
            }}
          >
            반려하기
          </button>
          <button 
            className="btn-action btn-warn"
            onClick={() => {
              if (window.confirm('해당 회원에게 경고를 주시겠습니까?')) {
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

export default TransportDetailModal;
