import React from 'react';

const QuickViewModal = ({ product, setQuickViewProduct, addToCart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-[#585649]">
        <h3 className="text-lg font-semibold mb-4 text-[#585649]">{product.name}</h3>
        <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-4" />
        <p className="text-gray-600">${product.price}</p>
        <button
          className="mt-4 bg-[#585649] text-white py-2 px-4 rounded-md w-full font-medium hover:bg-opacity-90 transition duration-300"
          onClick={() => {
            addToCart(product);
            setQuickViewProduct(null);
          }}
        >
          Add to Cart
        </button>
        <button className="mt-2 text-red-600 w-full" onClick={() => setQuickViewProduct(null)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default QuickViewModal;
