function InputField({ label, type, name, value, placeholder, inputChange, marginTop, disabled, required, autoComplete }) {
   return (
      <div className={`form--input ${marginTop || ''}`}>
         <p className="text-body">{label}</p>
         <input type={type} name={name} placeholder={placeholder} value={value} onChange={inputChange} disabled={disabled} required={required || false} autoComplete={autoComplete} />
      </div>
   )
}

export default InputField
