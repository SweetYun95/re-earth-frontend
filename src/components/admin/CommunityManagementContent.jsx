import React, { useState } from 'react'
import AdminTableLayout from './common/AdminTableLayout'
import CommunityEditModal from '../modal/CommunityEditModal'

const CommunityManagementContent = () => {
   const [activeSubTab, setActiveSubTab] = useState('notice-admin')
   const [showEditModal, setShowEditModal] = useState(false)
   const [selectedPost, setSelectedPost] = useState(null)

   // 서브 탭 목록
   const subTabs = [
      { id: 'notice-admin', label: '알립니다 (관리자용)', icon: 'mdi:bullhorn' },
      { id: 'notice-admin-category', label: '알립니다 카테고리', icon: 'mdi:tag-multiple' },
      { id: 'user-board', label: '사용자 게시판', icon: 'mdi:account-group' },
      { id: 'user-board-category', label: '사용자 게시판 카테고리', icon: 'mdi:folder-multiple' },
   ]

   // 알립니다 (관리자용 게시판) 데이터
   const noticeAdminData = [
      {
         제목: '시스템 점검 안내',
         카테고리: '시스템',
         작성자: '관리자',
         작성일: '2025-01-15',
         조회수: '1,234',
         상태: '게시',
      },
      {
         제목: '새로운 포인트 정책 안내',
         카테고리: '정책',
         작성자: '관리자',
         작성일: '2025-01-14',
         조회수: '2,567',
         상태: '게시',
      },
      {
         제목: '환경 캠페인 이벤트 공지',
         카테고리: '이벤트',
         작성자: '관리자',
         작성일: '2025-01-13',
         조회수: '3,456',
         상태: '게시',
      },
   ]

   // 사용자 게시판 데이터
   const userBoardData = [
      {
         제목: '환경보호 실천 방법 공유',
         작성자: '홍길동',
         카테고리: '정보공유',
         작성일: '2025-01-15',
         조회수: '234',
         댓글수: '12',
         상태: '게시중',
      },
      {
         제목: '친환경 제품 후기',
         작성자: '김철수',
         카테고리: '후기',
         작성일: '2025-01-14',
         조회수: '156',
         댓글수: '8',
         상태: '게시중',
      },
      {
         제목: '탄소 절약 챌린지 참여 후기',
         작성자: '이영희',
         카테고리: '챌린지',
         작성일: '2025-01-13',
         조회수: '89',
         댓글수: '5',
         상태: '검토중',
      },
      {
         제목: '부적절한 내용 포함 게시글',
         작성자: 'user003',
         카테고리: '자유',
         작성일: '2025-01-12',
         조회수: '45',
         댓글수: '2',
         상태: '신고접수',
      },
   ]

   // 카테고리 관리 데이터 (관리자용)
   const categoryData = [
      {
         카테고리명: '시스템',
         설명: '시스템 관련 공지사항',
         게시글수: '15개',
         생성일: '2024-12-01',
         상태: '활성',
      },
      {
         카테고리명: '정책',
         설명: '정책 변경 및 안내',
         게시글수: '8개',
         생성일: '2024-12-01',
         상태: '활성',
      },
      {
         카테고리명: '이벤트',
         설명: '각종 이벤트 공지',
         게시글수: '23개',
         생성일: '2024-12-01',
         상태: '활성',
      },
   ]

   // 사용자 게시판 카테고리 데이터
   const userCategoryData = [
      {
         카테고리명: '정보공유',
         설명: '환경 관련 정보 공유',
         게시글수: '156개',
         생성일: '2024-12-01',
         상태: '활성',
      },
      {
         카테고리명: '후기',
         설명: '제품 및 서비스 후기',
         게시글수: '89개',
         생성일: '2024-12-01',
         상태: '활성',
      },
      {
         카테고리명: '챌린지',
         설명: '환경 챌린지 관련',
         게시글수: '234개',
         생성일: '2024-12-01',
         상태: '활성',
      },
      {
         카테고리명: '질문',
         설명: '질문 및 답변',
         게시글수: '67개',
         생성일: '2024-12-01',
         상태: '활성',
      },
      {
         카테고리명: '자유',
         설명: '자유로운 소통 공간',
         게시글수: '345개',
         생성일: '2024-12-01',
         상태: '활성',
      },
   ]

   // 서브탭별 컬럼 설정
   const getColumns = () => {
      switch (activeSubTab) {
         case 'notice-admin':
            return ['제목', '카테고리', '작성자', '작성일', '조회수', '상태']
         case 'user-board':
            return ['제목', '작성자', '카테고리', '작성일', '조회수', '댓글수', '상태']
         case 'notice-admin-category':
         case 'user-board-category':
            return ['카테고리명', '설명', '게시글수', '생성일', '상태']
         default:
            return []
      }
   }

   // 서브탭별 데이터 설정
   const getData = () => {
      switch (activeSubTab) {
         case 'notice-admin':
            return noticeAdminData
         case 'user-board':
            return userBoardData
         case 'notice-admin-category':
            return categoryData
         case 'user-board-category':
            return userCategoryData
         default:
            return []
      }
   }

   // 서브탭별 필터 옵션
   const getFilterOptions = () => {
      switch (activeSubTab) {
         case 'notice-admin':
            return {
               category: {
                  label: '카테고리',
                  type: 'select',
                  options: [
                     { value: '', label: '전체' },
                     { value: '시스템', label: '시스템' },
                     { value: '정책', label: '정책' },
                     { value: '이벤트', label: '이벤트' },
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
               dateRange: {
                  label: '작성일',
                  type: 'daterange',
               },
               viewRange: {
                  label: '조회수 범위',
                  type: 'range',
                  placeholder: { min: '최소 조회수', max: '최대 조회수' },
               },
            }
         case 'user-board':
            return {
               category: {
                  label: '카테고리',
                  type: 'select',
                  options: [
                     { value: '', label: '전체' },
                     { value: '정보공유', label: '정보공유' },
                     { value: '후기', label: '후기' },
                     { value: '챌린지', label: '챌린지' },
                     { value: '질문', label: '질문' },
                     { value: '자유', label: '자유' },
                  ],
               },
               status: {
                  label: '상태',
                  type: 'select',
                  options: [
                     { value: '', label: '전체' },
                     { value: '게시중', label: '게시중' },
                     { value: '검토중', label: '검토중' },
                     { value: '블라인드', label: '블라인드' },
                     { value: '신고접수', label: '신고접수' },
                     { value: '삭제', label: '삭제' },
                  ],
               },
               author: {
                  label: '작성자',
                  type: 'input',
                  placeholder: '작성자를 입력하세요',
               },
               title: {
                  label: '제목',
                  type: 'input',
                  placeholder: '제목을 입력하세요',
               },
               viewRange: {
                  label: '조회수 범위',
                  type: 'range',
                  placeholder: { min: '최소 조회수', max: '최대 조회수' },
               },
               commentRange: {
                  label: '댓글수 범위',
                  type: 'range',
                  placeholder: { min: '최소 댓글수', max: '최대 댓글수' },
               },
               dateRange: {
                  label: '작성일',
                  type: 'daterange',
               },
            }
         case 'notice-admin-category':
         case 'user-board-category':
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
               postCountRange: {
                  label: '게시글수 범위',
                  type: 'range',
                  placeholder: { min: '최소 게시글수', max: '최대 게시글수' },
               },
            }
         default:
            return {}
      }
   }

   // 서브탭별 액션 버튼
   const getActionButtons = () => {
      switch (activeSubTab) {
         case 'notice-admin':
            return [
               {
                  label: '공지사항 작성',
                  className: 'btn default main1',
                  onClick: () => console.log('공지사항 작성'),
               },
               {
                  label: '일괄 숨김',
                  className: 'btn default main3',
                  onClick: () => console.log('일괄 숨김'),
               },
            ]
         case 'user-board':
            return [
               {
                  label: '일괄 승인',
                  className: 'btn default main1',
                  onClick: () => console.log('일괄 승인'),
               },
               {
                  label: '일괄 블라인드',
                  className: 'btn default main3',
                  onClick: () => console.log('일괄 블라인드'),
               },
               {
                  label: '일괄 삭제',
                  className: 'btn btn-danger',
                  onClick: () => console.log('일괄 삭제'),
               },
            ]
         case 'notice-admin-category':
         case 'user-board-category':
            return [
               {
                  label: '카테고리 추가',
                  className: 'btn default main1',
                  onClick: () => console.log('카테고리 추가'),
               },
               {
                  label: '순서 변경',
                  className: 'btn default main2',
                  onClick: () => console.log('순서 변경'),
               },
            ]
         default:
            return []
      }
   }

   // 더블클릭 핸들러
   const handleDoubleClick = (item) => {
      setSelectedPost(item)
      setShowEditModal(true)
   }

   // 일괄 삭제 핸들러
   const handleBulkDelete = (selectedItems) => {
      console.log('일괄 삭제:', selectedItems)
   }

   return (
      <div className="community-management">
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
            title={subTabs.find((tab) => tab.id === activeSubTab)?.label || '커뮤니티 관리'}
            columns={getColumns()}
            data={getData()}
            filterOptions={getFilterOptions()}
            actionButtons={getActionButtons()}
            currentPage={1}
            totalPages={5}
            onPageChange={(page) => console.log('페이지 변경:', page)}
            enableCheckbox={true}
            enableDoubleClick={true}
            onRowDoubleClick={handleDoubleClick}
            onBulkDelete={handleBulkDelete}
         />

         {/* 커뮤니티 편집 모달 */}
         <CommunityEditModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            post={selectedPost}
            onSave={(data) => {
               console.log('게시글 저장:', data)
               setShowEditModal(false)
            }}
         />
      </div>
   )
}

export default CommunityManagementContent
