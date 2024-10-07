import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FiSun, FiBell } from 'react-icons/fi'; // Light mode and notification icons
import {
  faUsers, faStore, faThLarge, faBoxes, faSignOutAlt, faCog, faBars,
} from '@fortawesome/free-solid-svg-icons';

import Logo from "../../assets/images/Logo.png";
import DashboardIcon from "../../assets/icons/darhboard_alt.svg";
import AnalyticIcon from "../../assets/icons/analys icon.svg";
import OrderIcon from "../../assets/icons/Basket_alt_3_duotone.svg";
import ProductIcon from "../../assets/icons/User_alt.svg";
import AddProductIcon from "../../assets/icons/add_product.svg";
import SeeAllProductsIcon from "../../assets/icons/see_all_products.svg";
import ReviewIcon from "../../assets/icons/Review.svg";

import styles from '../../styles/Sidebar.module.css'; // Ensure this path is correct
import { useResponsiveDesign } from '../../hooks/useResponsiveDesign'; // Hook for screen size
import {getDecryptedItem} from '../../utils/decryptToken'; // Import the utility function

const Sidebar = ({ setActiveTab, activeTab, role, mobileView }) => { 
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state for small screens
  const [userData, setUserData] = useState({ email: "", name: "" });
  const navigate = useNavigate();
  const { isMobile } = useResponsiveDesign(); // Use responsive design

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleButtonClick = (buttonName, hasSubMenu = false) => {
    if (!hasSubMenu) {
      setIsProductOpen(false);
    }
    setActiveTab(buttonName);
    if (mobileView) {
      toggleSidebar(); // Close sidebar after selecting an item in mobile view
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Add decrypted user data for mobile profile display
  useEffect(() => {
    const decryptedUserName = getDecryptedItem('userName'); // Use the utility function to decrypt
    if (decryptedUserName) {
      setUserData({ name: decryptedUserName });
    }
  }, []);

  return (
    <>
      {/* Burger icon for mobile screens */}
      <FontAwesomeIcon icon={faBars} className={styles.burger} onClick={toggleSidebar} />

      {/* Sidebar container with conditional class for small screen */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''} z-10 h-dvh`}>
        <div className="p-4">
          <img src={Logo} alt="logo" className="max-w-full h-auto" />
        </div>
        <div className="flex flex-col space-y-4 mt-4">

          {/* Conditionally add navbar elements to sidebar on mobile view */}
          {isMobile && (
            <div className="mobile-navbar-items space-y-6 p-4 border-t border-gray-300">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-4 py-2 rounded-lg border border-gray-400 w-full"
                />
              </div>

              {/* Light Mode and Notification Icons */}
              <div className="flex items-center justify-between space-x-6">
                <FiSun className="w-6 h-6 cursor-pointer" />
                <FiBell className="w-6 h-6 cursor-pointer" />
              </div>

              {/* Profile Picture and Username */}
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium">{userData.name}</span>
              </div>
            </div>
          )}

          <button
            onClick={() => handleButtonClick('dashboard')}
            className={`${styles.button} ${styles.dashboard} ${activeTab === 'dashboard' ? styles.active : ''}`}>
            <img src={DashboardIcon} alt="Dashboard" />
            Dashboard
          </button>

          {role === 'merchant' && (
            <>
              <button
                onClick={() => handleButtonClick('analytics')}
                className={`${styles.button} ${styles.analytics} ${activeTab === 'analytics' ? styles.active : ''}`}>
                <img src={AnalyticIcon} alt="Analytics" />
                Analytics
              </button>
              <button
                onClick={() => handleButtonClick('orders')}
                className={`${styles.button} ${styles.orders} ${activeTab === 'orders' ? styles.active : ''}`}>
                <img src={OrderIcon} alt="Orders" />
                Orders
              </button>
              <div>
                <button
                  onClick={() => setIsProductOpen(!isProductOpen)}
                  className={`${styles.button} ${styles.products} ${activeTab === 'products' ? styles.active : ''}`}>
                  <img src={ProductIcon} alt="Products" />
                  Products
                </button>
                {isProductOpen && (
                  <div className="pl-4">
                    <button
                      onClick={() => handleButtonClick('addProduct')}
                      className={`${styles.subButton} ${activeTab === 'addProduct' ? styles.active : ''}`}>
                      <img src={AddProductIcon} alt="Add Product" />
                      Add Product
                    </button>
                    <button
                      onClick={() => handleButtonClick('seeAllProducts')}
                      className={`${styles.subButton} ${activeTab === 'seeAllProducts' ? styles.active : ''}`}>
                      <img src={SeeAllProductsIcon} alt="See All Products" />
                      See All Products
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleButtonClick('reviews')}
                className={`${styles.button} ${styles.reviews} ${activeTab === 'reviews' ? styles.active : ''}`}>
                <img src={ReviewIcon} alt="Reviews" />
                Reviews
              </button>
            </>
          )}

          {role === 'superadmin' && (
            <>
              <button
                onClick={() => handleButtonClick('seeAllUsers')}
                className={`${styles.button} ${activeTab === 'seeAllUsers' ? styles.active : ''}`}>
                <FontAwesomeIcon icon={faUsers} />
                See All Users
              </button>
              <button
                onClick={() => handleButtonClick('seeAllStores')}
                className={`${styles.button} ${activeTab === 'seeAllStores' ? styles.active : ''}`}>
                <FontAwesomeIcon icon={faStore} />
                See All Stores
              </button>
              <button
                onClick={() => handleButtonClick('categories')}
                className={`${styles.button} ${activeTab === 'categories' ? styles.active : ''}`}>
                <FontAwesomeIcon icon={faBoxes} />
                Categories
              </button>
              <button
                onClick={() => handleButtonClick('sections')}
                className={`${styles.button} ${activeTab === 'sections' ? styles.active : ''}`}>
                <FontAwesomeIcon icon={faThLarge} />
                Sections
              </button>
            </>
          )}

          <button
            onClick={() => handleButtonClick('settings')}
            className={`${styles.button} ${activeTab === 'settings' ? styles.active : ''}`}>
            <FontAwesomeIcon icon={faCog} />
            Settings
          </button>
          <button onClick={() => navigate('/')} className={styles.exitButton}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Exit
          </button>
        </div>
      </div>

      {/* Overlay for mobile view (optional, to close sidebar when clicking outside) */}
      {isSidebarOpen && mobileView && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;
