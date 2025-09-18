import { useEffect, useState, useMemo } from 'react'
import { fetchMemberStats } from '../../api/adminMemberApi'
import AdminChart from './common/AdminChart'

const DashboardContent = () => {
   const [stats, setStats] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   useEffect(() => {
      const load = async () => {
         try {
            setLoading(true)
            const data = await fetchMemberStats()
            setStats(data)
         } catch {
            setError('데이터를 불러오지 못했습니다.')
         } finally {
            setLoading(false)
         }
      }
      load()
   }, [])

   // 안전하게 디폴트값
   const totalUsers = Number(stats?.totalUsers || 0)
   const newUsers7d = Number(stats?.newUsers7d || 0)
   const byRole = stats?.byRole || { ADMIN: 0, USER: 0 }
   const recentMembers = Array.isArray(stats?.recentMembers) ? stats.recentMembers : []

   // 최근 7일 라벨 채우기 (빈 날은 0)
   const daySeries = useMemo(() => {
      const raw = Array.isArray(stats?.signupsByDay) ? stats.signupsByDay : []
      const map = new Map(raw.map((d) => [d.date, Number(d.count || 0)]))
      const out = []
      const today = new Date()
      for (let i = 6; i >= 0; i--) {
         const t = new Date(today)
         t.setDate(t.getDate() - i)
         const key = t.toISOString().slice(0, 10)
         out.push({ date: key, count: map.get(key) || 0 })
      }
      return out
   }, [stats?.signupsByDay])

   if (loading) return <p>로딩 중...</p>
   if (error) return <p className="text-danger">{error}</p>
   if (!stats) return null

   // 카드 데이터
   const cards = [
      { title: '총 회원수', value: totalUsers.toLocaleString(), change: `최근 7일 +${newUsers7d}`, changeType: 'increase' },
      { title: '이번 달 기부 건수', value: '—', change: '준비중', changeType: 'increase' },
      { title: '포인트 적립량', value: '—', change: '준비중', changeType: 'increase' },
      { title: '탄소 절감량', value: '—', change: '준비중', changeType: 'increase' },
   ]

   const chartData = {
      labels: daySeries.map((d) => d.date.slice(5)), // MM-DD
      datasets: [
         {
            label: '회원 가입',
            data: daySeries.map((d) => d.count),
            borderColor: 'var(--maincolor)',
            backgroundColor: 'rgba(139, 195, 74, 0.1)',
            tension: 0.4,
         },
      ],
   }

   return (
      <div className="dashboard-content">
         <div className="dashboard-content__header mb-4">
            <h1 className="dashboard-content__title">대시보드</h1>
            <p className="dashboard-content__subtitle text-muted">
               관리자 계정: {byRole.ADMIN} · 일반 회원: {byRole.USER}
            </p>
         </div>

         {/* 카드 */}
         <div className="row mb-4">
            {cards.map((stat, idx) => (
               <div key={idx} className="col-lg-3 col-md-6 mb-3">
                  <div className="dashboard-stat-card">
                     <div className="dashboard-stat-card__body">
                        <h6 className="dashboard-stat-card__title">{stat.title}</h6>
                        <h3 className="dashboard-stat-card__value">{stat.value}</h3>
                        <span className={`dashboard-stat-card__change dashboard-stat-card__change--${stat.changeType}`}>{stat.change}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* 차트 */}
         <div className="row">
            <div className="col-12">
               <div className="dashboard-chart-container">
                  <div className="dashboard-chart-container__header">
                     <h4>최근 7일 회원 가입 추이</h4>
                  </div>
                  <AdminChart data={chartData} type="line" />
               </div>
            </div>
         </div>

         {/* 최근 가입자 */}
         <div className="row mt-4">
            <div className="col-md-6">
               <div className="dashboard-activity-card">
                  <h5 className="dashboard-activity-card__title">최근 회원 가입</h5>
                  <div className="dashboard-activity-card__list">
                     {recentMembers.length === 0 && <p className="text-muted">최근 가입한 회원이 없습니다.</p>}
                     {recentMembers.map((u) => (
                        <div key={u.id} className="dashboard-activity-item">
                           <div className="dashboard-activity-item__avatar">
                              <img src="/src/assets/icons/profile.png" alt="사용자" />
                           </div>
                           <div className="dashboard-activity-item__info">
                              <span className="dashboard-activity-item__name">{u.name}</span>
                              <span className="dashboard-activity-item__time">{new Date(u.createdAt).toLocaleDateString()}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* 우측 카드 (임시) */}
            <div className="col-md-6">
               <div className="dashboard-activity-card">
                  <h5 className="dashboard-activity-card__title">최근 기부 현황</h5>
                  <div className="dashboard-activity-card__list">
                     <p>⚠️ 기부 통계 API 연동 예정</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DashboardContent
