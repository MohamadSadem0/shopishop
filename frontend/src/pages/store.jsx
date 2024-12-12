import React, { useEffect, useState } from 'react';
import InfoCards from '../components/cards/InfoCards';
import QuickViewModal from '../components/common/QuickViewModal';
import CategoriesSidebar from '../components/layout/CategoriesSidebar';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/NavBar';
import SubNavbar from '../components/layout/Subnavbar';
import CartDrawer from './store/CartDrawer';
import HeroSection from './store/HeroSection';
import ProductGrid from './store/ProductGrid';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSections } from '../redux/slices/sectionSlice';
import { fetchAllStores } from '../redux/slices/storeSlice';
import StoreGrid from './store/StoreGrid';

const Store = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [stores, setStores] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const dispatch = useDispatch();
  // const {
  //   data: sections,
  //   sectionStatus,
  //   sectionError,
  // } = useSelector((state) => state.sections);

  const sections = useSelector((state) => state.sections.sections || []);
  const sectionStatus = useSelector((state) => state.sections.status);
  const sectionError = useSelector((state) => state.sections.error);

  setStores(useSelector((state) => state.stores.data));
  const storeStatus = useSelector((state) => state.stores.error);
  const storeError = useSelector((state) => state.stores.status);

  useEffect(() => {
    if (sectionStatus === 'idle') {
      dispatch(fetchAllSections());
    }
    // console.log(sections);
  }, [dispatch, sectionStatus]);

  useEffect(() => {
    if (storeStatus === 'idle') {
      dispatch(fetchAllStores());
    }
    // console.log(stores);
  }, [dispatch, storeStatus]);

  const addToCart = (product) => setCartItems([...cartItems, product]);
  const removeFromCart = (index) =>
    setCartItems(cartItems.filter((_, i) => i !== index));
  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price, 0);

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
          setStores={setStores} // Pass setProducts to update the product grid
          setSelectedSection={setSelectedSection} // Pass setSelectedSection to track the selected section
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-8 text-color1">
            {selectedCategory ? `${selectedCategory} stores` : 'All Products'}
          </h2>
          <StoreGrid stores={stores} onSelectStore={setStores} />
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
