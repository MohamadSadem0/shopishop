import React from 'react';
import "../../styles/itemCard.css"; // Ensure this is used for custom styles if needed

const ItemCard = ({ title, price, imageSrc }) => {
  return (
    <div className="item-card bg-[#878472] max-w-[250px] sm:max-h-[150px] rounded-[20px] sm:h-auto flex flex-col sm:flex-row items-center sm:items-start p-4 md:h-[208px] w-full sm:w-[48%] md:w-[30%] lg:w-[22%] flex-shrink-0">
      {/* Item Image */}
      <div className="item-image flex-shrink-0 w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[144px] md:h-[159px] rounded-[15px] overflow-hidden">
        <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Item Details */}
      <div className="item-details flex flex-col justify-between ml-4">
        {/* Item Title */}
        <div className="item-title text-white text-[12px] sm:text-[14px] font-roboto font-bold leading-[18px] sm:leading-[21px] mb-2">
          {title}
        </div>

        {/* Item Price */}
        <div className="item-price text-white text-[12px] sm:text-[14px] font-roboto font-bold leading-[18px] sm:leading-[21px] mb-2">
          ${price}
        </div>

        {/* Add to Cart Button */}
        <div className="item-button flex items-center justify-center w-[65px] h-[25px] sm:w-[75px] sm:h-[30px] border-[1px] border-white rounded-[15px]">
          <span className="text-white text-[10px] sm:text-[11px] font-roboto font-bold leading-[16.5px]">Add to cart</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
