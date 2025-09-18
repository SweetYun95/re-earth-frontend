// re-earth-frontend/src/pages/user/Donate/Form/DonateForm3.jsx
// 3단계: 기부 물품 선택
import { useDispatch, useSelector } from 'react-redux'
import { useMemo, useState } from 'react'
import { setItems, setMethod, setPickupDate } from '../../../../features/donationSlice'
import './scss/donateform3.scss'

export default function DonateForm3({ onNext }) {
   const dispatch = useDispatch()
   const { items, count, method, pickupDate } = useSelector((s) => s.donation)

   // 패키징은 현재 slice에 없으니 컴포넌트 로컬로만 보관
   const [packaging, setPackaging] = useState({ box: 1, bag: 0 })

   const canProceed = useMemo(() => count > 0 && !!pickupDate, [count, pickupDate])

   // 품목 조작
   const addItem = () => {
      const next = [...items, { itemName: '의류', amount: 1 }]
      dispatch(setItems(next))
   }
   const removeItem = (idx) => {
      if (items.length === 1) return
      const next = items.filter((_, i) => i !== idx)
      dispatch(setItems(next))
   }
   const setItemField = (idx, field, value) => {
      const next = items.map((it, i) => (i === idx ? { ...it, [field]: value } : it))
      dispatch(setItems(next))
   }

   // 카운터 UI: 총 수량은 items 합산 결과(count)로 readOnly 표시
   const incPkg = (k) => setPackaging((p) => ({ ...p, [k]: Math.max(0, (p[k] || 0) + 1) }))
   const decPkg = (k) => setPackaging((p) => ({ ...p, [k]: Math.max(0, (p[k] || 0) - 1) }))

   const goNext = () => {
      if (!canProceed) {
         alert('품목 수량과 희망 수거 날짜를 확인해 주세요.')
         return
      }
      if (typeof onNext === 'function') onNext()
   }

   return (
      <div className="donation--content">
         {/* 컨텐츠 영역 */}
         <h3 className="mt-80">기부 물품 선택</h3>

         <div className="donation--setting">
            {/* 총 수량: slice.count (items 합계) */}
            <div className="setting--count mt-40">
               <h4>물품 총 수량 </h4>
               <div className="counter">
                  <div className="counter--decrease" />
                  <input type="number" readOnly value={count} className="counter--count" />
                  <div className="counter--increase" />
               </div>
            </div>

            {/* 패키징: 현재는 로컬 상태만 */}
            <div className="setting--package mt-40">
               <h4>포장방식 및 수량 </h4>
               <div className="counter-group">
                  <div className="counter">
                     <p>박스</p>
                     <button className="counter--decrease" type="button" onClick={() => decPkg('box')} />
                     <input type="number" readOnly value={packaging.box} className="counter--count" />
                     <button className="counter--increase" type="button" onClick={() => incPkg('box')} />
                  </div>
                  <div className="counter mt-20">
                     <p>봉투</p>
                     <button className="counter--decrease" type="button" onClick={() => decPkg('bag')} />
                     <input type="number" readOnly value={packaging.bag} className="counter--count" />
                     <button className="counter--increase" type="button" onClick={() => incPkg('bag')} />
                  </div>
               </div>
            </div>
         </div>

         {/* 품목 상세 배열 */}
         <h3 className="mt-40">품목 상세</h3>
         <div className="mt-10">
            {items.map((it, idx) => (
               <div key={idx} className="item-row mt-10">
                  <select value={it.itemName} onChange={(e) => setItemField(idx, 'itemName', e.target.value)} aria-label={`품목-${idx + 1}`}>
                     <option value="의류">의류</option>
                     <option value="신발">신발</option>
                     <option value="가방">가방</option>
                     <option value="도서">도서</option>
                     <option value="소형가전">소형가전</option>
                     <option value="기타">기타</option>
                  </select>

                  <input
                     type="number"
                     min={1}
                     value={it.amount}
                     onChange={(e) => {
                        const n = Math.max(1, Number(e.target.value) || 1)
                        setItemField(idx, 'amount', n)
                     }}
                     aria-label={`수량-${idx + 1}`}
                  />

                  <button className="btn xs" type="button" onClick={() => removeItem(idx)}>
                     삭제
                  </button>
               </div>
            ))}

            <button className="btn default mt-10" type="button" onClick={addItem}>
               + 품목 추가
            </button>
         </div>

         {/* 수거 방식 */}
         <h3 className="mt-40">수거 방식</h3>
         <div className="group mt-20">
            <button type="button" className={`btn ${method === 'VISIT' ? 'main2' : 'default'}`} onClick={() => dispatch(setMethod('VISIT'))}>
               방문수거
            </button>
            <button type="button" className={`btn ${method === 'COURIER' ? 'main1' : 'default'}`} onClick={() => dispatch(setMethod('COURIER'))}>
               택배수거
            </button>
         </div>

         {/* 날짜 선택 */}
         <h3 className="mt-40">희망 수거 날짜</h3>
         <div className="donation--calendar mt-20">
            <input type="date" value={pickupDate} onChange={(e) => dispatch(setPickupDate(e.target.value))} aria-label="희망 수거 날짜" />
         </div>

         {/* 다음(요약)으로 */}
         <div className="donation--btn mt-40">
            <button className={`btn default main1${canProceed ? '' : ' disabled'}`} type="button" onClick={goNext} disabled={!canProceed} aria-disabled={!canProceed}>
               신청하기
            </button>
         </div>
      </div>
   )
}
