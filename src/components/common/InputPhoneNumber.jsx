function InputPhoneNumber({ marginTop, value1, value2, value3, inputChange }) {
   return (
      <>
         <div className={`form--input ${marginTop || ''}`}>
            <p className="text-body">휴대폰번호</p>
            <div className="input-phone">
               <input type="tel" inputMode="numeric" pattern="\d*" maxLength={3} name="phone1" placeholder="010" value={value1} onChange={inputChange} />
               <span>-</span>
               <input type="tel" inputMode="numeric" pattern="\d*" maxLength={4} name="phone2" placeholder="1234" value={value2} onChange={inputChange} />
               <span>-</span>
               <input type="tel" inputMode="numeric" pattern="\d*" maxLength={4} name="phone3" placeholder="5678" value={value3} onChange={inputChange} />
            </div>
         </div>
      </>
   )
}

export default InputPhoneNumber
