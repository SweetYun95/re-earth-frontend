import './inquiryForm.scss'
function InquiryForm() {
   return (
      <section id="main1">
         <div className="container" id="area">
            <form action="submit" className="inquire mt-80">
               <h2>1:1 문의</h2>
               <div className="inquire--header mt-80">
                  <input type="text" placeholder="제목을 입력하세요." />
                  <select name="category">
                     <option value="배송" defaultChecked>
                        배송
                     </option>
                     <option value="기부">기부</option>
                     <option value="인증/적립">인증/적립</option>
                     <option value="주문/결제">주문/결제</option>
                     <option value="서비스">서비스</option>
                     <option value="기타">기타</option>
                  </select>
               </div>
               <textarea className="mt-40" name="content" placeholder="내용을 입력하세요." rows={15}></textarea>
               <div className="group mt-40">
                  <button action="button" className="btn default main2">
                     돌아가기
                  </button>
                  <button action="submit" className="btn default main1">
                     작성하기
                  </button>
               </div>
            </form>
         </div>
      </section>
   )
}

export default InquiryForm
