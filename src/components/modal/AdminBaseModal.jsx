import React from 'react';
import './AdminBaseModal.scss';

const AdminBaseModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true 
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="admin-base-modal__overlay" onClick={handleOverlayClick}>
      <div className={`admin-base-modal__content admin-base-modal__content--${size}`}>
        {/* 모달 헤더 */}
        <div className="admin-base-modal__header">
          <h3 className="admin-base-modal__title">{title}</h3>
          {showCloseButton && (
            <button 
              className="admin-base-modal__close"
              onClick={onClose}
            >
              ×
            </button>
          )}
        </div>

        {/* 모달 바디 */}
        <div className="admin-base-modal__body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminBaseModal;
