// re-earth-frontend/src/api/pointorderApi.js
import reEarth from './http'

/** 주문 생성 */
export const createOrder = async (orderData) => {
   try {
      const res = await reEarth.post('/pointOrder', orderData)
      // API 레이어는 data만 반환하도록 통일
      return res.data // { success, message, orderId, totalPrice }
   } catch (error) {
      console.error('API Request 오류(createOrder):', error)
      throw error
   }
}

/** 주문 목록 조회 (페이징/기간 필터) */
export const getOrderList = async (params = {}) => {
   try {
      // params 사용: undefined 자동 제거 + 인코딩 처리
      const res = await reEarth.get('/pointOrder/list', { params })
      return res.data // ← 일관성 유지 (슬라이스에서도 res.data 안 꺼내도 됨)
   } catch (error) {
      console.log('API Request 오류(getOrderList):', error)
      throw error
   }
}

/** 주문 취소 */
export const cancelOrder = async (id) => {
   try {
      const res = await reEarth.post(`/pointOrder/cancel/${id}`)
      return res.data // { success, message }
   } catch (error) {
      console.error('API Request 오류(cancelOrder):', error)
      throw error
   }
}

/** 주문 삭제 */
export const deleteOrder = async (id) => {
   try {
      const res = await reEarth.delete(`/pointOrder/delete/${id}`)
      return res.data // { success, message }
   } catch (error) {
      console.error('API Request 오류(deleteOrder):', error)
      throw error
   }
}
