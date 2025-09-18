import { useEffect, useState } from 'react'
import QrScanner from '../../../components/common/QrScanner'
import { getBicycles } from '../../../api/savingApi'

function SearchTap({ category, isMobile, data, setData }) {
   const [position] = useState({ lat: 37.5556488, lng: 126.91062927 })
   const [allStations, setAllStations] = useState([])

   function getDistance(lat1, lng1, lat2, lng2) {
      const R = 6371e3 // 지구 반경 (미터)
      const toRad = (deg) => (deg * Math.PI) / 180

      const φ1 = toRad(lat1)
      const φ2 = toRad(lat2)
      const Δφ = toRad(lat2 - lat1)
      const Δλ = toRad(lng2 - lng1)

      const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

      return R * c // meter
   }

   useEffect(() => {
      ;(async () => {
         try {
            const res1 = await getBicycles(1, 1000)
            const res2 = await getBicycles(1001, 2000)
            const res3 = await getBicycles(2001, 3000)
            setAllStations([...res1.data, ...res2.data, ...res3.data])
         } catch (err) {
            console.error(err)
         }
      })()
   }, [])

   useEffect(() => {
      if (category === 'transit' && allStations.length > 0) {
         const myLat = position.lat
         const myLng = position.lng

         const nearby = allStations
            .filter((station) => {
               const dist = getDistance(myLat, myLng, Number(station.stationLatitude), Number(station.stationLongitude))
               return dist <= 1500
            })
            .sort((a, b) => {
               const distA = getDistance(myLat, myLng, Number(a.stationLatitude), Number(a.stationLongitude))
               const distB = getDistance(myLat, myLng, Number(b.stationLatitude), Number(b.stationLongitude))
               return distA - distB
            })

         setData(nearby)
      }
   }, [category, position, allStations])

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
   if (data) {
      console.log('🎈data:', data)
   }
   return (
      data && (
         <div className="searchtap">
            <input type="text" placeholder="장소, 주소, 버스 검색" />
            <span className="mt-20 text-right">검색 결과 {data.length > 0 ? data.length : '없음'}</span>
            {data.map((spot) => (
               <div className="searchtap--spot mt-10">
                  <TestBox />
                  <div className="spot--address">
                     <p>{spot.stationName.replace(/^\d+\.\s*/, '')}</p>
                     <div className="description">
                        대여 가능 {spot.parkingBikeTotCnt > 0 ? <p className="spot-data">{spot.parkingBikeTotCnt}대</p> : <p className="spot-data none">없음</p>} 주차 가능 거치대 {spot.shared > 100 ? <p className="spot-data none">없음</p> : <p className="spot-data">있음</p>}
                     </div>
                  </div>
                  {isMobile && category === 'transit' && <QrScanner label={'인증하기'} />}
               </div>
            ))}
         </div>
      )
   )
}

export default SearchTap
