import React from 'react';

const ProductCard = ({ product, addToCart, setQuickViewProduct }) => {
  return (
    <div className="bg-white flex flex-col min-w-[300px] sm:w-[48%] md:w-[30%] p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 object-cover rounded-lg transition-transform duration-300 transform hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-[#585649] mb-2">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-lg font-bold text-[#fede00] mt-2">${product.price}</p>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex flex-col space-y-2">
        <button
          className="bg-[#585649] hover:bg-opacity-90 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300 shadow-md"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        <button
          className="bg-white text-[#585649] border border-[#585649] py-2 px-4 rounded-lg font-medium hover:bg-[#fede00] hover:text-[#585649] transition-colors duration-300 shadow-md"
          onClick={() => setQuickViewProduct(product)}
        >
          Quick View
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
