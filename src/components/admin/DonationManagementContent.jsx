// re-earth-frontend/src/components/admin/DonationManagementContent.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminTableLayout from './common/AdminTableLayout'
import DonationDetailModal from '../modal/DonationDetailModal'
import { fetchAdminDonationsThunk, fetchAdminDonationThunk, updateAdminDonationThunk, setAdminDonationFilter } from '../../features/adminDonationSlice'

// 서버 상태 키(백엔드와 맞춤)
const STATUS_KEYS = ['REQUESTED', 'PICKUP_SCHEDULED', 'PICKED_UP', 'RECEIVED', 'POINT_ISSUED', 'CANCELED']

export default function DonationManagementContent() {
   const dispatch = useDispatch()
   const { list, page, size, total, loading, error, current, statusFilter, q } = useSelector((s) => s.adminDonation)

   // 상세 모달 로컬 상태
   const [showDetailModal, setShowDetailModal] = useState(false)
   const [selectedId, setSelectedId] = useState(null)

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

   // 컬럼 정의 (AdminTableLayout 포맷)
   const columns = useMemo(() => ['ID', '신청일자', '회원', '수량', '예상포인트', '상태', '영수증', '액션'], [])

   // 테이블에 맞는 데이터 매핑
   const donationData = useMemo(() => {
      return (list || []).map((d) => ({
         id: d.id,
         ID: `#${d.id}`,
         신청일자: new Date(d.createdAt).toLocaleString(),
         회원: `${d.User?.name || '-'} (${d.User?.email || '-'})`,
         수량: `${d.count ?? (d.DonationItems?.reduce((a, b) => a + (b.amount || 0), 0) || 0)}개`,
         예상포인트: `${d.expectedPoint?.toLocaleString?.() ?? d.expectedPoint}P`,
         상태: d.status,
         영수증: d.receiptUrl ? '있음' : '미발급',
         액션: '상세',
         __raw: d, // 원본 한 줄 보관
      }))
   }, [list])

   // 필터 정의 (AdminTableLayout 호환)
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
         placeholder: '이메일/주소 일부 등',
         value: q,
         onChange: (val) => dispatch(setAdminDonationFilter({ q: val, page: 1 })),
      },
   }

   // 더블클릭: 상세 열기
   const handleDoubleClick = (row) => {
      const id = row?.__raw?.id || row?.id
      if (!id) return
      setSelectedId(id)
      dispatch(fetchAdminDonationThunk(id)).then(() => setShowDetailModal(true))
   }

   // 페이지 변경
   const onPageChange = (nextPage) => {
      dispatch(setAdminDonationFilter({ page: nextPage }))
   }

   // 상태 변경 액션 (모달에서 호출)
   const handleUpdateStatus = async (id, nextStatus) => {
      await dispatch(updateAdminDonationThunk({ id, patch: { status: nextStatus } }))
   }

   // 영수증 저장 액션 (모달에서 호출)
   const handleSaveReceipt = async (id, receiptUrl) => {
      await dispatch(updateAdminDonationThunk({ id, patch: { receiptUrl } }))
   }

   // 일괄 버튼(데모): 필요 시 실제 선택 항목 받아서 처리
   const actionButtons = [
      { label: '기부 통계', className: 'btn btn-info', onClick: () => console.log('기부 통계 TODO') },
      { label: '엑셀 다운로드', className: 'btn btn-success', onClick: () => console.log('엑셀 다운로드 TODO') },
   ]

   return (
      <div className="donation-management">
         {error && <div className="alert alert-danger mb-2">{error?.message || String(error)}</div>}

         <AdminTableLayout
            title="헌옷 기부 현황 관리"
            columns={columns}
            data={donationData}
            filterOptions={filterOptions}
            actionButtons={actionButtons}
            currentPage={page}
            totalPages={Math.max(1, Math.ceil((total || 0) / (size || 20)))}
            onPageChange={onPageChange}
            enableCheckbox={false}
            enableDoubleClick={true}
            onRowDoubleClick={handleDoubleClick}
            loading={loading}
         />

         {/* 상세 모달 */}
         <DonationDetailModal
            isOpen={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            donation={current}
            // 승인/반려 대신, 상태 전이 버튼들을 모달 내부에서 제공한다면 이 핸들러들로 연결
            onApprove={(donation, manager) => {
               handleUpdateStatus(donation.id, 'RECEIVED') // 예: 검수 완료로 승인
            }}
            onReject={(donation) => {
               handleUpdateStatus(donation.id, 'CANCELED')
            }}
            onSaveReceipt={(donation, receiptUrl) => {
               handleSaveReceipt(donation.id, receiptUrl)
            }}
         />
      </div>
   )
}
