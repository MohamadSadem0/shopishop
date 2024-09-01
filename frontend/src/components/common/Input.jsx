import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder = '', className = '' }) => (
  <div className="mb-4">
    {label && <label className="block  text-sm font-bold mb-2">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-whitee leading-tight focus:outline-none focus:shadow-outline ${className}`}
    />
  </div>
);

export default Input;
