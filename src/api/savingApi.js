import reEarth from './http'

export const getBicycles = async (start = 1, end = 1000) => {
   const res = await reEarth.get('/saving/bicycles', {
      params: { start, end },
   })
   return res
}
