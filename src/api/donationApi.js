// re-earth-frontend/src/api/donationApi.js
import http from './http' // axios 인스턴스 (baseURL/JWT 인터셉터 포함)

const isDev = import.meta.env.MODE !== 'production'

// 🔐 DEV 전용 메모리 저장소
const __otpStore = {}

export const requestOtp = (phone) => {
   if (isDev) {
      const code = '123456' // 개발용 고정 코드
      __otpStore[phone] = code
      return Promise.resolve({ ttl: 180, code }) // code까지 내려줌
   }
   return http.post('/donations/otp/request', { phone }).then((res) => res.data)
}

export const verifyOtp = ({ phone, code }) => {
   if (isDev) {
      const ok = __otpStore[phone] === code || code === '000000' // 000000은 마스터 코드
      return Promise.resolve({ verified: ok })
   }
   return http.post('/donations/otp/verify', { phone, code }).then((res) => res.data)
}

export const createDonation = (payload) => http.post('/donations', payload).then((res) => res.data)

export const getMyDonations = ({ page = 1, size = 10 } = {}) => http.get('/donations/mine', { params: { page, size } }).then((res) => res.data)

export const getDonationById = (id) => http.get(`/donations/${id}`).then((res) => res.data)

export const cancelDonation = (id) => http.put(`/donations/${id}/cancel`).then((res) => res.data)
