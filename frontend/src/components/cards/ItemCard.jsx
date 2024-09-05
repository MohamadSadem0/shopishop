// ItemCard.jsx
import React from 'react';

const ItemCard = ({ title, price, imageSrc }) => {
  return (
    <div className="relative w-[356px] h-[208px] flex-shrink-0">
      {/* Card Background */}
      <div className="absolute inset-0 bg-[#878472] rounded-[20px]"></div>

      {/* Item Image */}
      <div className="absolute left-[34px] top-[25px] w-[144px] h-[159px] bg-black rounded-[15px] overflow-hidden">
        <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Item Title */}
      <div className="absolute left-[198px] top-[35px] text-white text-[14px] font-roboto font-bold leading-[21px]">
        {title}
      </div>

      {/* Item Price */}
      <div className="absolute left-[198px] top-[90px] text-white text-[14px] font-roboto font-bold leading-[21px]">
        ${price}
      </div>

      {/* Add to Cart Button */}
      <div className="absolute left-[193px] top-[131px] w-[75px] h-[30px] flex items-center justify-center border-[1px] border-white rounded-[15px]">
        <span className="text-white text-[11px] font-roboto font-bold leading-[16.5px]">Add to cart</span>
      </div>
    </div>
  );
};

export default ItemCard;
