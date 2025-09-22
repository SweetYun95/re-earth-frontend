// re-earth-frontend/src/pages/user/main/MainPage.jsx
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchItemsThunk } from '../../../features/itemSlice'
import MenuBar from '../../../components/menu/MenuBar'
import HeroSection from './sections/HeroSection'
import StatsAndMapSection from './sections/StatsAndMapSection'
import ArrowIcon from '../../../components/common/ArrowIcon'
import PointShop from '../../../components/shop/PointShop'
import NewsSection from './sections/NewsSection'
import SupportSection from './sections/SupportSection'
import AppCtaSection from './sections/AppCtaSection'

import './mainpage.scss'

export default function MainPage() {
   const dispatch = useDispatch()
   const { items, loading, error } = useSelector((state) => state.items)

   useEffect(() => {
      dispatch(fetchItemsThunk())
   }, [dispatch])

   // 메인페이지에서는 상위 4개 상품만 표시
   const displayItems = items?.slice(0, 4) || []

   return (
      <main className="main-content">
         <MenuBar />
         <HeroSection />
         <StatsAndMapSection />
         <section id="pointshop" className="main--pointshop section">
            <div className="container">
               <div className="row d-flex">
                  {/* 제목 영역 - col-3 */}
                  <div className="col-md-3">
                     <div className="h-100 d-flex pb-5 p-2 flex-column justify-content-center">
                        <h2 className="mb-2 font-weight-bold main--section__title main--section__title--pointshop">PointShop</h2>
                        <p className="mb-4">Re:earth의 다양한 상품을 만나보세요</p>
                        <div className="d-flex align-items-center">
                           <a href="/pointshop">
                              <ArrowIcon variant="section" size={32} />
                           </a>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-9">
                     <PointShop items={displayItems} loading={loading} error={error} />
                  </div>
               </div>
            </div>
         </section>
         <NewsSection />
         <SupportSection />
         <AppCtaSection />
      </main>
   )
}
