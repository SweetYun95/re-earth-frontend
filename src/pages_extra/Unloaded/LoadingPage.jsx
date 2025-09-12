import './loadingPage.scss'
function LoadingPage() {
   return (
      <section id="main1">
         <div className="container">
            <div className="loading">
               <div className="group">
                  <div className="circle circle1"></div>
                  <div className="circle circle2 "></div>
                  <div className="circle circle3"></div>
               </div>
               <p className="text-body mt-40">페이지를 불러오는 중이에요</p>
            </div>
         </div>
      </section>
   )
}

export default LoadingPage
