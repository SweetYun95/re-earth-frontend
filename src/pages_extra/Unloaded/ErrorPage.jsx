import './errorPage.scss'
import errorIcon from '../../assets/icons/error.png'
import { useSelector } from 'react-redux'
function ErrorPage() {
   const error = 404
   const { user } = useSelector((s) => s.auth || {})
   console.log(user)
   return (
      <section id="main1">
         <div className="container">
            <div className="row error">
               <div className="col-md-3 error--img">
                  <img src={errorIcon} alt="" />
               </div>
               <div className="col-md-7 error--text">
                  {error === 404 ? (
                     <>
                        <p>404: Not found</p>
                        <p>죄송합니다. 페이지를 찾을 수 없습니다.</p>
                        <p className="mt-40">
                           요청된 페이지가 존재하지 않거나 <br /> 주소가 변경/삭제되어 찾을 수 없습니다.
                        </p>
                     </>
                  ) : (
                     <>
                        <p>500: Error</p>
                        <p>현재 example.com에서 요청을 처리할 수 없습니다.</p>
                        <p className="mt-40">
                           시스템 에러가 발생하여 페이지를 표시할 수 없습니다. <br />
                           서비스 이용에 불편을 드려 죄송합니다.
                        </p>
                     </>
                  )}

                  <a href="/" className="btn default main1 mt-40">
                     메인으로 돌아가기
                  </a>
               </div>
            </div>
         </div>
      </section>
   )
}

export default ErrorPage
