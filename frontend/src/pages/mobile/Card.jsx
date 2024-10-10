// Card.jsx
import React from 'react';

const Card = ({ url, name, description, price, deliveryTime }) => (
  <div className="bg-white shadow-lg rounded-lg p-4 min-w-[250px] flex-shrink-0">
    <img src={url} alt={name} className="w-full h-32 object-cover mb-3 rounded-lg" />
    <p className="font-semibold text-base">{name}</p>
    <p className="text-sm text-gray-500">{description}</p>
    {price && <p className="text-xs text-gray-500 mt-2">{price}</p>}
    {deliveryTime && (
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs bg-gray-200 px-2 py-1 rounded-md">{deliveryTime} mins</span>
      </div>
    )}
  </div>
);

export default Card;
