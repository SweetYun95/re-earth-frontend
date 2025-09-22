function InputField({ 
   label, 
   type = 'text', 
   name, 
   value, 
   placeholder, 
   inputChange, 
   marginTop, 
   disabled, 
   required, 
   autoComplete,
   maxLength,
   min,
   rows,
   className = '',
   ...props 
}) {
   return (
      <div className={`mb-3 ${marginTop || ''} ${className}`}>
         {label && (
            <label className="form-label">
               {label}
               {required && <span className="text-danger ml-1">*</span>}
            </label>
         )}
         {type === 'textarea' ? (
            <textarea
               name={name}
               className="form-control"
               placeholder={placeholder}
               value={value}
               onChange={inputChange}
               disabled={disabled}
               required={required || false}
               rows={rows || 3}
               maxLength={maxLength}
               {...props}
            />
         ) : (
            <input
               type={type}
               name={name}
               className="form-control"
               placeholder={placeholder}
               value={value}
               onChange={inputChange}
               disabled={disabled}
               required={required || false}
               autoComplete={autoComplete}
               maxLength={maxLength}
               min={min}
               {...props}
            />
         )}
      </div>
   )
}

export default InputField
