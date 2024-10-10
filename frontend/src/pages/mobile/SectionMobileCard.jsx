import React from 'react';

// Card component to display each section
const SectionMobileCard = ({ name, url }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <img src={url} alt={name} className="w-16 h-16 mb-3" /> {/* Image */}
      <p className="text-gray-800 font-semibold">{name}</p> {/* Section Name */}
    </div>
  );
};

export default SectionMobileCard;
