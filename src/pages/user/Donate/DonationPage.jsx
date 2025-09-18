// re-earth-frontend/src/pages/user/Donate/DonationPage.jsx
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DonateForm1 from './Form/DonateForm1'
import DonateForm2 from './Form/DonateForm2'
import DonateForm3 from './Form/DonateForm3'
import DonateForm4 from './Form/DonateForm4'

import { submitDonationThunk, fetchMyDonationsThunk } from '../../../features/donationSlice'
import './donateform.scss'

export default function DonationPage() {
   const dispatch = useDispatch()
   const { consent, phone, otp, items, count, method, pickupDate, returnAddress, created, loading, error } = useSelector((s) => s.donation)

   const [step, setStep] = useState(1)

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }, [step])

   const canGoNext = useMemo(() => {
      if (step === 1) return !!consent
      if (step === 2) return otp?.verified === true
      if (step === 3) return count > 0 && !!pickupDate
      if (step === 4) return true
      return true
   }, [step, consent, otp?.verified, count, pickupDate])

   const next = () => {
      if (!canGoNext) {
         if (step === 1) alert('개인정보 수집 및 이용에 동의해 주세요.')
         if (step === 2) alert('휴대폰 인증을 완료해 주세요.')
         if (step === 3) alert('품목 수량과 희망 수거 날짜를 확인해 주세요.')
         return
      }
      setStep((s) => Math.min(4, s + 1))
   }

   const prev = () => setStep((s) => Math.max(1, s - 1))

   const fullPhone = useMemo(() => {
      const p1 = (phone?.p1 || '').replace(/\D/g, '')
      const p2 = (phone?.p2 || '').replace(/\D/g, '')
      const p3 = (phone?.p3 || '').replace(/\D/g, '')
      return [p1, p2, p3].filter(Boolean).join('')
   }, [phone])

   const handleSubmit = () => {
      const payload = {
         consent: !!consent,
         donor: {
            phone: fullPhone || null,
            address: returnAddress || null,
         },
         items, // [{ itemName, amount }]
         count,
         pickup: { method, date: pickupDate },
      }

      dispatch(submitDonationThunk(payload)).then((res) => {
         if (res.meta?.requestStatus === 'fulfilled') {
            dispatch(fetchMyDonationsThunk())
            setStep(4)
         }
      })
   }

   return (
      <section id="main1">
         <div id="area" className="container">
            <div id="donation" className="donation-page">
               <h2>Re:earth</h2>

               {/* 스텝 인디케이터 */}
               <div className="wizard-steps mt-20" role="tablist" aria-label="donation-steps">
                  {[1, 2, 3, 4].map((n) => (
                     <button key={n} className={`step-dot ${step === n ? 'active' : ''}`} onClick={() => setStep(n)} aria-selected={step === n} aria-controls={`step-panel-${n}`}>
                        {n}
                     </button>
                  ))}
               </div>

               {/* 스텝 콘텐츠 */}
               <div id={`step-panel-${step}`} className="wizard-panel mt-10">
                  {step === 1 && <DonateForm1 onNext={() => setStep(2)} />}
                  {step === 2 && <DonateForm2 onNext={() => setStep(3)} />}
                  {step === 3 && <DonateForm3 onNext={() => setStep(4)} />}
                  {step === 4 && <DonateForm4 onSubmit={handleSubmit} />}
               </div>

               {/* 에러/상태 표시 */}
               {error && (
                  <div className="mt-20 text-danger" role="alert">
                     {error?.message || '요청 처리 중 오류가 발생했습니다.'}
                  </div>
               )}
               {created && <div className="mt-20 text-success">신청 완료! 접수 번호: {created?.id || created?.donationId || '확인 중'}</div>}

               {/* 하단 내비게이션 */}
               <div className="wizard-footer mt-30">
                  <div className="left">
                     <button className="btn default" onClick={prev} disabled={step <= 1 || loading}>
                        ← 이전
                     </button>
                  </div>
                  <div className="right">
                     {step < 4 && (
                        <button className={`btn ${canGoNext ? 'main1' : 'disabled'}`} onClick={next} disabled={!canGoNext || loading}>
                           다음 →
                        </button>
                     )}
                     {step === 4 && (
                        <button className="btn main1" onClick={handleSubmit} disabled={loading || !!created}>
                           {loading ? '제출 중…' : created ? '제출 완료' : '확인 및 제출'}
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
