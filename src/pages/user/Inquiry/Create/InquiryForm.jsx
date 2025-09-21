import { useNavigate } from "react-router-dom";
import "./inquiryForm.scss";
function InquiryForm() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("문의가 성공적으로 등록되었습니다!");
    navigate("/user/my");
  };
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
          <textarea
            className="mt-40"
            name="content"
            placeholder="내용을 입력하세요."
            rows={15}
          ></textarea>
          <div className="group mt-40">
            <button type="button" className="btn default main2">
              돌아가기
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn default main1"
            >
              작성하기
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default InquiryForm;
