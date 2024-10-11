import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const QuickViewModal = ({ product, setQuickViewProduct, addToCart }) => {

  // Disable scrolling on the store when the modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = ''; // Cleanup on component unmount
    };
  }, [product]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end transition-opacity duration-300 ${
        product ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div
        className={`w-full max-w-4xl bg-white rounded-t-3xl shadow-xl p-8 transform transition-transform duration-500 ease-in-out ${
          product ? 'translate-y-0 animate-slideUp' : 'translate-y-full'
        }`}
        style={{ height: '85%' }}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
          onClick={() => setQuickViewProduct(null)}
        >
          <FaTimes />
        </button>

        {/* Product Image and Details */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <img
              src={product?.imageUrl}
              alt={product?.name}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-color1">{product?.name}</h2>
            <p className="text-lg text-gray-600 mb-4">{product?.category}</p>
            <p className="text-2xl font-semibold text-color2 mb-6">${product?.price}</p>

            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Description</h4>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius, justo nec varius congue, urna est euismod felis, eget vestibulum dolor ligula vitae neque.
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              className="w-full bg-color1 hover:bg-opacity-90 text-white py-3 px-6 rounded-lg font-medium transition duration-300 shadow-md mb-4"
              onClick={() => {
                addToCart(product);
                setQuickViewProduct(null); // Close modal after adding to cart
              }}
            >
              Add to Cart
            </button>

            {/* Close Modal Button */}
            <button
              className="w-full bg-gray-200 text-gray-700  py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition duration-300 shadow-md"
              onClick={() => setQuickViewProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
