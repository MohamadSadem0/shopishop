import React, { useState } from 'react';
import Navbar from '../components/layout/NavBar';
import HeroSection from './store/HeroSection';
import SubNavbar from '../components/layout/Subnavbar';
import InfoCards from '../components/cards/InfoCards';
import CategoriesSidebar from '../components/layout/CategoriesSidebar';
import ProductGrid from './store/ProductGrid';
import CartDrawer from './store/CartDrawer';
import QuickViewModal from '../components/common/QuickViewModal';
import Footer from '../components/layout/Footer';
import dummyImg from "../assets/dummy/traditional-food-around-the-world-Travlinmad.jpg";

const merchants = [
  { id: 1, name: 'Fashion', categories: ['Men', 'Women', 'Accessories'] },
  { id: 2, name: 'Shoes', categories: ['Sneakers', 'Formal', 'Sandals'] },
];

const products = [
  { id: 1, name: 'Keyboard', category: 'Electronics', price: 240, rating: 4.5, imageUrl: dummyImg },
  { id: 2, name: 'Headphones', category: 'Electronics', price: 337, rating: 4.2, imageUrl: dummyImg  },
  { id: 3, name: 'Earphones', category: 'Accessories', price: 68, rating: 4.0, imageUrl: dummyImg  },
  { id: 4, name: 'Laptop', category: 'Electronics', price: 1200, rating: 4.8, imageUrl: dummyImg  },
  { id: 5, name: 'Keyboard', category: 'Electronics', price: 240, rating: 4.5, imageUrl: dummyImg  },
  { id: 6, name: 'Headphones', category: 'Electronics', price: 337, rating: 4.2, imageUrl: dummyImg  },
  { id: 7, name: 'Earphones', category: 'Accessories', price: 68, rating: 4.0, imageUrl: dummyImg  },
  { id: 8, name: 'Laptop', category: 'Electronics', price: 1200, rating: 4.8, imageUrl: dummyImg  },
  {
    id: 1,
    name: 'Keyboard',
    category: 'Electronics',
    price: 240,
    imageUrl: dummyImg,
    location: 'New York, USA',
    storeName: 'Tech Store',
    available: true,
    discount: 10,
  },
  {
    id: 2,
    name: 'Headphones',
    category: 'Electronics',
    price: 337,
    imageUrl: dummyImg,
    location: 'San Francisco, USA',
    storeName: 'Audio Hub',
    available: false, // Unavailable
  },
];

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const addToCart = (product) => setCartItems([...cartItems, product]);
  const removeFromCart = (index) => setCartItems(cartItems.filter((_, i) => i !== index));
  const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price, 0);

  const categories = ['Men', 'Women', 'Kids', 'Gifts', 'Kitchen', 'Sports', 'Accessories', 'Electronics'];

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="bg-bg min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Subnavbar */}
      <SubNavbar categories={categories} setSelectedCategory={setSelectedCategory} />

      {/* Info Cards */} 
      <InfoCards />

      {/* Main Content */}
      <div className="flex justify-center mt-16 space-x-8">
        {/* Categories Sidebar */}
        <CategoriesSidebar merchants={merchants} setSelectedCategory={setSelectedCategory} />

        {/* Products Grid */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-8 text-color1">{selectedCategory ? `${selectedCategory} Products` : 'New Arrivals'}</h2>
          <ProductGrid products={filteredProducts} addToCart={addToCart} setQuickViewProduct={setQuickViewProduct} />
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          setQuickViewProduct={setQuickViewProduct}
          addToCart={addToCart}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Store;
