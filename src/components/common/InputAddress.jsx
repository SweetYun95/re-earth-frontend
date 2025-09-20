function InputAddress({ marginTop, value1, value2, inputChange }) {
   return (
      <div className={`form--input ${marginTop || ''}`}>
         <p className="text-body">주소/우편번호</p>
         <div className="with-btn">
            <input type="text" name="addr1" placeholder="기본 주소" value={value1} onChange={inputChange} />
            <button type="button" className="btn main1 default">
               검색
            </button>
         </div>
         <input type="text" name="addr2" placeholder="상세 주소를 입력하세요." className="mt-10" value={value2} onChange={inputChange} required />
      </div>
   )
}

export default InputAddress
