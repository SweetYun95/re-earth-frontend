import React, { useState } from 'react';
import AdminBaseModal from './AdminBaseModal';

const EventEditModal = ({ isOpen, onClose, event, onSave, type = 'banner' }) => {
  const [formData, setFormData] = useState({
    // 히어로 배너 필드
    bannerName: event?.['배너명'] || '',
    title: event?.['제목'] || '',
    subtitle: event?.['부제목'] || '',
    image: event?.['이미지'] || '',
    link: event?.['링크'] || '',
    startDate: event?.['시작일'] || '',
    endDate: event?.['종료일'] || '',
    order: event?.['노출순서'] || '',
    status: event?.['상태'] || '활성',
    
    // 오늘의 미션 필드
    missionName: event?.['미션명'] || '',
    description: event?.['설명'] || '',
    points: event?.['포인트'] || '',
    missionType: event?.['미션타입'] || '',
    condition: event?.['달성조건'] || '',
    timeLimit: event?.['제한시간'] || '',
    createdDate: event?.['생성일'] || ''
  });

  if (!event) return null;

  const handleSave = () => {
    if (type === 'banner') {
      if (!formData.bannerName.trim() || !formData.title.trim()) {
        alert('배너명과 제목을 입력해주세요.');
        return;
      }
    } else {
      if (!formData.missionName.trim() || !formData.description.trim()) {
        alert('미션명과 설명을 입력해주세요.');
        return;
      }
    }

    if (onSave) onSave(formData);
    alert(`${type === 'banner' ? '배너' : '미션'}가 수정되었습니다.`);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      alert(`${type === 'banner' ? '배너' : '미션'}가 삭제되었습니다.`);
      onClose();
    }
  };

  return (
    <AdminBaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={type === 'banner' ? '히어로 배너 수정' : '오늘의 미션 수정'}
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

        {type === 'banner' ? (
          // 히어로 배너 편집 폼
          <>
            <div>
              <h6>배너 정보</h6>
              <div className="info-grid">
                <div className="info-row">
                  <span className="label">배너명</span>
                  <span className="value">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.bannerName}
                      onChange={(e) => setFormData({...formData, bannerName: e.target.value})}
                    />
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">제목</span>
                  <span className="value">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">부제목</span>
                  <span className="value">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                    />
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">이미지 URL</span>
                  <span className="value">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                    />
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">링크 URL</span>
                  <span className="value">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.link}
                      onChange={(e) => setFormData({...formData, link: e.target.value})}
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className='mt-20'>
              <h6>노출 설정</h6>
              <div className="info-grid">
                <div className="info-row">
                  <span className="label">시작일</span>
                  <span className="value">
                    <input
                      type="date"
                      className="form-control"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    />
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">종료일</span>
                  <span className="value">
                    <input
                      type="date"
                      className="form-control"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    />
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">노출순서</span>
                  <span className="value">
                    <input
                      type="number"
                      className="form-control"
                      value={formData.order}
                      onChange={(e) => setFormData({...formData, order: e.target.value})}
                    />
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">상태</span>
                  <span className="value">
                    <select
                      className="form-control"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="활성">활성</option>
                      <option value="비활성">비활성</option>
                      <option value="예약">예약</option>
                    </select>
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          // 오늘의 미션 편집 폼
          <>
            <div className='mt-20'>
              <h6>미션 정보</h6>
              <div className="info-grid">
                <div className="info-row">
                  <span className="label">미션명</span>
                  <span className="value">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.missionName}
                      onChange={(e) => setFormData({...formData, missionName: e.target.value})}
                    />
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">설명</span>
                  <span className="value">
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">포인트</span>
                  <span className="value">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.points}
                      onChange={(e) => setFormData({...formData, points: e.target.value})}
                    />
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">미션타입</span>
                  <span className="value">
                    <select
                      className="form-control"
                      value={formData.missionType}
                      onChange={(e) => setFormData({...formData, missionType: e.target.value})}
                    >
                      <option value="대중교통">대중교통</option>
                      <option value="커뮤니티">커뮤니티</option>
                      <option value="구매">구매</option>
                      <option value="기부">기부</option>
                      <option value="인증">인증</option>
                    </select>
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">달성조건</span>
                  <span className="value">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.condition}
                      onChange={(e) => setFormData({...formData, condition: e.target.value})}
                    />
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">제한시간</span>
                  <span className="value">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.timeLimit}
                      onChange={(e) => setFormData({...formData, timeLimit: e.target.value})}
                    />
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">상태</span>
                  <span className="value">
                    <select
                      className="form-control"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="활성">활성</option>
                      <option value="비활성">비활성</option>
                      <option value="임시저장">임시저장</option>
                    </select>
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 액션 버튼 */}
        <div className="modal-actions">
          <button 
            className="btn-action btn-approve"
            onClick={handleSave}
          >
            저장하기
          </button>
        </div>
      </div>
    </AdminBaseModal>
  );
};

export default EventEditModal;
