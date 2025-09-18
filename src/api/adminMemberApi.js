// re-earth-frontend/src/api/adminMemberApi.js
import reEarth from './http'

/**
 * 목록 조회 (검색/정렬/페이지네이션)
 * params: {
 *   page=1, size=20, sort='createdAt', order='DESC',
 *   userId, name, email,
 *   joinedFrom, joinedTo,      // 'YYYY-MM-DD'
 *   minPoint, maxPoint
 * }
 */
export async function fetchMembers(params = {}) {
   const { data } = await reEarth.get('/api/admin/members', { params })
   return data
}

/** 단건 조회 */
export async function fetchMemberById(id) {
   const { data } = await reEarth.get(`/api/admin/members/${id}`)
   return data
}

/** 수정 (이름/주소/전화/권한 등) */
export async function updateMember(id, payload) {
   const { data } = await reEarth.put(`/api/admin/members/${id}`, payload)
   return data
}

/** 일괄 삭제: { ids: number[] } */
export async function deleteMembers(ids = []) {
   const { data } = await reEarth.delete('/api/admin/members', { data: { ids } })
   return data
}

/** 대시보드 통계 */
export async function fetchMemberStats() {
   const { data } = await reEarth.get('/api/admin/members/stats')
   return data
}

/** UI 필터 → API 파라미터 변환 헬퍼 (선택) */
export function buildMemberParams({ page = 1, size = 20, sort = 'createdAt', order = 'DESC', filters = {} } = {}) {
   const p = { page, size, sort, order }

   if (filters.userId) p.userId = filters.userId
   if (filters.name) p.name = filters.name
   if (filters.email) p.email = filters.email

   // joinedFrom / joinedTo는 YYYY-MM-DD 형태로 넘어오도록 가정
   if (filters.joinDate?.from) p.joinedFrom = filters.joinDate.from
   if (filters.joinDate?.to) p.joinedTo = filters.joinDate.to

   if (filters.pointRange?.min !== undefined && filters.pointRange?.min !== '') {
      p.minPoint = filters.pointRange.min
   }
   if (filters.pointRange?.max !== undefined && filters.pointRange?.max !== '') {
      p.maxPoint = filters.pointRange.max
   }

   // 'status'는 현재 백엔드 User 모델에 컬럼이 없으니 보류
   return p
}

export default {
   fetchMembers,
   fetchMemberById,
   updateMember,
   deleteMembers,
   fetchMemberStats, 
   buildMemberParams,
}
