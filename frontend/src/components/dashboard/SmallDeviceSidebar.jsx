import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  faUsers, faStore, faThLarge, faBoxes, faSignOutAlt, faCog, faBars,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DashboardIcon from '../../assets/icons/darhboard_alt.svg';
import ProductIcon from '../../assets/icons/User_alt.svg';
import AddProductIcon from '../../assets/icons/add_product.svg';
import SeeAllProductsIcon from '../../assets/icons/see_all_products.svg';
import ReviewIcon from '../../assets/icons/Review.svg';

import styles from '../../styles/SmallSidebar.module.css'; // New CSS file for small screens
import { getDecryptedItem } from '../../utils/decryptToken';

const SmallDeviceSidebar = ({ setActiveTab, activeTab, role }) => {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({ email: '', name: '' });
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleButtonClick = (buttonName, hasSubMenu = false) => {
    if (!hasSubMenu) setIsProductOpen(false);
    setActiveTab(buttonName);
    toggleSidebar(); // Close sidebar when an item is selected
  };

  useEffect(() => {
    const decryptedUserName = getDecryptedItem('userName');
    if (decryptedUserName) setUserData({ name: decryptedUserName });
  }, []);

  return (
    <>
      {/* Burger icon for toggling the sidebar */}
      <FontAwesomeIcon icon={faBars} className={styles.burger} onClick={toggleSidebar} />

      {/* Sidebar container */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        {/* Profile Section */}
        <div className={styles.profile}>
          <img src="https://via.placeholder.com/50" alt="Profile" className={styles.profileImage} />
          <div className={styles.profileInfo}>
            <span className={styles.profileName}>{userData.name}</span>
            <span className={styles.followers}>5.2M Followers</span>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className={styles.menu}>
          <div
            className={`${styles.menuItem} ${activeTab === 'dashboard' ? styles.active : ''}`}
            onClick={() => handleButtonClick('dashboard')}>
            <img src={DashboardIcon} alt="Dashboard" />
            Dashboard
          </div>

          {role === 'merchant' && (
            <>
              <div
                className={`${styles.menuItem} ${activeTab === 'products' ? styles.active : ''}`}
                onClick={() => handleButtonClick('products', true)}>
                <img src={ProductIcon} alt="Products" />
                Products
              </div>
              {isProductOpen && (
                <div className={styles.subMenu}>
                  <div
                    className={`${styles.subButton} ${activeTab === 'addProduct' ? styles.active : ''}`}
                    onClick={() => handleButtonClick('addProduct')}>
                    <img src={AddProductIcon} alt="Add Product" />
                    Add Product
                  </div>
                  <div
                    className={`${styles.subButton} ${activeTab === 'seeAllProducts' ? styles.active : ''}`}
                    onClick={() => handleButtonClick('seeAllProducts')}>
                    <img src={SeeAllProductsIcon} alt="See All Products" />
                    See All Products
                  </div>
                </div>
              )}
              <div
                className={`${styles.menuItem} ${activeTab === 'reviews' ? styles.active : ''}`}
                onClick={() => handleButtonClick('reviews')}>
                <img src={ReviewIcon} alt="Reviews" />
                Reviews
              </div>
            </>
          )}

          {/* Superadmin buttons */}
          {role === 'superadmin' && (
            <>
              <div
                className={`${styles.menuItem} ${activeTab === 'seeAllUsers' ? styles.active : ''}`}
                onClick={() => handleButtonClick('seeAllUsers')}>
                <FontAwesomeIcon icon={faUsers} />
                See All Users
              </div>
              <div
                className={`${styles.menuItem} ${activeTab === 'seeAllStores' ? styles.active : ''}`}
                onClick={() => handleButtonClick('seeAllStores')}>
                <FontAwesomeIcon icon={faStore} />
                See All Stores
              </div>
              <div
                className={`${styles.menuItem} ${activeTab === 'categories' ? styles.active : ''}`}
                onClick={() => handleButtonClick('categories')}>
                <FontAwesomeIcon icon={faBoxes} />
                Categories
              </div>
              <div
                className={`${styles.menuItem} ${activeTab === 'sections' ? styles.active : ''}`}
                onClick={() => handleButtonClick('sections')}>
                <FontAwesomeIcon icon={faThLarge} />
                Sections
              </div>
            </>
          )}

          {/* Settings and Exit */}
          <div
            className={`${styles.menuItem} ${activeTab === 'settings' ? styles.active : ''}`}
            onClick={() => handleButtonClick('settings')}>
            <FontAwesomeIcon icon={faCog} />
            Settings
          </div>
          <div className={styles.exitButton} onClick={() => navigate('/home')}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Exit
          </div>
        </div>
      </div>

      {/* Overlay to close the sidebar when clicking outside */}
      {isSidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </>
  );
};

export default SmallDeviceSidebar;
