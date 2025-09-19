import { useState } from 'react'
import { rideBicycle } from '../../../api/savingApi'

function SavingBicycle() {
   const [data, setData] = useState()
   const handleRecord = () => {
      const res = rideBicycle({ userId: 2, bikeId: 4, distanceKm: 4 })
      setData(res)
   }
   return (
      <div className="container" id="area">
         <button className="btn main2 default" onClick={handleRecord}>
            확인하기
         </button>
      </div>
   )
}

export default SavingBicycle
