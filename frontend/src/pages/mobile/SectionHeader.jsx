// SectionHeader.jsx
import React from 'react';

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="font-bold text-lg mb-2">{title}</h2>
    {subtitle && <p className="text-gray-500 mb-4">{subtitle}</p>}
  </div>
);

export default SectionHeader;
