import React from 'react';
import './ArrowIcon.scss';

const ArrowIcon = ({ 
  direction = 'right', 
  size = 24, 
  className = '', 
  variant = 'simple', // 'simple', 'section', 또는 'stroke'
  color = '#333333' 
}) => {
  const getRotation = () => {
    switch (direction) {
      case 'left': return 'rotate(180deg)';
      case 'up': return 'rotate(-90deg)';
      case 'down': return 'rotate(90deg)';
      case 'right': 
      default: return 'rotate(0deg)';
    }
  };

  // SectionArrow 스타일 (원형 배경이 있는 화살표)
  const sectionArrowPath = "m13.412 12.5l-1.766 1.766q-.14.14-.13.334q.009.194.15.335q.14.14.347.14t.34-.14l2.37-2.37q.243-.242.243-.565t-.243-.565l-2.388-2.389q-.14-.14-.335-.14t-.334.14t-.141.348t.14.34l1.747 1.766H9q-.213 0-.356.144t-.144.357t.144.356T9 12.5zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8";

  // SimpleArrow 스타일 (기존 간단한 화살표)
  const simpleArrowPath = "M12 15.289L15.288 12L12 8.711l-.688.689l2.1 2.1H8.5v1h4.912l-2.1 2.1zM12.003 21q-1.867 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709";

  // StrokeArrow 스타일 (PointShop처럼 생긴 stroke 화살표)
  const strokeArrowPath = "M13.412 12.5l-1.766 1.766q-.14.14-.13.334q.009.194.15.335q.14.14.347.14t.34-.14l2.37-2.37q.243-.242.243-.565t-.243-.565l-2.388-2.389q-.14-.14-.335-.14t-.334.14t-.141.348t.14.34l1.747 1.766H9q-.213 0-.356.144t-.144.357t.144.356T9 12.5zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8";

  const getPathData = () => {
    if (variant === 'section') return sectionArrowPath;
    if (variant === 'stroke') return strokeArrowPath;
    return simpleArrowPath;
  };

  const getFillColor = () => {
    if (variant === 'section') return color;
    if (variant === 'stroke') return color; // stroke variant도 fill 색상 사용
    if (variant === 'simple') return color; // simple variant도 color 사용
    return 'currentColor';
  };

  const getStrokeColor = () => {
    return variant === 'stroke' ? 'none' : 'none';
  };

  const getStrokeWidth = () => {
    return variant === 'stroke' ? '0' : '0';
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24"
      className={`arrow-icon arrow-icon--${direction} ${className}`}
    >
      <rect width="24" height="24" fill="none"/>
      <path 
        fill={getFillColor()} 
        stroke={getStrokeColor()}
        strokeWidth={getStrokeWidth()}
        strokeLinecap="round"
        strokeLinejoin="round"
        d={getPathData()}
      />
    </svg>
  );
};

export default ArrowIcon;
