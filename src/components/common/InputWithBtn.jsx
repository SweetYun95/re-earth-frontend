function InputWithBtn({ label, type, name, value, placeholder, inputChange, handleClick, buttonText, marginTop, disabled, required }) {
   return (
      <div className={`form--input ${marginTop || ''}`}>
         <p> {label}</p>
         <div className="with-btn">
            <input type={type} name={name} placeholder={placeholder} value={value} onChange={inputChange} disabled={disabled} required={required || false} />
            <button type="button" className="btn main1 check default" onClick={handleClick}>
               {buttonText}
            </button>
         </div>
      </div>
   )
}

export default InputWithBtn
