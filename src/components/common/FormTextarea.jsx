import React from 'react';

const FormTextarea = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  rows = 3,
  className = '',
  ...props 
}) => {
  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      <textarea
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        {...props}
      />
    </div>
  );
};

export default FormTextarea;