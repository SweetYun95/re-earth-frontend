// re-earth-frontend/src/pages/user/Donate/Form/DonateFormOtp.jsx
// 설명: 기부 폼 스텝 2 - 휴대폰 OTP 인증 (← 기존 DonateForm2.jsx를 파일명만 변경)
import { useCallback, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPhonePart, sendOtpThunk, verifyOtpThunk } from '../../../../features/donationSlice'
import './scss/donateform2.scss'

export default function DonateFormOtp({ onNext, onVerified }) {
   const dispatch = useDispatch()
   const { phone, otp, loading, error } = useSelector((s) => s.donation)

   const p1Ref = useRef(null),
      p2Ref = useRef(null),
      p3Ref = useRef(null)
   const onlyDigits = (v) => (v || '').replace(/\D/g, '')

   const handleChange = useCallback(
      (part, value) => {
         const v = onlyDigits(value)
         dispatch(setPhonePart({ part, value: v }))
      },
      [dispatch]
   )

   const handleAutoTab = (e, part) => {
      const v = onlyDigits(e.target.value)
      if (part === 'p1' && v.length >= 3) p2Ref.current?.focus()
      if (part === 'p2' && v.length >= 4) p3Ref.current?.focus()
   }

   const isValidPhone = useMemo(() => {
      const p1 = (phone?.p1 || '').trim()
      const p2 = (phone?.p2 || '').trim()
      const p3 = (phone?.p3 || '').trim()
      if (!/^01[016789]$/.test(p1)) return false
      if (!/^\d{3,4}$/.test(p2)) return false
      if (!/^\d{4}$/.test(p3)) return false
      return true
   }, [phone])

   const fullPhone = useMemo(() => `${onlyDigits(phone?.p1)}${onlyDigits(phone?.p2)}${onlyDigits(phone?.p3)}`, [phone])

   const requestOtp = () => {
      if (!isValidPhone) return alert('휴대폰 번호를 확인해 주세요.')
      dispatch(sendOtpThunk(fullPhone))
   }

   const verifyOtp = async () => {
      const code = document.getElementById('otp-code')?.value?.trim()
      if (!code) return alert('인증번호를 입력해 주세요.')
      const res = await dispatch(verifyOtpThunk({ phone: fullPhone, code }))
      if (res.meta.requestStatus === 'fulfilled' && res.payload?.verified) {
         onVerified?.(fullPhone) // ✅ 인증 성공 → 상위에서 donorPhone 저장
      }
   }

   const goNext = () => {
      if (!otp?.verified) return alert('휴대폰 인증을 먼저 완료해 주세요.')
      onNext?.()
   }

   return (
      <div className="donation--content">
         <h3 className="mt-80">휴대폰 문자 인증</h3>

         <div className="form--input mt-20">
            <p className="text-body">휴대폰번호</p>
            <div className="input-phone">
               <input ref={p1Ref} maxLength={3} value={phone?.p1 || ''} onChange={(e) => handleChange('p1', e.target.value)} onInput={(e) => handleAutoTab(e, 'p1')} placeholder="010" />
               <span>-</span>
               <input ref={p2Ref} maxLength={4} value={phone?.p2 || ''} onChange={(e) => handleChange('p2', e.target.value)} onInput={(e) => handleAutoTab(e, 'p2')} placeholder="1234" />
               <span>-</span>
               <input ref={p3Ref} maxLength={4} value={phone?.p3 || ''} onChange={(e) => handleChange('p3', e.target.value)} placeholder="5678" />
               <button type="button" className={`btn default main1${isValidPhone ? '' : ' disabled'}`} onClick={requestOtp} disabled={!isValidPhone || loading}>
                  {loading ? '요청 중…' : '인증 요청'}
               </button>
            </div>
         </div>

         <div className="form--input mt-20">
            <p>인증번호</p>
            <div className="confirm with-btn">
               <input id="otp-code" maxLength={6} placeholder="인증번호" />
               <button type="button" className={`btn default main1${otp?.sent ? '' : ' disabled'}`} onClick={verifyOtp} disabled={!otp?.sent || loading}>
                  {loading ? '확인 중…' : '입력'}
               </button>
            </div>
            {error && <p className="mt-10 text-danger">{error?.message || '요청 처리 중 오류가 발생했습니다.'}</p>}
            {otp?.verified && <p className="mt-10 text-success">인증 완료 🎉</p>}
         </div>

         <div className="donation--btn mt-40">
            <button className={`btn default main1${otp?.verified ? '' : ' disabled'}`} onClick={goNext} disabled={!otp?.verified}>
               2/5 →
            </button>
         </div>
      </div>
   )
}
