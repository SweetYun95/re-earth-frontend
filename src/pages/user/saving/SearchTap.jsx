import { useEffect } from 'react'
import QrScanner from '../../../components/common/QrScanner'
import { useDispatch } from 'react-redux'
import { getBicycles } from '../../../api/savingApi'

function SearchTap({ category, isMobile }) {
   const dispatch = useDispatch()

   useEffect(() => {
      if (category === 'transit') {
         ;(async () => {
            try {
               const res = await getBicycles() // ✅ dispatch 안 씀
               console.log('🚲 따릉이 데이터:', res.data)
            } catch (err) {
               console.error(err)
            }
         })()
      }
   }, [category])

   const TestBox = () => {
      return (
         <div
            style={{
               width: '20px',
               height: '20px',
               borderRadius: '100%',
               backgroundColor: 'blue',
            }}
         ></div>
      )
   }
   return (
      <div className="searchtap">
         <input type="text" placeholder="장소, 주소, 버스 검색" />
         <span className="mt-20 text-right">검색 결과 12</span>
         <div className="searchtap--spot mt-10">
            <TestBox />
            <div className="spot--address">
               <p>지명</p>
               <p className="description">상세주소 (참고를 위한 임시 텍스트입니다.)</p>
            </div>
            {isMobile && category === 'transit' && <QrScanner label={'인증하기'} />}
         </div>
      </div>
   )
}

export default SearchTap
