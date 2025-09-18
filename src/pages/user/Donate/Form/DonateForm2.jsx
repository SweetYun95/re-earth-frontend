// re-earth-frontend/src/pages/user/Donate/Form/DonateForm2.jsx
// 2단계: 휴대폰 인증
import { useCallback, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPhonePart, sendOtpThunk, verifyOtpThunk } from '../../../../features/donationSlice'
import './scss/donateform2.scss'

export default function DonateForm2({ onNext }) {
   const dispatch = useDispatch()
   const { phone, otp, loading, error } = useSelector((s) => s.donation)

   const p1Ref = useRef(null)
   const p2Ref = useRef(null)
   const p3Ref = useRef(null)

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

   const fullPhone = useMemo(() => {
      return `${onlyDigits(phone?.p1)}${onlyDigits(phone?.p2)}${onlyDigits(phone?.p3)}`
   }, [phone])

   const requestOtp = (e) => {
      e.preventDefault()
      if (!isValidPhone) return alert('휴대폰 번호를 확인해 주세요.')
      dispatch(sendOtpThunk(fullPhone))
   }

   const verifyOtp = (e) => {
      e.preventDefault()
      const code = document.getElementById('otp-code')?.value?.trim()
      if (!code) return alert('인증번호를 입력해 주세요.')
      dispatch(verifyOtpThunk({ phone: fullPhone, code }))
   }

   const goNext = () => {
      if (!otp?.verified) return alert('휴대폰 인증을 먼저 완료해 주세요.')
      if (typeof onNext === 'function') onNext()
   }

   return (
      <div className="donation--content">
         <div className="donation content--left">
            <h3 className="mt-80">기부 신청</h3>
            <h4 className="mt-40">온라인 기증 문자 인증</h4>

            <form className="with-btn" onSubmit={(e) => e.preventDefault()}>
               {/* 전화번호 */}
               <div className="form--input mt-20">
                  <p className="text-body">휴대폰번호</p>
                  <div className="input-phone">
                     <input ref={p1Ref} id="phone1" name="phone1" type="tel" inputMode="numeric" pattern="[0-9]*" placeholder="010" maxLength={3} value={phone?.p1 || ''} onChange={(e) => handleChange('p1', e.target.value)} onInput={(e) => handleAutoTab(e, 'p1')} />
                     <span>-</span>
                     <input ref={p2Ref} id="phone2" name="phone2" type="tel" inputMode="numeric" pattern="[0-9]*" placeholder="1234" maxLength={4} value={phone?.p2 || ''} onChange={(e) => handleChange('p2', e.target.value)} onInput={(e) => handleAutoTab(e, 'p2')} />
                     <span>-</span>
                     <input ref={p3Ref} id="phone3" name="phone3" type="tel" inputMode="numeric" pattern="[0-9]*" placeholder="5678" maxLength={4} value={phone?.p3 || ''} onChange={(e) => handleChange('p3', e.target.value)} />
                     <button type="button" className={`btn default main1${isValidPhone ? '' : ' disabled'}`} onClick={requestOtp} disabled={!isValidPhone || loading}>
                        {loading ? '요청 중…' : '인증 요청'}
                     </button>
                  </div>
                  {otp?.ttl > 0 && <p className="mt-10 text-muted">인증번호 유효시간: {otp.ttl}초</p>}
               </div>

               {/* OTP */}
               <div className="form--input mt-20">
                  <p>인증번호</p>
                  <div className="confirm with-btn">
                     <input id="otp-code" name="otp" type="tel" inputMode="numeric" pattern="[0-9]*" autoComplete="one-time-code" placeholder="인증번호를 입력하세요." maxLength={6} />
                     <button type="button" className={`btn default main1${otp?.sent ? '' : ' disabled'}`} onClick={verifyOtp} disabled={!otp?.sent || loading}>
                        {loading ? '확인 중…' : '입력'}
                     </button>
                  </div>
                  {error && <p className="mt-10 text-danger">{error?.message || '요청 처리 중 오류가 발생했습니다.'}</p>}
                  {otp?.verified && <p className="mt-10 text-success">인증 완료 🎉</p>}
               </div>
            </form>
         </div>

         <div className="donation content--right">
            <button type="button" className={`btn default main1${otp?.verified ? '' : ' disabled'}`} onClick={goNext} disabled={!otp?.verified}>
               2/4 →
            </button>
         </div>
      </div>
   )
}
