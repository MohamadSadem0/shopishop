import React from "react";
const ProductCard = ({ product }) => {
  if (!product) {
    return <p>Product data is not available.</p>;
  }

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md bg-white">
      <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/150?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-600">Price: ${product.price}</p>
      <p className="text-sm text-gray-600">
        {product.isAvailable ? 'Available' : 'Out of Stock'}
      </p>
    </div>
  );
};

export default ProductCard;
