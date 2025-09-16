import React from 'react';
import './TableContent.scss';

const TableContent = ({ 
  title, 
  subTabs, 
  activeSubTab, 
  onSubTabChange, 
  columns, 
  data, 
  onDetailsClick,
  currentPage = 1,
  totalPages = 3,
  onPageChange 
}) => {
  return (
    <div className="table-content">
      <h2 className="table-content__title">{title}</h2>
      
      <div className="table-content__main">
        {/* 서브 탭 */}
        {subTabs && subTabs.length > 0 && (
          <div className="table-content__sub-tabs">
            {subTabs.map((subTab) => (
              <button
                key={subTab.id}
                className={`table-content__sub-tab ${activeSubTab === subTab.id ? 'table-content__sub-tab--active' : ''}`}
                onClick={() => onSubTabChange(subTab.id)}
              >
                {subTab.label}
              </button>
            ))}
          </div>
        )}

        {/* 테이블 */}
        <div className="table-content__table-container">
          <table className="table-content__table">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>
                    {column}
                    {index === columns.length - 1 && (
                      <img src="/src/assets/icons/dropdown.svg" alt="필터" className="table-content__filter-icon" />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>
                      {column === '상세' || column === '주문 상세' || column === '상태' || column === '답변완료' || column === '확인 중' || column === '대기' || column === '승인' ? (
                        <button 
                          className="table-content__details-link"
                          onClick={() => onDetailsClick && onDetailsClick(row)}
                        >
                          {row[column] || '자세히 보기'}
                        </button>
                      ) : (
                        row[column]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="table-content__pagination">
        <button 
          className="table-content__pagination-btn"
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <img src="/src/assets/icons/left-line.svg" alt="이전" />
        </button>
        
        <div className="table-content__pagination-pages">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`table-content__pagination-page ${currentPage === page ? 'table-content__pagination-page--active' : ''}`}
              onClick={() => onPageChange && onPageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
        
        <button 
          className="table-content__pagination-btn"
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <img src="/src/assets/icons/right-line.svg" alt="다음" />
        </button>
      </div>
    </div>
  );
};

export default TableContent;
