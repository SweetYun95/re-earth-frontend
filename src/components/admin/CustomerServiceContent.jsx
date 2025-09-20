import React, { useState } from 'react'
import AdminTableLayout from './common/AdminTableLayout'

const CustomerServiceContent = () => {
   const [activeSubTab, setActiveSubTab] = useState('inquiry-1on1')
   const [expandedRows, setExpandedRows] = useState({})

   // 서브 탭 목록
   const subTabs = [
      { id: 'inquiry-1on1', label: '1:1문의', icon: 'mdi:chat-question' },
      { id: 'inquiry-faq', label: 'FAQ', icon: 'mdi:help-circle' },
      { id: 'inquiry-voice', label: '고객의소리', icon: 'mdi:bullhorn' },
      { id: 'inquiry-category', label: '문의사항 카테고리', icon: 'mdi:tag-multiple' },
      { id: 'admin-board', label: '관리자 게시판', icon: 'mdi:account-tie' },
      { id: 'admin-board-category', label: '관리자 게시판 카테고리', icon: 'mdi:folder-multiple' },
   ]

   // 1:1문의 데이터
   const inquiry1on1Data = [
      {
         id: 1,
         문의일: '2025-01-15',
         회원ID: 'user001',
         카테고리: '기부',
         제목: '기부 승인 문의',
         내용: '기부 신청 후 3일이 지났는데 아직 승인이 안 되었습니다. 언제쯤 처리가 될까요?',
         우선순위: '보통',
         상태: '답변완료',
         담당자: '관리자1',
         처리일: '2025-01-15',
      },
      {
         id: 4,
         문의일: '2025-01-12',
         회원ID: 'user004',
         카테고리: '계정',
         제목: '비밀번호 재설정 오류',
         내용: '비밀번호 재설정 메일이 오지 않습니다.',
         우선순위: '높음',
         상태: '대기',
         담당자: '',
         처리일: '',
      },
   ]

   // FAQ 데이터
   const inquiryFaqData = [
      {
         id: 2,
         문의일: '2025-01-14',
         회원ID: 'user002',
         카테고리: '포인트',
         제목: '포인트 적립 방법',
         내용: '대중교통 이용 시 포인트는 어떻게 적립되나요?',
         우선순위: '낮음',
         상태: '답변완료',
         담당자: '관리자2',
         처리일: '2025-01-14',
      },
      {
         id: 5,
         문의일: '2025-01-10',
         회원ID: 'user005',
         카테고리: '포인트샵',
         제목: '상품 교환 정책',
         내용: '구매한 상품의 교환이 가능한가요?',
         우선순위: '보통',
         상태: '답변완료',
         담당자: '관리자3',
         처리일: '2025-01-10',
      },
   ]

   // 고객의소리 데이터
   const inquiryVoiceData = [
      {
         id: 3,
         문의일: '2025-01-13',
         회원ID: 'user003',
         카테고리: '서비스개선',
         제목: '앱 사용성 개선 요청',
         내용: '포인트샵 페이지의 로딩 속도가 너무 느려서 불편합니다. 개선 부탁드립니다.',
         우선순위: '높음',
         상태: '처리중',
         담당자: '관리자1',
         처리일: '',
      },
      {
         id: 6,
         문의일: '2025-01-09',
         회원ID: 'user006',
         카테고리: 'UI/UX',
         제목: '메뉴 구조 개선 제안',
         내용: '메인 메뉴가 너무 복잡해서 원하는 기능을 찾기 어렵습니다.',
         우선순위: '보통',
         상태: '검토중',
         담당자: '관리자2',
         처리일: '',
      },
   ]

   // 문의사항 카테고리 데이터
   const inquiryCategoryData = [
      {
         카테고리명: '기부',
         문의건수: '45건',
         정렬순서: '1',
         생성일: '2024-12-01',
         상태: '활성',
      },
      {
         카테고리명: '포인트',
         문의건수: '123건',
         정렬순서: '2',
         생성일: '2024-12-01',
         상태: '활성',
      },
      {
         카테고리명: '계정',
         문의건수: '67건',
         정렬순서: '3',
         생성일: '2024-12-01',
         상태: '활성',
      },
      {
         카테고리명: '서비스개선',
         문의건수: '89건',
         정렬순서: '4',
         생성일: '2024-12-01',
         상태: '활성',
      },
      {
         카테고리명: '기타',
         문의건수: '34건',
         정렬순서: '5',
         생성일: '2024-12-01',
         상태: '활성',
      },
   ]

   // 관리자 게시판 데이터 (커뮤니티 관리 카테고리 제외)
   const adminBoardData = [
      {
         제목: '고객센터 운영 가이드라인',
         카테고리: '운영정책',
         작성자: '관리자',
         작성일: '2025-01-15',
         조회수: '45',
         상태: '게시',
      },
      {
         제목: '신규 FAQ 등록 안내',
         카테고리: 'FAQ관리',
         작성자: '관리자',
         작성일: '2025-01-14',
         조회수: '23',
         상태: '게시',
      },
      {
         제목: '고객 응대 매뉴얼 업데이트',
         카테고리: '매뉴얼',
         작성자: '관리자',
         작성일: '2025-01-13',
         조회수: '67',
         상태: '게시',
      },
   ]

   // 관리자 게시판 카테고리 데이터 (커뮤니티 관리 카테고리 제외)
   const adminBoardCategoryData = [
      {
         카테고리명: '운영정책',
         게시글수: '12개',
         생성일: '2024-12-01',
         상태: '활성',
      },
      {
         카테고리명: 'FAQ관리',
         게시글수: '8개',
         생성일: '2024-12-01',
         상태: '활성',
      },
      {
         카테고리명: '매뉴얼',
         게시글수: '15개',
         생성일: '2024-12-01',
         상태: '활성',
      },
      {
         카테고리명: '교육자료',
         게시글수: '6개',
         생성일: '2024-12-01',
         상태: '활성',
      },
   ]

   // 행 확장/축소 토글
   const toggleRowExpansion = (rowId) => {
      setExpandedRows((prev) => ({
         ...prev,
         [rowId]: !prev[rowId],
      }))
   }

   // 문의사항 액션 핸들러
   const handleInquiryAction = (action, item) => {
      switch (action) {
         case 'answer':
            alert(`${item['제목']}에 대한 답변 작성 모달을 열겠습니다.`)
            break
         case 'edit':
            alert(`${item['제목']} 수정 기능을 실행합니다.`)
            break
         case 'delete':
            if (window.confirm(`"${item['제목']}"을(를) 삭제하시겠습니까?`)) {
               alert('문의사항이 삭제되었습니다.')
            }
            break
         case 'assign': {
            const manager = prompt('담당자를 입력하세요:', item['담당자'] || '')
            if (manager !== null) {
               alert(`담당자가 "${manager}"로 지정되었습니다.`)
            }
            break
         }
         default:
            break
      }
   }

   // 서브탭별 컬럼 설정
   const getColumns = () => {
      switch (activeSubTab) {
         case 'inquiry-1on1':
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

   // 서브탭별 데이터 설정 (고객문의사항은 드롭다운 형태로 처리)
   const getData = () => {
      switch (activeSubTab) {
         case 'inquiry-1on1':
            return inquiry1on1Data.map((item) => {
               const isExpanded = expandedRows[item.id]
               return {
                  ...item,
                  제목: (
                     <div key={`inquiry-${item.id}`} className="inquiry-dropdown">
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
                                 <button className="btn default main1" onClick={() => handleInquiryAction('answer', item)}>
                                    답변 작성
                                 </button>
                                 <button className="btn default main2" onClick={() => handleInquiryAction('edit', item)}>
                                    수정
                                 </button>
                                 <button className="btn default main3" onClick={() => handleInquiryAction('delete', item)}>
                                    삭제
                                 </button>
                                 <button className="btn default" onClick={() => handleInquiryAction('assign', item)}>
                                    담당자 지정
                                 </button>
                              </div>
                           </div>
                        )}
                     </div>
                  ),
               }
            })
         case 'inquiry-faq':
            return inquiryFaqData.map((item) => {
               const isExpanded = expandedRows[item.id]
               return {
                  ...item,
                  제목: (
                     <div key={`inquiry-${item.id}`} className="inquiry-dropdown">
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
                                 <button className="btn default main1" onClick={() => handleInquiryAction('answer', item)}>
                                    답변 작성
                                 </button>
                                 <button className="btn default main2" onClick={() => handleInquiryAction('edit', item)}>
                                    수정
                                 </button>
                                 <button className="btn default main3" onClick={() => handleInquiryAction('delete', item)}>
                                    삭제
                                 </button>
                                 <button className="btn default" onClick={() => handleInquiryAction('assign', item)}>
                                    담당자 지정
                                 </button>
                              </div>
                           </div>
                        )}
                     </div>
                  ),
               }
            })
         case 'inquiry-voice':
            return inquiryVoiceData.map((item) => {
               const isExpanded = expandedRows[item.id]
               return {
                  ...item,
                  제목: (
                     <div key={`inquiry-${item.id}`} className="inquiry-dropdown">
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
                                 <button className="btn default main1" onClick={() => handleInquiryAction('answer', item)}>
                                    답변 작성
                                 </button>
                                 <button className="btn default main2" onClick={() => handleInquiryAction('edit', item)}>
                                    수정
                                 </button>
                                 <button className="btn default main3" onClick={() => handleInquiryAction('delete', item)}>
                                    삭제
                                 </button>
                                 <button className="btn default" onClick={() => handleInquiryAction('assign', item)}>
                                    담당자 지정
                                 </button>
                              </div>
                           </div>
                        )}
                     </div>
                  ),
               }
            })
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

   // 서브탭별 필터 옵션
   const getFilterOptions = () => {
      switch (activeSubTab) {
         case 'inquiry-1on1':
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
               category: {
                  label: '카테고리',
                  type: 'select',
                  options: [
                     { value: '', label: '전체' },
                     { value: '기부', label: '기부' },
                     { value: '포인트', label: '포인트' },
                     { value: '계정', label: '계정' },
                     { value: '서비스개선', label: '서비스개선' },
                     { value: '기타', label: '기타' },
                  ],
               },
               status: {
                  label: '상태',
                  type: 'select',
                  options: [
                     { value: '', label: '전체' },
                     { value: '대기', label: '대기' },
                     { value: '처리중', label: '처리중' },
                     { value: '답변완료', label: '답변완료' },
                     { value: '보류', label: '보류' },
                  ],
               },
               priority: {
                  label: '우선순위',
                  type: 'select',
                  options: [
                     { value: '', label: '전체' },
                     { value: '높음', label: '높음' },
                     { value: '보통', label: '보통' },
                     { value: '낮음', label: '낮음' },
                  ],
               },
               userId: {
                  label: '회원ID',
                  type: 'input',
                  placeholder: '회원ID를 입력하세요',
               },
               title: {
                  label: '제목',
                  type: 'input',
                  placeholder: '제목을 입력하세요',
               },
               dateRange: {
                  label: '문의일',
                  type: 'daterange',
               },
               manager: {
                  label: '담당자',
                  type: 'input',
                  placeholder: '담당자를 입력하세요',
               },
            }
         case 'inquiry-category':
            return {
               categoryName: {
                  label: '카테고리명',
                  type: 'input',
                  placeholder: '카테고리명을 입력하세요',
               },
               status: {
                  label: '상태',
                  type: 'select',
                  options: [
                     { value: '', label: '전체' },
                     { value: '활성', label: '활성' },
                     { value: '비활성', label: '비활성' },
                  ],
               },
               inquiryCountRange: {
                  label: '문의건수 범위',
                  type: 'range',
                  placeholder: { min: '최소 건수', max: '최대 건수' },
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
               title: {
                  label: '제목',
                  type: 'input',
                  placeholder: '제목을 입력하세요',
               },
               author: {
                  label: '작성자',
                  type: 'input',
                  placeholder: '작성자를 입력하세요',
               },
               dateRange: {
                  label: '작성일',
                  type: 'daterange',
               },
            }
         case 'admin-board-category':
            return {
               categoryName: {
                  label: '카테고리명',
                  type: 'input',
                  placeholder: '카테고리명을 입력하세요',
               },
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

   // 서브탭별 액션 버튼
   const getActionButtons = () => {
      switch (activeSubTab) {
         case 'inquiry-management':
            return [
               {
                  label: '일괄 답변',
                  className: 'btn default main1',
                  onClick: () => console.log('일괄 답변'),
               },
               {
                  label: '담당자 일괄 지정',
                  className: 'btn default main2',
                  onClick: () => console.log('담당자 일괄 지정'),
               },
               {
                  label: '엑셀 다운로드',
                  className: 'btn btn-success',
                  onClick: () => console.log('엑셀 다운로드'),
               },
            ]
         case 'inquiry-category':
            return [
               {
                  label: '카테고리 추가',
                  className: 'btn default main1',
                  onClick: () => console.log('카테고리 추가'),
               },
               {
                  label: '정렬순서 변경',
                  className: 'btn default main2',
                  onClick: () => console.log('정렬순서 변경'),
               },
            ]
         case 'admin-board':
            return [
               {
                  label: '게시글 작성',
                  className: 'btn default main1',
                  onClick: () => console.log('게시글 작성'),
               },
            ]
         case 'admin-board-category':
            return [
               {
                  label: '카테고리 추가',
                  className: 'btn default main1',
                  onClick: () => console.log('카테고리 추가'),
               },
            ]
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
            currentPage={1}
            totalPages={5}
            onPageChange={(page) => console.log('페이지 변경:', page)}
            enableCheckbox={activeSubTab === 'inquiry-category' || activeSubTab === 'admin-board' || activeSubTab === 'admin-board-category'}
            enableDoubleClick={activeSubTab === 'inquiry-category' || activeSubTab === 'admin-board' || activeSubTab === 'admin-board-category'}
         />
      </div>
   )
}

export default CustomerServiceContent
