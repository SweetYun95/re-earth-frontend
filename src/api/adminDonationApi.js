// re-earth-frontend/src/api/adminDonationApi.js
import http from './http' // 관리자 JWT 필요

// 목록/상세/수정
export const adminListDonations = (params = {}) => http.get('/api/admin/donations', { params }).then((r) => r.data)

export const adminGetDonation = (id) => http.get(`/api/admin/donations/${id}`).then((r) => r.data)

export const adminUpdateDonation = (id, payload) => http.put(`/api/admin/donations/${id}`, payload).then((r) => r.data)

// ✅ 대시보드용 기부 통계
export const fetchDonationStats = () => http.get('/api/admin/donations/stats').then((r) => r.data)
