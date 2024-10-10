import React from 'react';

const CartDrawer = ({ cartOpen, setCartOpen, cartItems, removeFromCart, getTotalPrice }) => {
  return (
    <div className={`fixed top-0 right-0 w-80 h-screen bg-white shadow-lg p-6 ${cartOpen ? 'block' : 'hidden'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#585649]">Your Cart</h2>
        <button onClick={() => setCartOpen(false)} className="text-red-600 font-bold">
          Close
        </button>
      </div>
      <div>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between mb-4">
                <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                <div>
                  <p className="text-[#585649]">{item.name}</p>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <button onClick={() => removeFromCart(index)} className="text-red-500">
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-4">
              <p className="font-semibold text-[#585649]">Total: ${getTotalPrice()}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
