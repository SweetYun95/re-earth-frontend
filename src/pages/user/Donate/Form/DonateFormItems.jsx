// re-earth-frontend/src/pages/user/Donate/Form/DonateFormItems.jsx
// 설명: 기부 폼 스텝 3 - 물품 입력 (← 기존 DonateForm3.jsx를 파일명만 변경)
import './scss/donateform3.scss'

const CATEGORIES = [
   { value: 'TOP', label: '상의' },
   { value: 'BOTTOM', label: '하의' },
   { value: 'OUTER', label: '아우터' },
   { value: 'SHOES', label: '신발' },
   { value: 'BAG', label: '가방' },
   { value: 'ETC', label: '기타' },
]
const CONDITIONS = [
   { value: 'GOOD', label: '상' },
   { value: 'NORMAL', label: '중' },
   { value: 'POOR', label: '하' },
]

export default function DonateFormItems({ items, onAdd, onRemove, onPatch, onPrev, onNext }) {
   return (
      <div>
         <h4 className="mb-3">기부 물품</h4>

         {(items || []).map((it, idx) => (
            <div key={idx} className="card p-3 mb-2">
               <div className="row g-2">
                  <div className="col-6 col-md-3">
                     <label className="form-label">분류</label>
                     <select className="form-select" value={it.category} onChange={(e) => onPatch(idx, 'category', e.target.value)}>
                        {CATEGORIES.map((c) => (
                           <option key={c.value} value={c.value}>
                              {c.label}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="col-6 col-md-3">
                     <label className="form-label">상태</label>
                     <select className="form-select" value={it.condition} onChange={(e) => onPatch(idx, 'condition', e.target.value)}>
                        {CONDITIONS.map((c) => (
                           <option key={c.value} value={c.value}>
                              {c.label}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="col-6 col-md-2">
                     <label className="form-label">수량</label>
                     <input type="number" min="1" className="form-control" value={it.quantity} onChange={(e) => onPatch(idx, 'quantity', Math.max(1, Number(e.target.value || 1)))} />
                  </div>
                  <div className="col-12 col-md-4">
                     <label className="form-label">비고</label>
                     <input className="form-control" value={it.note || ''} onChange={(e) => onPatch(idx, 'note', e.target.value)} placeholder="브랜드/사이즈 등" />
                  </div>
               </div>
               <div className="text-end mt-2">
                  <button className="btn btn-outline-danger btn-sm" onClick={() => onRemove(idx)}>
                     삭제
                  </button>
               </div>
            </div>
         ))}

         <div className="d-flex gap-2 mt-3">
            <button className="btn btn-outline-secondary" onClick={onPrev}>
               이전
            </button>
            <button className="btn btn-outline-dark" onClick={onAdd}>
               물품 추가
            </button>
            <button className="btn btn-dark ms-auto" onClick={onNext}>
               다음
            </button>
         </div>
      </div>
   )
}
