// re-earth-frontend/src/components/admin/DonationManagementContent.jsx
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminTableLayout from './common/AdminTableLayout'
import DonationDetailModal from '../modal/DonationDetailModal'
import { fetchAdminDonationsThunk, fetchAdminDonationThunk, updateAdminDonationThunk, setAdminDonationFilter } from '../../features/adminDonationSlice'

// ✅ 백엔드 ENUM과 일치
const STATUS_KEYS = ['REQUESTED', 'SCHEDULED', 'PICKED', 'CANCELLED']

// 승인 버튼을 누를 때의 “다음 상태” 가이드
const NEXT_BY_APPROVE = {
   REQUESTED: 'SCHEDULED', // 승인 = 일정 확정
   SCHEDULED: 'PICKED', // 승인 = 수거 완료
   PICKED: null, // 더 진행 단계 없으면 버튼 숨김
   CANCELLED: null,
}

export default function DonationManagementContent() {
   const dispatch = useDispatch()
   const { list, page, size, total, loading, error, current, statusFilter, q } = useSelector((s) => s.adminDonation)

   const [showDetailModal, setShowDetailModal] = useState(false)

   // 목록 불러오기
   useEffect(() => {
      dispatch(
         fetchAdminDonationsThunk({
            page,
            size,
            status: statusFilter || undefined,
            q: q?.trim() || undefined,
         })
      )
   }, [dispatch, page, size, statusFilter, q])

   // 컬럼 정의
   const columns = useMemo(() => ['ID', '신청일자', '신청자', '수량', '예상포인트', '상태', '영수증', '액션'], [])

   // 테이블 데이터 매핑 (alias = items)
   const donationData = useMemo(() => {
      return (list || []).map((d) => {
         const qty = Number.isFinite(d.count) ? d.count : (d.items || []).reduce((a, b) => a + (Number(b.quantity) || 0) + (Number(b.amount) || 0), 0)
         return {
            id: d.id,
            ID: `#${d.id}`,
            신청일자: new Date(d.createdAt).toLocaleString(),
            신청자: `${d.donorName || '-'} (${d.donorPhone || '-'})`,
            수량: `${qty}개`,
            예상포인트: `${(d.expectedPoint ?? 0).toLocaleString()}P`,
            상태: d.status,
            영수증: d.receiptUrl ? '있음' : '미발급',
            액션: '상세',
            __raw: d,
         }
      })
   }, [list])

   // 필터
   const filterOptions = {
      status: {
         label: '상태',
         type: 'select',
         options: [{ value: '', label: '전체' }, ...STATUS_KEYS.map((s) => ({ value: s, label: s }))],
         value: statusFilter,
         onChange: (val) => dispatch(setAdminDonationFilter({ statusFilter: val, page: 1 })),
      },
      q: {
         label: '검색',
         type: 'input',
         placeholder: '이름/연락처/이메일/주소/우편번호',
         value: q,
         onChange: (val) => dispatch(setAdminDonationFilter({ q: val, page: 1 })),
      },
   }

   // 더블클릭 상세
   const handleDoubleClick = (row) => {
      const id = row?.__raw?.id || row?.id
      if (!id) return
      dispatch(fetchAdminDonationThunk(id)).then(() => setShowDetailModal(true))
   }

   // 페이지 변경
   const onPageChange = (nextPage) => dispatch(setAdminDonationFilter({ page: nextPage }))

   // 상태 변경
   const handleUpdateStatus = async (id, nextStatus) => {
      if (!nextStatus) return
      await dispatch(updateAdminDonationThunk({ id, patch: { status: nextStatus } }))
   }

   // 영수증 저장
   const handleSaveReceipt = async (id, receiptUrl) => {
      await dispatch(updateAdminDonationThunk({ id, patch: { receiptUrl } }))
   }

   // 모달 승인 액션: 현재 상태에 맞는 “다음 단계” 전송
   const handleApproveFromModal = (donation) => {
      const next = NEXT_BY_APPROVE[donation?.status] || null
      if (!next) return
      handleUpdateStatus(donation.id, next)
   }

   return (
      <div className="donation-management">
         {error && <div className="alert alert-danger mb-2">{error?.message || String(error)}</div>}

         <AdminTableLayout
            title="헌옷 기부 현황 관리"
            columns={columns}
            data={donationData}
            filterOptions={filterOptions}
            actionButtons={[
               { label: '기부 통계', className: 'btn btn-info', onClick: () => console.log('기부 통계 TODO') },
               { label: '엑셀 다운로드', className: 'btn btn-success', onClick: () => console.log('엑셀 다운로드 TODO') },
            ]}
            currentPage={page}
            totalPages={Math.max(1, Math.ceil((total || 0) / (size || 20)))}
            onPageChange={onPageChange}
            enableCheckbox={false}
            enableDoubleClick={true}
            onRowDoubleClick={handleDoubleClick}
            loading={loading}
         />

         <DonationDetailModal
            isOpen={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            donation={current}
            // 승인: 상태 단계별 전이(REQUESTED→SCHEDULED, SCHEDULED→PICKED)
            onApprove={(donation) => handleApproveFromModal(donation)}
            // 반려/취소
            onReject={(donation) => handleUpdateStatus(donation.id, 'CANCELLED')}
            // 영수증 저장
            onSaveReceipt={(donation, receiptUrl) => handleSaveReceipt(donation.id, receiptUrl)}
         />
      </div>
   )
}
