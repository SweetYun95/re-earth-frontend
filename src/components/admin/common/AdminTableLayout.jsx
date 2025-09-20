// re-erearth-frontend/src/components/admin/common/AdminTableLayout.jsx
import { useState } from 'react'
import AdminFilter from './AdminFilter'
import Pagination from '../../common/Pagination'
import './AdminTableLayout.scss'

/**
 * 서버사이드 필터/페이지 기준으로 개편:
 * - 내부 filteredData 제거
 * - onFilterChange -> 부모 onApplyFilters 호출
 * - 체크박스는 row.id 기반으로 선택 관리
 */
const AdminTableLayout = ({
   title,
   columns,
   data,
   onRowClick,
   onRowDoubleClick,
   filterOptions = {},
   onApplyFilters, // ✅ 추가: 필터 변경 시 부모로 알림
   showActions = true,
   actionButtons = [],
   currentPage = 1,
   totalPages = 1,
   onPageChange,
   showFilter = true,
   enableCheckbox = true,
   enableDoubleClick = true,
   onBulkDelete,
}) => {
   const [selectedRows, setSelectedRows] = useState([]) // row.id 배열

   const handleFilterChange = (filters) => {
      onApplyFilters && onApplyFilters(filters)
   }

   const handleSelectAll = (e) => {
      if (e.target.checked) {
         setSelectedRows(data.map((row) => row.id).filter(Boolean))
      } else {
         setSelectedRows([])
      }
   }

   const handleSelectRow = (rowId, e) => {
      e.stopPropagation()
      setSelectedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]))
   }

   const handleBulkDeleteClick = () => {
      if (selectedRows.length === 0) {
         alert('삭제할 항목을 선택해주세요.')
         return
      }
      if (window.confirm(`선택한 ${selectedRows.length}개 항목을 삭제하시겠습니까?`)) {
         if (onBulkDelete) {
            const selectedData = data.filter((row) => selectedRows.includes(row.id))
            onBulkDelete(selectedData)
         }
         setSelectedRows([])
      }
   }

   const handleRowEdit = (row, e) => {
      e.stopPropagation()
      if (enableDoubleClick && onRowDoubleClick) {
         onRowDoubleClick(row)
      } else {
         alert(`${row[columns[0]] || '항목'} 수정 기능을 실행합니다.`)
      }
   }

   return (
      <div className="admin-table-layout">
         {/* 헤더 */}
         <div className="admin-table-layout__header">
            <div className="row align-items-center">
               <div className="col-md-8">
                  <h2 className="admin-table-layout__title">{title}</h2>
               </div>
               <div className="col-md-4">
                  {enableCheckbox && (
                     <div className="d-flex justify-content-end">
                        <button className="btn default main3" onClick={handleBulkDeleteClick} disabled={selectedRows.length === 0}>
                           삭제 ({selectedRows.length})
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* 필터 */}
         {showFilter && <AdminFilter options={filterOptions} onFilterChange={handleFilterChange} />}

         {/* 테이블 */}
         <div className="admin-table-layout__table-container">
            <table className="table admin-table">
               <thead>
                  <tr>
                     {enableCheckbox && (
                        <th width="50">
                           <input type="checkbox" onChange={handleSelectAll} checked={data.length > 0 && selectedRows.length === data.length} />
                        </th>
                     )}
                     {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                     ))}
                     <th width="80">수정</th>
                  </tr>
               </thead>
               <tbody>
                  {data.map((row, rowIndex) => (
                     <tr
                        key={row.id ?? rowIndex}
                        className={selectedRows.includes(row.id) ? 'selected' : ''}
                        onClick={() => onRowClick && onRowClick(row)}
                        onDoubleClick={() => enableDoubleClick && onRowDoubleClick && onRowDoubleClick(row)}
                        style={{ cursor: enableDoubleClick ? 'pointer' : 'default' }}
                     >
                        {enableCheckbox && (
                           <td>
                              <input type="checkbox" checked={selectedRows.includes(row.id)} onChange={(e) => handleSelectRow(row.id, e)} onClick={(e) => e.stopPropagation()} />
                           </td>
                        )}
                        {columns.map((column, colIndex) => (
                           <td key={colIndex}>{row[column]}</td>
                        ))}
                        <td>
                           <button className="btn default main2" onClick={(e) => handleRowEdit(row, e)} title="수정" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>
                              ✏️
                           </button>
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
                  pagination={{
                     currentPage,
                     totalPages,
                     onPageChange,
                  }}
               />
            </div>
         )}

         {/* 액션 버튼들 (하단) */}
         {showActions && actionButtons.length > 0 && (
            <div className="admin-table-layout__bottom-actions">
               <div className="d-flex justify-content-center gap-2 mt-3">
                  {actionButtons.map((button, index) => (
                     <button key={index} className={`btn ${button.className || 'btn default main1'}`} onClick={button.onClick}>
                        {button.label}
                     </button>
                  ))}
               </div>
            </div>
         )}

         {/* 선택된 행 정보 */}
         {enableCheckbox && selectedRows.length > 0 && (
            <div className="admin-table-layout__selection-info">
               <div className="alert alert-info d-flex justify-content-between align-items-center mt-3">
                  <span>{selectedRows.length}개 항목이 선택됨</span>
                  <button className="btn default main3" onClick={handleBulkDeleteClick} style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                     선택 항목 삭제
                  </button>
               </div>
            </div>
         )}
      </div>
   )
}

export default AdminTableLayout
