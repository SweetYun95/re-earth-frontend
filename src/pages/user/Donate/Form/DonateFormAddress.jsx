// re-earth-frontend/src/pages/user/Donate/Form/DonateFormAddress.jsx
// 설명: 기부 폼 스텝 4 - 주소/수거일/메모 (← 기존 DonateForm4.jsx를 파일명만 변경)
import './scss/donateform3.scss'

export default function DonateFormAddress({ value, onChange, onPrev, onNext }) {
   const v = value || {}
   const handle = (e) => onChange?.({ [e.target.name]: e.target.value })

   return (
      <div>
         <h4 className="mb-3">수거 정보</h4>

         <div className="row g-2">
            <div className="col-4">
               <label className="form-label">우편번호 *</label>
               <input className="form-control" name="zipcode" value={v.zipcode} onChange={handle} />
            </div>
            <div className="col-8">
               <label className="form-label">주소 *</label>
               <input className="form-control" name="address1" value={v.address1} onChange={handle} />
            </div>
            <div className="col-12">
               <label className="form-label">상세주소</label>
               <input className="form-control" name="address2" value={v.address2} onChange={handle} />
            </div>
         </div>

         <div className="mt-2">
            <label className="form-label">수거 예정일 *</label>
            <input type="date" className="form-control" name="pickupDate" value={v.pickupDate} onChange={handle} />
         </div>

         <div className="mt-2">
            <label className="form-label">메모</label>
            <textarea className="form-control" rows={3} name="memo" value={v.memo} onChange={handle} placeholder="경비실 맡김/문앞 놓기 등"></textarea>
         </div>

         <div className="d-flex gap-2 mt-3">
            <button className="btn btn-outline-secondary" onClick={onPrev}>
               이전
            </button>
            <button className="btn btn-dark ms-auto" onClick={onNext}>
               다음
            </button>
         </div>
      </div>
   )
}
