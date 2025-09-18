import ItemDetail from '../../../components/shop/ItemDetail'
import './Item.scss'

function ItemSellListPage() {
   return (
      <section className="item-sell-list-page">
         <div className="container">
            <div className="row">
               {/* 좌측 사이드바 */}
               <div className="col-md-3">
                  <div className="left-tab">
                     <div className="profile">
                        <img src="/assets/profile.png" alt="프로필" />
                        <p>닉네임</p>
                     </div>
                  </div>

                  <ul className="left-tab mt-10">
                     <li>
                        <img src="/icons/home.svg" alt="메뉴 아이콘" />
                        <p>홈</p>
                     </li>
                     <li>
                        <img src="/icons/market.svg" alt="메뉴 아이콘" />
                        <p>아나바다장터</p>
                     </li>
                     <li>
                        <img src="/icons/pointshop.svg" alt="메뉴 아이콘" />
                        <p>포인트샵</p>
                     </li>
                     <li>
                        <img src="/icons/mypage.svg" alt="메뉴 아이콘" />
                        <p>마이페이지</p>
                     </li>
                     <li>
                        <img src="/icons/settings.svg" alt="메뉴 아이콘" />
                        <p>설정</p>
                     </li>
                  </ul>
               </div>

               {/* 우측 컨텐츠 */}
               <div className="col-md-9">
                  <ItemDetail />
               </div>
            </div>
         </div>
      </section>
   )
}

export default ItemSellListPage
