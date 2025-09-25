// re-earth-frontend/src/components/admin/CustomerServiceContent.jsx
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminTableLayout from './common/AdminTableLayout'
import { adminFetchQnaListThunk, adminAnswerQnaThunk, adminUpdateQnaStatusThunk } from '../../features/adminQnaSlice'

const CustomerServiceContent = () => {
   const dispatch = useDispatch()
   const [activeSubTab, setActiveSubTab] = useState('inquiry-1on1')
   const [expandedRows, setExpandedRows] = useState({})

   // 페이징/필터 상태 (관리자 1:1 문의 탭에서만 사용)
   const [page, setPage] = useState(1)
   const [size] = useState(20)
   const [statusFilter, setStatusFilter] = useState('') // '', OPEN, ANSWERED, CLOSED

   // Redux - 관리자 QnA 목록
   const { items, total, loading, error } = useSelector((s) => s.adminQna || { items: [], total: 0, loading: false, error: null })
   const totalPages = useMemo(() => Math.max(1, Math.ceil((total || 0) / size)), [total, size])

   // 서브 탭 목록
   const subTabs = [
      { id: 'inquiry-1on1', label: '1:1문의', icon: 'mdi:chat-question' },
      { id: 'inquiry-faq', label: 'FAQ', icon: 'mdi:help-circle' },
      { id: 'inquiry-voice', label: '고객의소리', icon: 'mdi:bullhorn' },
      { id: 'inquiry-category', label: '문의사항 카테고리', icon: 'mdi:tag-multiple' },
      { id: 'admin-board', label: '관리자 게시판', icon: 'mdi:account-tie' },
      { id: 'admin-board-category', label: '관리자 게시판 카테고리', icon: 'mdi:folder-multiple' },
   ]

   // ─────────────────────────────
   // 더미 데이터 (다른 서브탭은 그대로)
   // ─────────────────────────────
   const inquiryFaqData = [
      { id: 2, 문의일: '2025-01-14', 회원ID: 'user002', 카테고리: '포인트', 제목: '포인트 적립 방법', 내용: '대중교통 이용 시 포인트는...', 우선순위: '낮음', 상태: '답변완료', 담당자: '관리자2', 처리일: '2025-01-14' },
      { id: 5, 문의일: '2025-01-10', 회원ID: 'user005', 카테고리: '포인트샵', 제목: '상품 교환 정책', 내용: '구매한 상품의 교환이 가능한가요?', 우선순위: '보통', 상태: '답변완료', 담당자: '관리자3', 처리일: '2025-01-10' },
   ]
   const inquiryVoiceData = [
      { id: 3, 문의일: '2025-01-13', 회원ID: 'user003', 카테고리: '서비스개선', 제목: '앱 사용성 개선 요청', 내용: '포인트샵 로딩이 느립니다.', 우선순위: '높음', 상태: '처리중', 담당자: '관리자1', 처리일: '' },
      { id: 6, 문의일: '2025-01-09', 회원ID: 'user006', 카테고리: 'UI/UX', 제목: '메뉴 구조 개선 제안', 내용: '메뉴가 너무 복잡합니다.', 우선순위: '보통', 상태: '검토중', 담당자: '관리자2', 처리일: '' },
   ]
   const inquiryCategoryData = [
      { 카테고리명: '기부', 문의건수: '45건', 정렬순서: '1', 생성일: '2024-12-01', 상태: '활성' },
      { 카테고리명: '포인트', 문의건수: '123건', 정렬순서: '2', 생성일: '2024-12-01', 상태: '활성' },
      { 카테고리명: '계정', 문의건수: '67건', 정렬순서: '3', 생성일: '2024-12-01', 상태: '활성' },
      { 카테고리명: '서비스개선', 문의건수: '89건', 정렬순서: '4', 생성일: '2024-12-01', 상태: '활성' },
      { 카테고리명: '기타', 문의건수: '34건', 정렬순서: '5', 생성일: '2024-12-01', 상태: '활성' },
   ]
   const adminBoardData = [
      { 제목: '고객센터 운영 가이드라인', 카테고리: '운영정책', 작성자: '관리자', 작성일: '2025-01-15', 조회수: '45', 상태: '게시' },
      { 제목: '신규 FAQ 등록 안내', 카테고리: 'FAQ관리', 작성자: '관리자', 작성일: '2025-01-14', 조회수: '23', 상태: '게시' },
      { 제목: '고객 응대 매뉴얼 업데이트', 카테고리: '매뉴얼', 작성자: '관리자', 작성일: '2025-01-13', 조회수: '67', 상태: '게시' },
   ]
   const adminBoardCategoryData = [
      { 카테고리명: '운영정책', 게시글수: '12개', 생성일: '2024-12-01', 상태: '활성' },
      { 카테고리명: 'FAQ관리', 게시글수: '8개', 생성일: '2024-12-01', 상태: '활성' },
      { 카테고리명: '매뉴얼', 게시글수: '15개', 생성일: '2024-12-01', 상태: '활성' },
      { 카테고리명: '교육자료', 게시글수: '6개', 생성일: '2024-12-01', 상태: '활성' },
   ]

   // 행 확장/축소 토글
   const toggleRowExpansion = (rowId) => {
      setExpandedRows((prev) => ({ ...prev, [rowId]: !prev[rowId] }))
   }

   // ─────────────────────────────
   // 관리자 1:1 문의 실제 연동
   // ─────────────────────────────
   useEffect(() => {
      if (activeSubTab !== 'inquiry-1on1') return
      dispatch(
         adminFetchQnaListThunk({
            page,
            size,
            status: statusFilter || undefined, // '' → undefined로 보내면 필터 미적용
         })
      )
   }, [dispatch, activeSubTab, page, size, statusFilter])

   const handleInquiryAction = async (action, item) => {
      switch (action) {
         case 'answer': {
            const body = window.prompt('답변 내용을 입력하세요:')
            if (!body || !body.trim()) return
            try {
               await dispatch(adminAnswerQnaThunk({ id: item.id, body: body.trim() })).unwrap()
               // 서버에서 OPEN → ANSWERED로 자동 변경하므로 목록 갱신
               await dispatch(adminFetchQnaListThunk({ page, size, status: statusFilter || undefined }))
               alert('답변이 등록되었습니다.')
            } catch (e) {
               console.error(e)
               alert('답변 등록 실패')
            }
            break
         }
         case 'close': {
            if (!window.confirm('해당 문의를 종료(CLOSED) 처리할까요?')) return
            try {
               await dispatch(adminUpdateQnaStatusThunk({ id: item.id, status: 'CLOSED' })).unwrap()
               alert('종료되었습니다.')
            } catch (e) {
               console.error(e)
               alert('상태 변경 실패')
            }
            break
         }
         case 'markAnswered': {
            try {
               await dispatch(adminUpdateQnaStatusThunk({ id: item.id, status: 'ANSWERED' })).unwrap()
               alert('답변완료로 변경했습니다.')
            } catch (e) {
               console.error(e)
               alert('상태 변경 실패')
            }
            break
         }
         default:
            break
      }
   }

   // 컬럼 구성
   const getColumns = () => {
      switch (activeSubTab) {
         case 'inquiry-1on1':
            // 백엔드 필드 기준으로 단순화
            return ['문의일', '회원ID', '제목', '상태']
         case 'inquiry-faq':
         case 'inquiry-voice':
            return ['문의일', '회원ID', '카테고리', '제목', '우선순위', '상태', '담당자']
         case 'inquiry-category':
            return ['카테고리명', '문의건수', '정렬순서', '생성일', '상태']
         case 'admin-board':
            return ['제목', '카테고리', '작성자', '작성일', '조회수', '상태']
         case 'admin-board-category':
            return ['카테고리명', '게시글수', '생성일', '상태']
         default:
            return []
      }
   }

   // 목록 데이터 매핑
   const getData = () => {
      switch (activeSubTab) {
         case 'inquiry-1on1': {
            // 실제 서버 데이터 → 테이블 렌더용으로 매핑 (제목 셀을 펼침 가능하게 구성)
            return (items || []).map((q) => {
               const isExpanded = !!expandedRows[q.id]
               const created = q.createdAt ? new Date(q.createdAt) : null
               const dateText = created ? created.toISOString().slice(0, 10) : ''

               const userIdText = q.User ? `${q.User.userId ?? q.User.name ?? q.User.email ?? '-'}` : '-'

               return {
                  id: q.id,
                  문의일: dateText,
                  회원ID: userIdText,
                  상태: q.status,
                  제목: (
                     <div key={`qna-${q.id}`} className="inquiry-dropdown">
                        <button className="dropdown-header" onClick={() => toggleRowExpansion(q.id)}>
                           <span className={`dropdown-icon ${isExpanded ? 'expanded' : ''}`}>▶</span>
                           <span className="dropdown-title">{q.title}</span>
                        </button>

                        {isExpanded && (
                           <div className="dropdown-content">
                              <div className="content-section">
                                 <div className="section-label">문의 내용</div>
                                 <div className="section-content" style={{ whiteSpace: 'pre-wrap' }}>
                                    {q.question}
                                 </div>
                              </div>

                              <div className="action-buttons">
                                 <button className="btn default main1" onClick={() => handleInquiryAction('answer', q)} disabled={loading}>
                                    답변 작성
                                 </button>
                                 <button className="btn default" onClick={() => handleInquiryAction('markAnswered', q)} disabled={loading || q.status === 'ANSWERED'}>
                                    답변완료로 변경
                                 </button>
                                 <button className="btn default main3" onClick={() => handleInquiryAction('close', q)} disabled={loading || q.status === 'CLOSED'}>
                                    종료 처리
                                 </button>
                              </div>

                              {error && <div className="text-danger mt-2">에러: {String(error)}</div>}
                           </div>
                        )}
                     </div>
                  ),
               }
            })
         }
         case 'inquiry-faq': {
            return inquiryFaqData.map((item) => {
               const isExpanded = expandedRows[item.id]
               return {
                  ...item,
                  제목: (
                     <div key={`faq-${item.id}`} className="inquiry-dropdown">
                        <button className="dropdown-header" onClick={() => toggleRowExpansion(item.id)}>
                           <span className={`dropdown-icon ${isExpanded ? 'expanded' : ''}`}>▶</span>
                           <span className="dropdown-title">{item['제목']}</span>
                        </button>
                        {isExpanded && (
                           <div className="dropdown-content">
                              <div className="content-section">
                                 <div className="section-meta">
                                    <span>
                                       우선순위: <span className={`priority ${item['우선순위'] === '높음' ? 'high' : item['우선순위'] === '보통' ? 'normal' : 'low'}`}>{item['우선순위']}</span>
                                    </span>
                                    <span>담당자: {item['담당자'] || '미지정'}</span>
                                 </div>
                                 <div className="section-label">문의 내용</div>
                                 <div className="section-content">{item['내용']}</div>
                              </div>
                              <div className="action-buttons">
                                 <button className="btn default main1" onClick={() => alert('답변 작성 모달')}>
                                    답변 작성
                                 </button>
                                 <button className="btn default main2" onClick={() => alert('수정')}>
                                    수정
                                 </button>
                                 <button className="btn default main3" onClick={() => window.confirm('삭제?') && alert('삭제')}>
                                    삭제
                                 </button>
                              </div>
                           </div>
                        )}
                     </div>
                  ),
               }
            })
         }
         case 'inquiry-voice': {
            return inquiryVoiceData.map((item) => {
               const isExpanded = expandedRows[item.id]
               return {
                  ...item,
                  제목: (
                     <div key={`voice-${item.id}`} className="inquiry-dropdown">
                        <button className="dropdown-header" onClick={() => toggleRowExpansion(item.id)}>
                           <span className={`dropdown-icon ${isExpanded ? 'expanded' : ''}`}>▶</span>
                           <span className="dropdown-title">{item['제목']}</span>
                        </button>
                        {isExpanded && (
                           <div className="dropdown-content">
                              <div className="content-section">
                                 <div className="section-meta">
                                    <span>
                                       우선순위: <span className={`priority ${item['우선순위'] === '높음' ? 'high' : item['우선순위'] === '보통' ? 'normal' : 'low'}`}>{item['우선순위']}</span>
                                    </span>
                                    <span>담당자: {item['담당자'] || '미지정'}</span>
                                 </div>
                                 <div className="section-label">문의 내용</div>
                                 <div className="section-content">{item['내용']}</div>
                              </div>
                              <div className="action-buttons">
                                 <button className="btn default main1" onClick={() => alert('답변 작성 모달')}>
                                    답변 작성
                                 </button>
                                 <button className="btn default main2" onClick={() => alert('수정')}>
                                    수정
                                 </button>
                                 <button className="btn default main3" onClick={() => window.confirm('삭제?') && alert('삭제')}>
                                    삭제
                                 </button>
                              </div>
                           </div>
                        )}
                     </div>
                  ),
               }
            })
         }
         case 'inquiry-category':
            return inquiryCategoryData
         case 'admin-board':
            return adminBoardData
         case 'admin-board-category':
            return adminBoardCategoryData
         default:
            return []
      }
   }

   // 필터 옵션 (관리자 1:1 문의 탭에 간단히 상태 필터만 제공)
   const getFilterOptions = () => {
      switch (activeSubTab) {
         case 'inquiry-1on1':
            return {
               status: {
                  label: '상태',
                  type: 'select',
                  options: [
                     { value: '', label: '전체' },
                     { value: 'OPEN', label: 'OPEN' },
                     { value: 'ANSWERED', label: 'ANSWERED' },
                     { value: 'CLOSED', label: 'CLOSED' },
                  ],
                  // AdminTableLayout 내부에서 onChange를 지원하지 않는다면
                  // 외부 컨트롤러를 별도로 붙여야 함. 일단 select를 따로 하나 보여줌:
               },
            }
         case 'inquiry-faq':
         case 'inquiry-voice':
            return {
               inquiryType: {
                  label: '문의유형',
                  type: 'select',
                  options: [
                     { value: '', label: '전체' },
                     { value: '1:1문의', label: '1:1문의' },
                     { value: 'FAQ', label: 'FAQ' },
                     { value: '고객의소리', label: '고객의소리' },
                  ],
               },
            }
         case 'inquiry-category':
            return {
               categoryName: { label: '카테고리명', type: 'input', placeholder: '카테고리명을 입력하세요' },
               status: {
                  label: '상태',
                  type: 'select',
                  options: [
                     { value: '', label: '전체' },
                     { value: '활성', label: '활성' },
                     { value: '비활성', label: '비활성' },
                  ],
               },
            }
         case 'admin-board':
            return {
               category: {
                  label: '카테고리',
                  type: 'select',
                  options: [
                     { value: '', label: '전체' },
                     { value: '운영정책', label: '운영정책' },
                     { value: 'FAQ관리', label: 'FAQ관리' },
                     { value: '매뉴얼', label: '매뉴얼' },
                     { value: '교육자료', label: '교육자료' },
                  ],
               },
               status: {
                  label: '상태',
                  type: 'select',
                  options: [
                     { value: '', label: '전체' },
                     { value: '게시', label: '게시' },
                     { value: '임시저장', label: '임시저장' },
                     { value: '숨김', label: '숨김' },
                  ],
               },
            }
         case 'admin-board-category':
            return {
               categoryName: { label: '카테고리명', type: 'input', placeholder: '카테고리명을 입력하세요' },
               status: {
                  label: '상태',
                  type: 'select',
                  options: [
                     { value: '', label: '전체' },
                     { value: '활성', label: '활성' },
                     { value: '비활성', label: '비활성' },
                  ],
               },
            }
         default:
            return {}
      }
   }

   const getActionButtons = () => {
      switch (activeSubTab) {
         case 'inquiry-1on1':
            return [
               // 상태 필터를 외부로 노출 (AdminTableLayout의 내부 필터 핸들링이 없다면)
               <div key="status-filter" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>상태:</span>
                  <select
                     value={statusFilter}
                     onChange={(e) => {
                        setPage(1)
                        setStatusFilter(e.target.value)
                     }}
                     disabled={loading}
                  >
                     <option value="">전체</option>
                     <option value="OPEN">OPEN</option>
                     <option value="ANSWERED">ANSWERED</option>
                     <option value="CLOSED">CLOSED</option>
                  </select>
               </div>,
            ]
         case 'inquiry-category':
            return [
               { label: '카테고리 추가', className: 'btn default main1', onClick: () => console.log('카테고리 추가') },
               { label: '정렬순서 변경', className: 'btn default main2', onClick: () => console.log('정렬순서 변경') },
            ]
         case 'admin-board':
            return [{ label: '게시글 작성', className: 'btn default main1', onClick: () => console.log('게시글 작성') }]
         case 'admin-board-category':
            return [{ label: '카테고리 추가', className: 'btn default main1', onClick: () => console.log('카테고리 추가') }]
         default:
            return []
      }
   }

   return (
      <div className="customer-service-content">
         {/* 서브 탭 네비게이션 */}
         <div className="sub-tabs mb-4">
            <div className="d-flex flex-wrap gap-2">
               {subTabs.map((tab) => (
                  <button key={tab.id} className={`btn ${activeSubTab === tab.id ? 'active' : ''}`} onClick={() => setActiveSubTab(tab.id)}>
                     <iconify-icon icon={tab.icon} className="me-2"></iconify-icon>
                     {tab.label}
                  </button>
               ))}
            </div>
         </div>

         {/* 서브탭별 컨텐츠 */}
         <AdminTableLayout
            title={subTabs.find((tab) => tab.id === activeSubTab)?.label || '고객센터 관리'}
            columns={getColumns()}
            data={getData()}
            filterOptions={getFilterOptions()}
            actionButtons={getActionButtons()}
            currentPage={activeSubTab === 'inquiry-1on1' ? page : 1}
            totalPages={activeSubTab === 'inquiry-1on1' ? totalPages : 5}
            onPageChange={(p) => {
               if (activeSubTab === 'inquiry-1on1') setPage(p)
               else console.log('페이지 변경:', p)
            }}
            enableCheckbox={['inquiry-category', 'admin-board', 'admin-board-category'].includes(activeSubTab)}
            enableDoubleClick={['inquiry-category', 'admin-board', 'admin-board-category'].includes(activeSubTab)}
         />

         {loading && activeSubTab === 'inquiry-1on1' && <div className="mt-2">불러오는 중…</div>}
         {error && activeSubTab === 'inquiry-1on1' && <div className="mt-2 text-danger">에러: {String(error)}</div>}
      </div>
   )
}

export default CustomerServiceContent
