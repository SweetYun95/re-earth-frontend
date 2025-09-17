import React, { useState } from 'react';
import AdminFilter from './AdminFilter';
import Pagination from '../../common/Pagination';
import './AdminTableLayout.scss';

const AdminTableLayout = ({ 
  title, 
  columns, 
  data, 
  onRowClick,
  filterOptions = {},
  showActions = true,
  actionButtons = [],
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showFilter = true
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleFilterChange = (filters) => {
    // 필터링 로직
    let filtered = data;
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(row => 
          row[key] && row[key].toString().toLowerCase().includes(value.toLowerCase())
        );
      }
    });
    
    setFilteredData(filtered);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filteredData.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (index) => {
    setSelectedRows(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="admin-table-layout">
      {/* 헤더 */}
      <div className="admin-table-layout__header">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="admin-table-layout__title">{title}</h2>
          </div>
          <div className="col-md-6">
            {showActions && (
              <div className="admin-table-layout__actions">
                {actionButtons.map((button, index) => (
                  <button
                    key={index}
                    className={`btn ${button.className || 'btn default main1'}`}
                    onClick={button.onClick}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 필터 */}
      {showFilter && (
        <AdminFilter
          options={filterOptions}
          onFilterChange={handleFilterChange}
        />
      )}

      {/* 테이블 */}
      <div className="admin-table-layout__table-container">
        <table className="table admin-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === filteredData.length}
                />
              </th>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                className={selectedRows.includes(rowIndex) ? 'selected' : ''}
                onClick={() => onRowClick && onRowClick(row)}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(rowIndex)}
                    onChange={() => handleSelectRow(rowIndex)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column]}</td>
                ))}
                <td>
                  <div className="admin-table__actions">
                    <button className="btn btn-sm btn-outline-primary">수정</button>
                    <button className="btn btn-sm btn-outline-danger">삭제</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="admin-table-layout__pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}

      {/* 선택된 행 정보 */}
      {selectedRows.length > 0 && (
        <div className="admin-table-layout__selection-info">
          <span>{selectedRows.length}개 항목이 선택됨</span>
          <button className="btn btn-sm btn-outline-danger ml-2">
            선택 삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminTableLayout;
