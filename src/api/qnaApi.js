// re-earth-frontend/src/api/qnaApi.js
import reEarth from './http'

// ───────── 유저 QnA
export const createQnaApi = (payload) => reEarth.post('/qna', payload)
export const getMyQnasApi = () => reEarth.get('/qna/me')
export const getQnaDetailApi = (id) => reEarth.get(`/qna/${id}`)
export const deleteQnaApi = (id) => reEarth.delete(`/qna/${id}`)

// ───────── 관리자 QnA
export const adminListQnaApi = ({ page = 1, size = 20, status } = {}) => reEarth.get('/api/admin/qna', { params: { page, size, status } })

export const adminAnswerQnaApi = ({ id, body }) => reEarth.post(`/api/admin/qna/${id}/answer`, { body })

export const adminUpdateStatusQnaApi = ({ id, status }) => reEarth.patch(`/api/admin/qna/${id}/status`, { status })
