import React from 'react';

const FormSelect = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  placeholder, 
  required = false, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <select
        className="form-control"
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;