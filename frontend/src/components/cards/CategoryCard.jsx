import React, { useState } from 'react';

const CategoryCard = ({ title, src }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleCardClick = () => {
    setIsSelected(!isSelected); // Toggle the selected state
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative w-[100px] h-[120px] sm:w-[110px] sm:h-[130px] md:w-[120px] md:h-[140px] rounded-[20px] flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 ${
        isSelected ? 'bg-[#DD5838] scale-105' : 'bg-[#EFECD6]'
      }`}
    >
      {/* Category Background */}
      <div className="absolute inset-0 rounded-[20px]"></div>

      {/* Category Image */}
      <div className="relative w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px] rounded-full border-[0.5px] border-black overflow-hidden mb-2">
        <img src={src} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Category Title */}
      <div
        className={`text-[12px] sm:text-[14px] md:text-[16px] text-center font-roboto font-normal leading-[16px] sm:leading-[18px] md:leading-[20px] ${
          isSelected ? 'text-white' : 'text-black'
        }`}
      >
        {title}
      </div>
    </div>
  );
};

export default CategoryCard;
