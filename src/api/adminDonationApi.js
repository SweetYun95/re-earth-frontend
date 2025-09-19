// re-earth-frontend/src/api/adminDonationApi.js
import http from './http' // 관리자 JWT 필요

export const adminListDonations = (params = {}) => http.get('/api/admin/donations', { params }).then((r) => r.data)

export const adminGetDonation = (id) => http.get(`/api/admin/donations/${id}`).then((r) => r.data)

export const adminUpdateDonation = (id, payload) => http.put(`/api/admin/donations/${id}`, payload).then((r) => r.data)
