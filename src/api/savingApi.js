import reEarth from './http'

// 따릉이 대여소 조회
export const getBicycles = async (start = 1, end = 1000) => {
   const res = await reEarth.get('/saving/bicycles', {
      params: { start, end },
   })
   return res
}

export const rideBicycle = async (data) => {
   // data: { userId, bikeId, distancekm }
   console.log('데이터:', data)
   const res = await reEarth.post('/saving/bicycle/end', data)
   console.log('결과:', res)

   return res
}
