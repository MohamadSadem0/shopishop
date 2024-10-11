import React from 'react';

const ProductCard = ({ product, addToCart, setQuickViewProduct }) => {
  const { name, category, price, imageUrl, location, storeName, available, discount } = product;

  return (
    <div className="bg-white flex flex-col flex-grow max-w-[380px] sm:w-[48%] md:w-[30%] p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 relative">
      

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-lg mb-4 h-[200px] flex justify-center items-center bg-gray-100">
        <img
          src={imageUrl}
          alt={name}
          className="w-auto h-auto object-contain transition-transform duration-300 transform hover:scale-105"
        />
              {/* Discount Badge */}
      {discount && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
          {discount}% OFF
        </div>
      )}

      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-color1 mb-2">{name}</h3>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-lg font-bold text-color2 mt-2">${price}</p>

        {/* Location and Store Name */}
        <p className="text-sm text-gray-600 mt-1">Location: {location}</p>
        <p className="text-sm text-gray-600">Store: {storeName}</p>

        {/* Availability */}
        <p className={`text-sm mt-2 ${available ? 'text-green-600' : 'text-red-600'}`}>
          {available ? 'Available' : 'Out of Stock'}
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex flex-col space-y-2">
        <button
          className={`bg-color1 hover:bg-opacity-90 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300 shadow-md ${
            !available ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => available && addToCart(product)} // Prevent adding to cart if unavailable
          disabled={!available}
        >
          Add to Cart
        </button>
        <button
          className="bg-white text-color1 border border-color1 py-2 px-4 rounded-lg font-medium hover:bg-color2 hover:text-color1 transition-colors duration-300 shadow-md"
          onClick={() => setQuickViewProduct(product)}
        >
          Quick View
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
