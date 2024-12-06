import React from 'react';
import {ReactComponent as StarIcon} from "../../assets/icons/StarIcon.svg"

const DashboardItemCard = ({ image, name, rating, design = {} }) => {
  return (
    <div className={`flex items-center p-4 rounded-lg  max-w-md ${design.container || ''}`}>
      {/* Left: Image */}
      <img
        src={image}
        alt={name}
        className={`w-16 h-16 rounded-full object-cover mr-4 ${design.image || ''}`}
      />

      {/* Right: Name and Rating */}
      <div className="flex-1">
        {/* Name */}
        <div className={`text-lg font-semibold ${design.text || ''}`}>
          {name}
        </div>
        {/* Rating */}
        <div className="flex items-center mt-2">
          {[...Array(rating)].map((_, index) => (
            <StarIcon key={index} className={`h-5 w-5 ${design.star || ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardItemCard;
