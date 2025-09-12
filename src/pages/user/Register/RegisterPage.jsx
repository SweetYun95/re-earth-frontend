import './register.scss'
function RegisterPage() {
   return (
      <section id="main1">
         <div id="area" className="container">
            <div id="register">
               <div className="user-register">
                  <h3>회원정보입력</h3>
                  <form action="submit" className="registerform mt-80">
                     <div className="form--input">
                        <p className="text-body">아이디</p>
                        <div className="with-btn">
                           <input type="text" name="id" placeholder="4-20자, 영문 대·소문자 및 숫자" />
                           <button className="btn main1 check default">중복확인</button>
                        </div>
                     </div>
                     <div className="form--input mt-20">
                        <p className="text-body">닉네임</p>
                        <div className="with-btn">
                           <input type="text" name="nick" placeholder="아이디를 입력하세요." />
                           <button className="btn main1 check default">중복확인</button>
                        </div>
                     </div>
                     <div className="form--input mt-20">
                        <p className="text-body">비밀번호</p>
                        <div className="password-check">
                           <input type="password" name="password" placeholder="8자 이상, 영문, 숫자, 특수문자 모두 포함" />
                           <input type="password" name="check-password" placeholder="비밀번호를 한 번 더 입력하세요." />
                        </div>
                     </div>
                     <div className="form--input mt-20">
                        <p className="text-body">휴대폰번호</p>
                        <div className="input-phone">
                           <input type="number" name="phone1" placeholder="010" />
                           <span>-</span>
                           <input type="number" name="phone2" placeholder="1234" />
                           <span>-</span>
                           <input type="number" name="phone2" placeholder="5678" />
                        </div>
                     </div>
                     <div className="form--input mt-20">
                        <p className="text-body">이메일</p>
                        <div className="with-btn">
                           <input type="email" name="email" placeholder="예) example@gmail.com" />
                           <button className="btn main1 check default">중복확인</button>
                        </div>
                     </div>
                     <div className="form--input mt-20">
                        <p className="text-body">주소/우편번호</p>

                        <div className="with-btn">
                           <input type="text" disabled />
                           <button className="btn main1 default"> 검색</button>
                        </div>
                        <input type="text" placeholder="상세 주소를 입력하세요." className="mt-10" />
                     </div>
                     <button type="submit" className="btn default main1 mt-40">
                        회원가입
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </section>
   )
}

export default RegisterPage
