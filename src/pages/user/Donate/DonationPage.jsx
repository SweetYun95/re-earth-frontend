// re-earth-frontend/src/pages/user/Donate/DonationPage.jsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setField, addItem, updateItem, removeItem, submitDonationThunk } from '../../../features/donationSlice'

import DonateForm1 from './Form/DonateForm1' // 동의 + 이름/이메일
import DonateFormOtp from './Form/DonateFormOtp.jsx' // 휴대폰 OTP  (← 기존 DonateForm2.jsx를 파일명만 변경)
import DonateFormItems from './Form/DonateFormItems' // 물품 입력
import DonateFormAddress from './Form/DonateFormAddress' // 주소/수거일/메모
import DonateFormConfirm from './Form/DonateFormConfirm' // 확인/동의/제출
import './donateform.scss'

export default function DonationPage() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { donorName, donorPhone, donorEmail, zipcode, address1, address2, pickupDate, memo, agreePolicy, items, loading, error, createdId, otp } = useSelector((s) => s.donation)

   const [step, setStep] = React.useState(1)
   const next = () => setStep((s) => Math.min(5, s + 1))
   const prev = () => setStep((s) => Math.max(1, s - 1))

   useEffect(() => {
      if (createdId) navigate(`/donate/complete/${createdId}`, { replace: true })
   }, [createdId, navigate])

   const handleSubmit = () => {
      // 최소 서버전 검증
      if (!agreePolicy) return alert('정책 동의가 필요합니다.')
      if (!donorName) return alert('이름을 입력하세요.')
      if (!donorPhone) return alert('휴대폰 인증을 완료하세요.')
      if (!zipcode || !address1) return alert('주소를 입력하세요.')
      if (!pickupDate) return alert('수거일을 선택하세요.')
      if (!items?.length || items.some((it) => !it.quantity || it.quantity <= 0)) {
         return alert('물품을 1개 이상 등록하고 수량을 확인하세요.')
      }

      dispatch(
         submitDonationThunk({
            donorName,
            donorPhone,
            donorEmail,
            zipcode,
            address1,
            address2,
            pickupDate,
            memo,
            agreePolicy,
            items,
         })
      )
   }

   return (
      <div className="donate-wrap container-sm">
         <h2 className="mb-2">헌옷 기부 신청</h2>
         <div className="step mb-3">Step {step} / 5</div>
         {error && <div className="alert alert-danger">에러: {error?.message || String(error)}</div>}

         {step === 1 && (
            <DonateForm1
               onNext={next}
               // DonateForm1 내부에서 setField로 donorName/donorEmail/agreePolicy 업데이트
            />
         )}

         {step === 2 && (
            <DonateFormOtp
               onNext={() => {
                  if (!otp?.verified) return alert('휴대폰 인증을 먼저 완료해 주세요.')
                  if (!donorPhone) return alert('휴대폰 번호가 비어있습니다.') // 안전망
                  next()
               }}
               onVerified={(phone) => dispatch(setField({ key: 'donorPhone', value: phone }))} // ✅ 인증 성공 시 phone 저장
            />
         )}

         {step === 3 && <DonateFormItems items={items} onAdd={() => dispatch(addItem())} onRemove={(idx) => dispatch(removeItem({ index: idx }))} onPatch={(idx, field, value) => dispatch(updateItem({ index: idx, patch: { [field]: value } }))} onPrev={prev} onNext={next} />}

         {step === 4 && <DonateFormAddress value={{ zipcode, address1, address2, pickupDate, memo }} onChange={(patch) => Object.entries(patch).forEach(([k, v]) => dispatch(setField({ key: k, value: v })))} onPrev={prev} onNext={next} />}

         {step === 5 && <DonateFormConfirm value={{ donorName, donorPhone, donorEmail, zipcode, address1, address2, pickupDate, memo, agreePolicy, items }} onAgree={(checked) => dispatch(setField({ key: 'agreePolicy', value: !!checked }))} onPrev={prev} loading={loading} onSubmit={handleSubmit} />}
      </div>
   )
}
