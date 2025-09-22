// re-earth-frontend/src/components/admin/DashboardContent.jsx
import { useEffect, useState, useMemo } from 'react'
import { fetchMemberStats } from '../../api/adminMemberApi'
import { fetchDonationStats } from '../../api/adminDonationApi'
import AdminChart from './common/AdminChart'

const DashboardContent = () => {
   const [stats, setStats] = useState(null) // { member, donation }
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   useEffect(() => {
      const load = async () => {
         try {
            setLoading(true)
            const [member, donation] = await Promise.all([fetchMemberStats(), fetchDonationStats()])
            setStats({ member, donation })
         } catch {
            setError('데이터를 불러오지 못했습니다.')
         } finally {
            setLoading(false)
         }
      }
      load()
   }, [])

   // ───────── 회원 통계 (null-safe)
   const totalUsers = Number(stats?.member?.totalUsers || 0)
   const newUsers7d = Number(stats?.member?.newUsers7d || 0)
   const byRole = stats?.member?.byRole || { ADMIN: 0, USER: 0 }
   const recentMembers = Array.isArray(stats?.member?.recentMembers) ? stats.member.recentMembers : []

   // 최근 7일(오늘 포함) 날짜 축 생성
   const last7Dates = useMemo(() => {
      const out = []
      const today = new Date()
      for (let i = 6; i >= 0; i--) {
         const d = new Date(today)
         d.setDate(d.getDate() - i)
         out.push(d.toISOString().slice(0, 10)) // YYYY-MM-DD
      }
      return out
   }, [])

   // 가입/기부 시계열을 맵으로 정규화
   const signupsMap = useMemo(() => {
      const raw = Array.isArray(stats?.member?.signupsByDay) ? stats.member.signupsByDay : []
      return new Map(raw.map((r) => [r.date, Number(r.count || 0)]))
   }, [stats?.member?.signupsByDay])

   const donationsMap = useMemo(() => {
      const raw = Array.isArray(stats?.donation?.donationsByDay) ? stats.donation.donationsByDay : []
      return new Map(raw.map((r) => [r.date, Number(r.count || 0)]))
   }, [stats?.donation?.donationsByDay])

   // 차트(합친 버전)
   const chartCombined = {
      labels: last7Dates.map((d) => d.slice(5)), // MM-DD
      datasets: [
         {
            label: '회원 가입',
            data: last7Dates.map((d) => signupsMap.get(d) || 0),
            borderColor: 'var(--maincolor)',
            backgroundColor: 'rgba(139, 195, 74, 0.1)',
            tension: 0.4,
         },
         {
            label: '기부 건수',
            data: last7Dates.map((d) => donationsMap.get(d) || 0),
            borderColor: 'var(--point-b)',
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            tension: 0.4,
         },
      ],
   }

   // ───────── 기부 통계 (카드·리스트용)
   const donationsThisMonth = Number(stats?.donation?.donationsThisMonth || 0)
   const pointsThisMonth = Number(stats?.donation?.pointsThisMonth || 0)
   const recentDonations = Array.isArray(stats?.donation?.recentDonations) ? stats.donation.recentDonations : []
   const byStatus = stats?.donation?.byStatus || {}

   const cards = [
      { title: '총 회원수', value: totalUsers.toLocaleString(), change: `최근 7일 +${newUsers7d}`, changeType: 'increase' },
      { title: '이번 달 기부 건수', value: donationsThisMonth.toLocaleString(), change: '월 누적', changeType: 'increase' },
      { title: '이번 달 적립 포인트', value: `${pointsThisMonth.toLocaleString()}P`, change: '월 누적', changeType: 'increase' },
      { title: '탄소 절감량', value: '—', change: '연동 예정', changeType: 'increase' },
   ]

   return (
      <div className="dashboard-content">
         <div className="dashboard-content__header mb-4">
            <h1 className="dashboard-content__title">대시보드</h1>
            <p className="dashboard-content__subtitle text-muted">
               관리자 계정: {byRole.ADMIN} · 일반 회원: {byRole.USER}
            </p>
         </div>

         {loading && <p>로딩 중...</p>}
         {!loading && error && <p className="text-danger">{error}</p>}

         {!loading && !error && (
            <>
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

               {/* 합쳐진 차트 */}
               <div className="row">
                  <div className="col-12">
                     <div className="dashboard-chart-container">
                        <div className="dashboard-chart-container__header">
                           <h4>최근 7일 회원가입/기부 추이</h4>
                        </div>
                        <AdminChart data={chartCombined} type="line" />
                     </div>
                  </div>
               </div>

               {/* 최근 가입/기부 */}
               <div className="row mt-4">
                  <div className="col-md-6">
                     <div className="dashboard-activity-card">
                        <h5 className="dashboard-activity-card__title">최근 회원 가입</h5>
                        <div className="dashboard-activity-card__list">
                           {recentMembers.length === 0 && <p className="text-muted">최근 가입한 회원이 없습니다.</p>}
                           {recentMembers.map((u) => (
                              <div key={u.id} className="dashboard-activity-item">
                                 <div className="dashboard-activity-item__avatar">
                                    <img src="../../assets/icons/profile.png" alt="사용자" />
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

                  <div className="col-md-6">
                     <div className="dashboard-activity-card">
                        <h5 className="dashboard-activity-card__title">최근 기부 현황</h5>
                        <div className="dashboard-activity-card__list">
                           {recentDonations.length === 0 && <p className="text-muted">최근 기부가 없습니다.</p>}
                           {recentDonations.map((d) => (
                              <div key={d.id} className="dashboard-activity-item">
                                 <div className="dashboard-activity-item__icon" aria-hidden>
                                    📦
                                 </div>
                                 <div className="dashboard-activity-item__info">
                                    <span className="dashboard-activity-item__name">
                                       #{d.id} · {d.donorName || '-'} ({d.status})
                                    </span>
                                    <span className="dashboard-activity-item__time">
                                       {new Date(d.createdAt).toLocaleDateString()} · 수량 {d.count ?? 0}개 · {(d.expectedPoint ?? 0).toLocaleString()}P
                                    </span>
                                 </div>
                              </div>
                           ))}
                        </div>

                        {Object.keys(byStatus).length > 0 && (
                           <div className="mt-3 small text-muted">
                              {Object.entries(byStatus).map(([k, v]) => (
                                 <span key={k} className="me-3">
                                    {k}: {v}
                                 </span>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </>
         )}
      </div>
   )
}

export default DashboardContent
