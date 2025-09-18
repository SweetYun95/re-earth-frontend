import React, { useState } from 'react';
import AdminBaseModal from './AdminBaseModal';

const CommunityEditModal = ({ isOpen, onClose, post, onSave }) => {
  const [formData, setFormData] = useState({
    title: post?.['제목'] || '',
    content: post?.['내용'] || '',
    category: post?.['카테고리'] || '',
    author: post?.['작성자'] || '',
    views: post?.['조회수'] || '',
    comments: post?.['댓글수'] || '',
    status: post?.['상태'] || ''
  });

  if (!post) return null;

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!formData.content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    if (onSave) onSave(formData);
    alert('게시글이 수정되었습니다.');
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      alert('게시글이 삭제되었습니다.');
      onClose();
    }
  };

  return (
    <AdminBaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="커뮤니티 게시글 수정"
      size="lg"
    >
      <div className="admin-modal-content">
        {/* 우상단 액션 버튼 */}
        <div className="admin-table-actions">
          <button 
            className="btn default main2"
            onClick={handleSave}
          >
            저장
          </button>
          <button 
            className="btn default main3"
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>

        {/* 제목 */}
        <div>
          <h6>제목</h6>
          <div className="info-grid">
            <div className="info-row">
              <input
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="제목을 입력하세요"
              />
            </div>
          </div>
        </div>

        {/* 내용 */}
        <div  className='mt-20'>
          <h6>내용</h6>
          <div className="info-grid">
            <div className="info-row">
              <textarea
                className="form-control"
                rows="6"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="내용을 입력하세요"
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>
          </div>
        </div>

        {/* 글정보 */}
        <div  className='mt-20'>
          <h6>글정보</h6>
          <div className="info-grid">
            <div className="info-row">
              <span className="label">작성자</span>
              <span className="value">{formData.author}</span>
            </div>
            <div className="info-row">
              <span className="label">카테고리</span>
              <span className="value">
                <select
                  className="form-control form-control-sm"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="정보공유">정보공유</option>
                  <option value="후기">후기</option>
                  <option value="챌린지">챌린지</option>
                  <option value="질문">질문</option>
                  <option value="자유">자유</option>
                </select>
              </span>
            </div>
            <div className="info-row">
              <span className="label">작성일</span>
              <span className="value">{post?.['작성일'] || '2025-10-10'}</span>
            </div>
            <div className="info-row">
              <span className="label">조회수</span>
              <span className="value">{formData.views}</span>
            </div>
            <div className="info-row">
              <span className="label">댓글</span>
              <span className="value">{formData.comments}</span>
            </div>
          </div>
        </div>

        {/* 신고 */}
        <div  className='mt-20'>
          <h6>신고</h6>
          <div className="info-grid">
            <div className="info-row">
              <span className="label">신고건</span>
              <span className="value">1</span>
            </div>
            <div className="info-row">
              <span className="label">위반이유</span>
              <span className="value">부적절한 용어사용</span>
            </div>
            <div className="info-row">
              <span className="label">확인완료</span>
              <span className="value">담당자:홍길동</span>
            </div>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="modal-actions">
          <button 
            className="btn-action btn-approve"
            onClick={() => {
              if (window.confirm('게시글을 승인하시겠습니까?')) {
                alert('게시글이 승인되었습니다.');
                onClose();
              }
            }}
          >
            저장하기
          </button>
          <button 
            className="btn-action btn-reject"
            onClick={() => {
              if (window.confirm('게시글을 신고하시겠습니까?')) {
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
              if (window.confirm('게시글을 경고하시겠습니까?')) {
                alert('경고 처리되었습니다.');
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

export default CommunityEditModal;
