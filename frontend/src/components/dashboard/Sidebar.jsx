// Sidebar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faStore, faThLarge, faBoxes, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';

// Merchant Custom Icons
import Logo from "../../assets/images/Logo.png";
import DashboardIcon from "../../assets/icons/darhboard_alt.svg";
import AnalyticIcon from "../../assets/icons/analys icon.svg";
import OrderIcon from "../../assets/icons/Basket_alt_3_duotone.svg";
import ReviewIcon from "../../assets/icons/Review.svg";
import ProductIcon from "../../assets/icons/User_alt.svg";
import AddProductIcon from "../../assets/icons/add_product.svg";
import SeeAllProductsIcon from "../../assets/icons/see_all_products.svg";

const Sidebar = ({ setActiveTab, role }) => {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [activeButton, setActiveButton] = useState('');
  const [activeSubOption, setActiveSubOption] = useState('');
  const navigate = useNavigate();

  // Handle main menu button click
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setActiveTab(buttonName);
  };

  // Toggle Product submenu for merchant
  const toggleProductMenu = () => {
    setIsProductOpen(!isProductOpen);
    setActiveButton('products');
  };

  // Handle submenu options click for Products
  const handleProductOptionClick = (optionName) => {
    setActiveSubOption(optionName);
    setActiveTab(optionName);
  };

  return (
    <div className="w-64 fixed top-0 left-0 h-screen bg-white shadow-md px-6">
      <div className="p-4">
        <img src={Logo} alt="logo" className="max-w-[225.86px] max-h-[158px]" />
      </div>
      <div className="flex flex-col items-start space-y-6 mt-8">
        {/* Dashboard Button */}
        <button
          onClick={() => handleButtonClick('dashboard')}
          className={`w-full p-4 rounded flex flex-row justify-start items-center ${activeButton === 'dashboard' ? 'bg-yellow-400' : ''
            }`}
        >
          <img src={DashboardIcon} alt="Dashboard Icon" className="w-[30px] h-[30px]" />
          <span className="text-lg ml-2">Dashboard</span>
        </button>

        {/* Merchant-Only Options */}
        {role === 'merchant' && (
          <>
            {/* Analytics Button */}
            <button
              onClick={() => handleButtonClick('analytics')}
              className={`w-full p-4 rounded flex flex-row justify-start items-center ${activeButton === 'analytics' ? 'bg-yellow-400' : ''
                }`}
            >
              <img src={AnalyticIcon} alt="Analytics Icon" className="w-[30px] h-[30px]" />
              <span className="text-lg ml-2">Analytics</span>
            </button>

            {/* Orders Button */}
            <button
              onClick={() => handleButtonClick('orders')}
              className={`w-full p-4 rounded flex flex-row justify-start items-center ${activeButton === 'orders' ? 'bg-yellow-400' : ''
                }`}
            >
              <img src={OrderIcon} alt="Orders Icon" className="w-[30px] h-[30px]" />
              <span className="text-lg ml-2">Orders</span>
            </button>

            {/* Products Button with Submenu */}
            <div className="w-full">
              <button
                onClick={toggleProductMenu}
                className={`w-full p-4 rounded flex flex-row justify-start items-center ${activeButton === 'products' && !isProductOpen ? 'bg-yellow-400' : ''
                  }`}
              >
                <img src={ProductIcon} alt="Products Icon" className="w-[30px] h-[30px]" />
                <span className="text-lg ml-2">Products</span>
              </button>

              {/* Products Submenu */}
              {isProductOpen && (
                <div className="flex flex-col pl-8 space-y-2 mt-2">
                  <button
                    onClick={() => handleProductOptionClick('addProduct')}
                    className={`w-full p-4 rounded flex flex-row justify-start items-center ${activeSubOption === 'addProduct' ? 'bg-yellow-400' : ''
                      }`}
                  >
                    <img src={AddProductIcon} alt="Add Product Icon" className="w-[20px] h-[20px]" />
                    <span className="text-md ml-2">Add Product</span>
                  </button>

                  <button
                    onClick={() => handleProductOptionClick('seeAllProducts')}
                    className={`w-full p-4 rounded flex flex-row justify-start items-center ${activeSubOption === 'seeAllProducts' ? 'bg-yellow-400' : ''
                      }`}
                  >
                    <img src={SeeAllProductsIcon} alt="See All Products Icon" className="w-[20px] h-[20px]" />
                    <span className="text-md ml-2">See All Products</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Superadmin-Only Options */}
        {role === 'superadmin' && (
          <>
            <button
              onClick={() => handleButtonClick('seeAllUsers')}
              className={`w-full p-4 rounded flex flex-row justify-start items-center ${activeButton === 'seeAllUsers' ? 'bg-yellow-400' : ''
                }`}
            >
              <FontAwesomeIcon icon={faUsers} className="w-[30px] h-[30px]" />
              <span className="text-lg ml-2">See All Users</span>
            </button>

            <button
              onClick={() => handleButtonClick('seeAllStores')}
              className={`w-full p-4 rounded flex flex-row justify-start items-center ${activeButton === 'seeAllStores' ? 'bg-yellow-400' : ''
                }`}
            >
              <FontAwesomeIcon icon={faStore} className="w-[30px] h-[30px]" />
              <span className="text-lg ml-2">See All Stores</span>
            </button>

            <button
              onClick={() => handleButtonClick('categories')}
              className={`w-full p-4 rounded flex flex-row justify-start items-center ${activeButton === 'categories' ? 'bg-yellow-400' : ''
                }`}
            >
              <FontAwesomeIcon icon={faBoxes} className="w-[30px] h-[30px]" />
              <span className="text-lg ml-2">Categories</span>
            </button>

            <button
              onClick={() => handleButtonClick('sections')}
              className={`w-full p-4 rounded flex flex-row justify-start items-center ${activeButton === 'sections' ? 'bg-yellow-400' : ''
                }`}
            >
              <FontAwesomeIcon icon={faThLarge} className="w-[30px] h-[30px]" />
              <span className="text-lg ml-2">Sections</span>
            </button>
          </>
        )}

        {/* Settings Button */}
        <button
          onClick={() => handleButtonClick('settings')}
          className={`w-full p-4 rounded flex flex-row justify-start items-center ${activeButton === 'settings' ? 'bg-yellow-400' : ''
            }`}
        >
          <FontAwesomeIcon icon={faCog} className="w-[30px] h-[30px]" />
          <span className="text-lg ml-2">Settings</span>
        </button>

        {/* Exit Button */}
        <button
          onClick={() => navigate('/')}
          className="w-full p-4 mt-6 bg-red-400 text-white rounded flex flex-row justify-start items-center"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="w-[30px] h-[30px]" />
          <span className="text-lg ml-2">Exit</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
