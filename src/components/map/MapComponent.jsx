import React from 'react';

const MapComponent = ({ center = { lat: 37.5665, lng: 126.9780 }, zoom = 13, className = '' }) => {
  return (
    <div 
      className={`map-container ${className}`}
      style={{ 
        width: '100%', 
        height: '300px', 
        borderRadius: '8px',
        background: '#f8f9fa',
        border: '1px solid #dee2e6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <div className="text-center text-muted">
        <div style={{fontSize: '48px', marginBottom: '16px'}}>🗺️</div>
        <h6>지도가 여기에 표시됩니다</h6>
        <small>카카오맵 API 연동 예정</small>
      </div>
    </div>
  );
};

export default MapComponent;
