// re-earth-frontend/src/pages/user/Donate/Form/DonateFormConfirm.jsx
// 설명: 기부 폼 스텝 5 - 확인/동의/제출 
import './scss/donateform4.scss'

export default function DonateFormConfirm({ value, onPrev, onSubmit, onAgree, loading }) {
   const v = value || {}
   const onToggle = (e) => onAgree?.(e.target.checked)

   return (
      <div>
         <h4 className="mb-3">확인 및 동의</h4>

         <div className="card p-3 mb-3">
            <div>
               <strong>신청자:</strong> {v.donorName} / {v.donorPhone} {v.donorEmail && ` / ${v.donorEmail}`}
            </div>
            <div>
               <strong>주소:</strong> ({v.zipcode}) {v.address1} {v.address2}
            </div>
            <div>
               <strong>수거 예정일:</strong> {v.pickupDate}
            </div>
            <div>
               <strong>메모:</strong> {v.memo || '-'}
            </div>
            <hr />
            <div>
               <strong>물품</strong>
            </div>
            <ul className="mb-0">
               {(v.items || []).map((it, idx) => (
                  <li key={idx}>
                     [{it.category}] 상태:{it.condition} 수량:{it.quantity} {it.note && `(${it.note})`}
                  </li>
               ))}
            </ul>
         </div>

         <div className="form-check mb-3">
            <input className="form-check-input" id="agree" type="checkbox" checked={!!v.agreePolicy} onChange={onToggle} />
            <label className="form-check-label" htmlFor="agree">
               개인정보 처리 및 수거 정책에 동의합니다. (필수)
            </label>
         </div>

         <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary" onClick={onPrev} disabled={loading}>
               이전
            </button>
            <button className="btn btn-dark ms-auto" onClick={onSubmit} disabled={loading}>
               {loading ? '제출 중...' : '신청 완료'}
            </button>
         </div>
      </div>
   )
}
