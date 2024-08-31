import React from 'react';

const Button = ({ label, onClick, type = 'button', disabled = false, className = '' }) => (
  <button
    type={type}
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400 ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

export default Button;
