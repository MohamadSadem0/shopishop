import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/NavBar';
import HeroSection from './store/HeroSection';
import SubNavbar from '../components/layout/Subnavbar';
import InfoCards from '../components/cards/InfoCards';
import CategoriesSidebar from '../components/layout/CategoriesSidebar';
import ProductGrid from './store/ProductGrid';
import CartDrawer from './store/CartDrawer';
import QuickViewModal from '../components/common/QuickViewModal';
import Footer from '../components/layout/Footer';
import { fetchSectionsWithCategories } from '../services/sectionService';
import { fetchProductsBySection } from '../services/productService';

const Store = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Fetch sections with categories on component mount
  useEffect(() => {
    const loadSections = async () => {
      try {
        const fetchedSections = await fetchSectionsWithCategories();
        setSections(fetchedSections);
      } catch (error) {
        console.error('Error fetching sections with categories:', error);
      }
    };

    loadSections();
  }, []);

  const addToCart = (product) => setCartItems([...cartItems, product]);
  const removeFromCart = (index) => setCartItems(cartItems.filter((_, i) => i !== index));
  const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="bg-bg min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <SubNavbar sections={sections} setSelectedSection={setSelectedSection} />
      <InfoCards />

      <div className="flex justify-center mt-16 space-x-8">
        <CategoriesSidebar
          sections={sections}
          setSelectedCategory={setSelectedCategory}
          setProducts={setProducts} // Pass setProducts to update the product grid
          setSelectedSection={setSelectedSection} // Pass setSelectedSection to track the selected section
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-8 text-color1">
            {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
          </h2>
          <ProductGrid products={products} addToCart={addToCart} setQuickViewProduct={setQuickViewProduct} />
        </div>
      </div>

      <CartDrawer
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
      />

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          setQuickViewProduct={setQuickViewProduct}
          addToCart={addToCart}
        />
      )}

      <Footer />
    </div>
  );
};

export default Store;
