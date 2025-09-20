// re-erearth-frontend/src/components/admin/MemberManagementContent.jsx
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminTableLayout from './common/AdminTableLayout'
import MemberManagementModal from '../modal/MemberManagementModal'

import { getMembers, getMemberById, saveMember, removeMembers, selectAdminMembers } from '../../features/adminMemberSlice'

import { buildMemberParams } from '../../api/adminMemberApi'

// 표시용 포맷
const fmtDate = (iso) => {
   try {
      if (!iso) return ''
      const d = new Date(iso)
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${y}-${m}-${day}`
   } catch {
      return ''
   }
}
const fmtPoint = (n) => `${Number(n || 0).toLocaleString()}P`

// 백엔드 유저 → 테이블 한글 키 매핑
const mapUserToRow = (u) => ({
   id: u.id, // 내부 pk (체크박스/수정/삭제용)
   회원ID: u.userId,
   이름: u.name,
   이메일: u.email,
   가입일: fmtDate(u.createdAt),
   포인트: fmtPoint(u.pointTotal),
   상태: u.status || '활성', // 현재는 임시 하드코딩
})

export default function MemberManagementContent() {
   const dispatch = useDispatch()
   const { list, page, size, totalPages, loading, error, lastParams, current } = useSelector(selectAdminMembers)

   const [showModal, setShowModal] = useState(false)
   const [selectedMember, setSelectedMember] = useState(null) // 원본 엔티티(백엔드 응답 객체)

   // 최초 로드
   useEffect(() => {
      const params = buildMemberParams({
         page: 1,
         size: 20,
         sort: 'createdAt',
         order: 'DESC',
         filters: {},
      })
      dispatch(getMembers(params))
   }, [dispatch])

   // 표시용 컬럼
   const columns = ['회원ID', '이름', '이메일', '가입일', '포인트', '상태']

   // Redux 목록 → 표시용 행
   const tableData = useMemo(() => list.map(mapUserToRow), [list])

   // 행 클릭/더블클릭 → 모달 오픈 + 단건 조회
   const handleRowOpen = (row) => {
      // row.id 로 원본 찾기
      const found = list.find((u) => u.id === row.id)
      if (!found) return
      setSelectedMember(found)
      setShowModal(true)
      // 필요 시 최신 상세 재조회
      dispatch(getMemberById(found.id))
   }

   // 페이지 이동
   const handlePageChange = (nextPage) => {
      const params = { ...lastParams, page: nextPage }
      dispatch(getMembers(params))
   }

   // 필터 적용
   const handleApplyFilters = (filters) => {
      const params = buildMemberParams({
         page: 1,
         size: lastParams.size || 20,
         sort: lastParams.sort || 'createdAt',
         order: lastParams.order || 'DESC',
         filters,
      })
      dispatch(getMembers(params))
   }

   // 일괄 삭제
   const handleBulkDelete = async (selectedRows) => {
      const ids = selectedRows.map((r) => r.id).filter(Boolean)
      if (!ids.length) return
      await dispatch(removeMembers(ids))
      dispatch(getMembers(lastParams))
   }

   // 저장(수정)
   const handleSave = async (form) => {
      // form 은 모달에서 전달: { id, name, address, phoneNumber, email, role? }
      if (!form?.id) return
      await dispatch(saveMember({ id: form.id, payload: form }))
      dispatch(getMembers(lastParams))
      setShowModal(false)
   }

   const modalMember = current?.id === selectedMember?.id ? current : selectedMember

   return (
      <div className="member-management">
         {loading && <div className="mb-2 small text-muted">불러오는 중...</div>}
         {error && <div className="mb-2 text-danger">⚠ {error}</div>}

         <AdminTableLayout
            title="회원관리"
            columns={columns}
            data={tableData}
            onRowClick={handleRowOpen}
            onRowDoubleClick={handleRowOpen}
            enableCheckbox={true}
            enableDoubleClick={true}
            // 페이지네이션
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            // 필터
            showFilter={true}
            filterOptions={{
               userId: { label: '회원ID', type: 'input', placeholder: '회원ID를 입력하세요' },
               status: {
                  label: '상태',
                  type: 'select',
                  options: [
                     { value: '', label: '전체' },
                     { value: '활성', label: '활성' },
                     { value: '비활성', label: '비활성' },
                     { value: '정지', label: '정지' },
                  ],
               },
               name: { label: '이름', type: 'input', placeholder: '이름을 입력하세요' },
               email: { label: '이메일', type: 'input', placeholder: '이메일을 입력하세요' },
               joinDate: { label: '가입일', type: 'date' }, // { from, to } 형태 가정
               pointRange: { label: '포인트 범위', type: 'range', placeholder: { min: '최소 포인트', max: '최대 포인트' } }, // { min, max }
            }}
            onApplyFilters={handleApplyFilters}
            // 하단 액션(옵션)
            showActions={true}
            actionButtons={[
               { label: '회원 추가', className: 'btn default main1', onClick: () => console.log('회원 추가') },
               { label: '엑셀 다운로드', className: 'btn default main2', onClick: () => console.log('엑셀 다운로드') },
            ]}
            // 일괄 삭제
            onBulkDelete={handleBulkDelete}
         />

         <MemberManagementModal isOpen={showModal} onClose={() => setShowModal(false)} member={modalMember} onSave={handleSave} />
      </div>
   )
}
