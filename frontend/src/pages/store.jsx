import React, { useState } from 'react';
import Navbar from '../components/layout/NavBar';
import ProductGrid from './store/ProductGrid';
import CartDrawer from './store/CartDrawer';
import QuickViewModal from '../components/common/QuickViewModal';

// Dummy data for merchants and products
const merchants = [
  { id: 1, name: 'Fashion', categories: ['Men', 'Women', 'Accessories'] },
  { id: 2, name: 'Shoes', categories: ['Sneakers', 'Formal', 'Sandals'] },
];

const products = [
  { id: 1, name: 'Keyboard', category: 'Electronics', price: 240, rating: 4.5, imageUrl: '/images/keyboard.jpg' },
  { id: 2, name: 'Headphones', category: 'Electronics', price: 337, rating: 4.2, imageUrl: '/images/headphones.jpg' },
  { id: 3, name: 'Earphones', category: 'Accessories', price: 68, rating: 4.0, imageUrl: '/images/earphones.jpg' },
  { id: 4, name: 'Laptop', category: 'Electronics', price: 1200, rating: 4.8, imageUrl: '/images/laptop.jpg' },
  { id: 5, name: 'Keyboard', category: 'Electronics', price: 240, rating: 4.5, imageUrl: '/images/keyboard.jpg' },
  { id: 6, name: 'Headphones', category: 'Electronics', price: 337, rating: 4.2, imageUrl: '/images/headphones.jpg' },
  { id: 7, name: 'Earphones', category: 'Accessories', price: 68, rating: 4.0, imageUrl: '/images/earphones.jpg' },
  { id: 8, name: 'Laptop', category: 'Electronics', price: 1200, rating: 4.8, imageUrl: '/images/laptop.jpg' },
];

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const addToCart = (product) => setCartItems([...cartItems, product]);
  const removeFromCart = (index) => setCartItems(cartItems.filter((_, i) => i !== index));
  const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price, 0);

  // Categories for subnavbar
  const categories = ['Men', 'Women', 'Kids', 'Gifts', 'Kitchen', 'Sports', 'Accessories', 'Electronics'];

  return (
    <div className="bg-[#fff8c0] min-h-screen flex flex-col">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="w-full h-[400px] bg-gradient-to-r from-[#585649] to-[#fede00] flex justify-center items-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">NIKE Blue Shoes</h1>
          <p className="text-xl max-w-2xl mx-auto">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
          <button className="mt-6 bg-white text-[#585649] py-3 px-6 rounded-full font-semibold hover:bg-[#fff8c0] transition duration-300">Buy Now</button>
        </div>
      </div>

      {/* Subnavbar */}
      <div className="w-full bg-white shadow-lg">
        <div className="flex justify-center items-center py-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="mx-4 px-4 py-2 text-lg font-semibold text-gray-700 hover:text-white hover:bg-[#585649] rounded-md transition duration-300"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="flex justify-around mt-10 px-6 space-x-4">
        {[
          { title: 'World Shopping', desc: 'Worldwide delivery', icon: '/icons/world.svg' },
          { title: 'Customer Feedback', desc: '99% satisfaction', icon: '/icons/customer.svg' },
          { title: 'Payment Secured', desc: 'Safe payments', icon: '/icons/payment.svg' },
          { title: '24/7 Support', desc: 'Helpline - 121', icon: '/icons/support.svg' },
        ].map((card, index) => (
          <div key={index} className="flex-1 bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300">
            <img src={card.icon} alt={card.title} className="mx-auto mb-4 h-16" />
            <h3 className="text-lg font-bold text-[#585649]">{card.title}</h3>
            <p className="text-gray-600">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Categories Section */}
      <div className="flex justify-center mt-16 space-x-8">
        <div className="w-1/4 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Categories</h2>
          {merchants.map((merchant) => (
            <div key={merchant.id} className="mb-4">
              <button className="w-full text-left py-3 px-4 font-semibold bg-gray-200 rounded-lg hover:bg-gray-300">
                {merchant.name} <span className="ml-2">+</span>
              </button>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-8 text-[#585649]">New Arrivals</h2>
          <ProductGrid products={products} addToCart={addToCart} setQuickViewProduct={setQuickViewProduct} />
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer cartOpen={cartOpen} setCartOpen={setCartOpen} cartItems={cartItems} removeFromCart={removeFromCart} getTotalPrice={getTotalPrice} />

      {/* Quick View Modal */}
      {quickViewProduct && <QuickViewModal product={quickViewProduct} setQuickViewProduct={setQuickViewProduct} addToCart={addToCart} />}

      {/* Footer */}
      <footer className="bg-[#585649] text-white py-8 text-center mt-20">
        <p>© 2024 My Store - All Rights Reserved</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-[#fede00]">Facebook</a>
          <a href="#" className="hover:text-[#fede00]">Twitter</a>
          <a href="#" className="hover:text-[#fede00]">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default Store;
