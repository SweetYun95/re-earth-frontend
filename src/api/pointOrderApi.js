// re-earth-frontend/src/api/pointorderApi.js
import reEarth from './http'

/**
 * 주문 생성
 */
export const createOrder = async (orderData) => {
   try {
      const { data } = await reEarth.post('/order', orderData)
      return data // { success, message, orderId, totalPrice }
   } catch (error) {
      console.error('API Request 오류(createOrder):', error)
      throw error
   }
}

/**
 * 주문 목록 조회 (페이징/기간 필터)
 */
export const getOrderList = async (data) => {
   try {
      const { page, limit, startDate, endDate } = data

      const response = await reEarth.get(`/order/list?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`)
      return response
   } catch (error) {
      console.log(`API Request 오류: ${error}`)
      throw error
   }
}

/**
 * 주문 취소
 */
export const cancelOrder = async (id) => {
   try {
      const { data } = await reEarth.post(`/order/cancel/${id}`)
      return data // { success, message }
   } catch (error) {
      console.error('API Request 오류(cancelOrder):', error)
      throw error
   }
}

/**
 * 주문 삭제
 */
export const deleteOrder = async (id) => {
   try {
      const { data } = await reEarth.delete(`/order/delete/${id}`)
      return data // { success, message }
   } catch (error) {
      console.error('API Request 오류(deleteOrder):', error)
      throw error
   }
}
