// re-earth-frontend/src/pages/user/Donate/Form/DonateForm1.jsx
import { useDispatch, useSelector } from 'react-redux'
import { setField } from '../../../../features/donationSlice'
import './scss/donateform1.scss'

export default function DonateForm1({ onNext }) {
   const dispatch = useDispatch()
   const { agreePolicy, donorName, donorEmail } = useSelector((s) => s.donation)

   const set = (k, v) => dispatch(setField({ key: k, value: v }))

   const handleNext = (e) => {
      e.preventDefault()
      if (!agreePolicy) return
      if (!donorName) return alert('이름을 입력하세요.')
      onNext?.()
   }

   return (
      <div className="donation--content">
         <div className="content--notice mt-80">
            <h3 className="notice title"> 기부하기 </h3>
            <div className="notice text mt-40">
               <p>기증 가능물품을 확인하고, 아래 동의 및 기본 정보를 입력하세요.</p>
            </div>
         </div>

         <div className="mt-40">
            <label className="form-label">이름 *</label>
            <input className="form-control" value={donorName} onChange={(e) => set('donorName', e.target.value)} />
         </div>
         <div className="mt-2">
            <label className="form-label">이메일 (선택)</label>
            <input className="form-control" value={donorEmail} onChange={(e) => set('donorEmail', e.target.value)} />
         </div>

         <div className="content--terms mt-20">
            <h3 className="terms title">개인정보 동의</h3>
            <textarea className="mt-20" rows={6} readOnly value={`[개인정보 수집 및 이용 동의] …`} />
         </div>

         <div className="content--bottom mt-20">
            <label className="content--checkbox">
               <input type="checkbox" checked={!!agreePolicy} onChange={(e) => set('agreePolicy', e.target.checked)} />
               <p>개인정보 수집 및 이용에 동의합니다.</p>
            </label>

            <button className={`btn main1${agreePolicy ? '' : ' disabled'}`} onClick={handleNext} disabled={!agreePolicy}>
               1/5 →
            </button>
         </div>
      </div>
   )
}
