import reEarth from './http'

// 상품 등록
export const createItem = async (itemData) => {
   try {
      const response = await reEarth.post('/item', itemData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}
//상품수정
export const updateItem = async (id, itemData) => {
   try {
      const response = await reEarth.put(`/item/${id}`, itemData, {
         headers: { 'Content-Type': 'multipart/form-data' },
      })
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}
// 상품 삭제
export const deleteItem = async (id) => {
   try {
      const response = await reEarth.delete(`/item/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류:${error}`)
      throw error
   }
}
//전체 상품 리스트 가져오기
export const getItems = async () => {
   try {
      const response = await reEarth.get(`/item`)
      return response.data.items
   } catch (error) {
      console.error(`API Request 오류:${error}`)
      throw error
   }
}
// 특정 상품 가져오기
export const getItemById = async (id) => {
   try {
      const response = await reEarth.get(`/item/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류:${error}`)
      throw error
   }
}
