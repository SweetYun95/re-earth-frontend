import './ReissuePasswordForm.scss'

function ReissuePasswordForm() {
   return (
      <>
         <div class="container">
            <h2>비밀번호 재발급</h2>
            <form action="submit" class="reissue">
               <div>
                  <div class="re-pwd mt-80">
                     <div>임시비밀번호가 발급되었습니다</div>
                  </div>
                  <div class="user-card1 mt-20">
                     <div>임시비밀번호(read only)</div>
                  </div>
               </div>
               <div class="user-card2 mt-20">
                  <div class="notice">
                     <div>
                        발급된 임시비밀번호는 30분간 유효합니다. <br />
                        유효기간이 지난 후 기존비밀번호와 임시 비밀번호는 모두 초기화됩니다.
                        <br />
                        로그인 후 마이페이지 비밀번호를 변경해주세요.
                     </div>
                  </div>
               </div>

               <button type="submit" class="btn default main1 mt-40">
                  로그인하러가기
               </button>
            </form>
         </div>
      </>
   )
}
export default ReissuePasswordForm
