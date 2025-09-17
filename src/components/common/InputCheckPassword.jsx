function InputCheckPassword({ marginTop, value1, value2, inputChange }) {
   return (
      <div className={`form--input ${marginTop || ''}`}>
         <p className="text-body">비밀번호 </p>
         <div className="password-check">
            <input type="password" name="password" placeholder="8자 이상, 영문, 숫자, 특수문자 모두 포함" value={value1} onChange={inputChange} required />
            {/* 기존 name="check-password"를 유지하면서 상태는 password2로 매핑 */}
            <input type="password" name="check-password" placeholder="비밀번호를 한 번 더 입력하세요." value={value2} onChange={inputChange} required />
         </div>
      </div>
   )
}

export default InputCheckPassword
