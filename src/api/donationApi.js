// re-earth-frontend/src/api/donationApi.js
import http from './http' // axios 인스턴스 (baseURL/JWT 인터셉터 포함)

export const requestOtp = (phone) => http.post('/donations/otp/request', { phone }).then((res) => res.data)

export const verifyOtp = ({ phone, code }) => http.post('/donations/otp/verify', { phone, code }).then((res) => res.data)

export const createDonation = (payload) =>
   // payload: { items, count, returnAddress, method, pickupDate }
   http.post('/donations', payload).then((res) => res.data)

export const getMyDonations = ({ page = 1, size = 10 } = {}) => http.get('/donations/mine', { params: { page, size } }).then((res) => res.data)

export const getDonationById = (id) => http.get(`/donations/${id}`).then((res) => res.data)

export const cancelDonation = (id) => http.put(`/donations/${id}/cancel`).then((res) => res.data)
