import reEarth from './http'

export const getBicycles = async () => {
   const res = await reEarth.get('/saving/bicycles')
   console.log(res)
   return res
}
