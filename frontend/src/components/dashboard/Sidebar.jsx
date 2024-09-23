import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import Logo from "../../assets/images/Logo.png";
import DashboardIcon from "../../assets/icons/darhboard_alt.svg";
import AnalyticIcon from "../../assets/icons/analys icon.svg";
import OrderIcon from "../../assets/icons/Basket_alt_3_duotone.svg";
import ReviewIcon from "../../assets/icons/Review.svg";
import ProductIcon from "../../assets/icons/User_alt.svg";
import SettingIcon from "../../assets/icons/Setting_alt_line.svg";
import AddProductIcon from "../../assets/icons/add_product.svg"; // Add appropriate icons
import SeeAllProductsIcon from "../../assets/icons/see_all_products.svg"; // Add appropriate icons
import ExitIcon from "../../assets/icons/exit_icon.svg"; // Add an icon for Exit

const Sidebar = () => {
  const [isProductOpen, setIsProductOpen] = useState(false); // To toggle product options
  const [activeButton, setActiveButton] = useState(''); // To track the active button
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle button click
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Set the clicked button as active
    if (buttonName === 'dashboard') {
      navigate('/dashboard');
    } else if (buttonName === 'analytics') {
      navigate('/analytics');
    } else if (buttonName === 'orders') {
      navigate('/orders');
    } else if (buttonName === 'review') {
      navigate('/review');
    } else if (buttonName === 'settings') {
      navigate('/settings');
    }
  };

  // Toggle Product Menu
  const toggleProductMenu = () => {
    setIsProductOpen(!isProductOpen);
    setActiveButton('products'); // When "Products" is clicked, highlight it
  };

  // Handle submenu option click (Add Product or See All Products)
  const handleProductOptionClick = (optionName) => {
    setActiveButton(optionName); // Highlight the submenu option
  };

  // Handle Exit button click
  const handleExit = () => {
    navigate('/'); // Redirect to the landing page
  };

  return (
    <div className="w-auto min-h-screen bg-white px-6 top-0 left-0">
      <div className="p-4">
        <img
          src={Logo}
          alt="logo"
          className="max-w-[225.86px] max-h-[158px]"
        />
      </div>
      <div className="flex flex-col items-center space-y-6 mt-8">

        {/* Dashboard Button */}
        <button
          onClick={() => handleButtonClick('dashboard')}
          className={`w-full p-4 rounded flex flex-row justify-start items-center ${
            activeButton === 'dashboard' ? 'bg-yellow-400' : ''
          }`}
        >
          <img src={DashboardIcon} alt="" className='w-[30px] h-[30px]' />
          <span className="text-lg">Dashboard</span>
        </button>

        {/* Analytics Button */}
        <button
          onClick={() => handleButtonClick('analytics')}
          className={`w-full p-4 rounded flex flex-row justify-start items-center ${
            activeButton === 'analytics' ? 'bg-yellow-400' : ''
          }`}
        >
          <img src={AnalyticIcon} alt="" className='w-[30px] h-[30px]' />
          <span className="text-lg">Analytics</span>
        </button>

        {/* Orders Button */}
        <button
          onClick={() => handleButtonClick('orders')}
          className={`w-full p-4 rounded flex flex-row justify-start items-center ${
            activeButton === 'orders' ? 'bg-yellow-400' : ''
          }`}
        >
          <img src={OrderIcon} alt="" className='w-[30px] h-[30px]' />
          <span className="text-lg">Orders</span>
        </button>

        {/* Review Button */}
        <button
          onClick={() => handleButtonClick('review')}
          className={`w-full p-4 rounded flex flex-row justify-start items-center ${
            activeButton === 'review' ? 'bg-yellow-400' : ''
          }`}
        >
          <img src={ReviewIcon} alt="" className='w-[30px] h-[30px]' />
          <span className="text-lg">Review</span>
        </button>

        {/* Products Button */}
        <div className="w-full">
          <button
            onClick={toggleProductMenu}
            className={`w-full p-4 rounded flex flex-row justify-start items-center ${
              activeButton === 'products' && !isProductOpen ? 'bg-yellow-400' : ''
            }`}
          >
            <img src={ProductIcon} alt="" className='w-[30px] h-[30px]' />
            <span className="text-lg">Products</span>
          </button>

          {/* Products Submenu */}
          {isProductOpen && (
            <div className="flex flex-col pl-8 space-y-2 mt-2">
              <button
                onClick={() => handleProductOptionClick('addProduct')}
                className={`w-full p-4 rounded flex flex-row justify-start items-center ${
                  activeButton === 'addProduct' ? 'bg-yellow-400' : ''
                }`}
              >
                <img src={AddProductIcon} alt="" className='w-[20px] h-[20px]' />
                <span className="text-md ml-2">Add Product</span>
              </button>
              <button
                onClick={() => handleProductOptionClick('seeAllProducts')}
                className={`w-full p-4 rounded flex flex-row justify-start items-center ${
                  activeButton === 'seeAllProducts' ? 'bg-yellow-400' : ''
                }`}
              >
                <img src={SeeAllProductsIcon} alt="" className='w-[20px] h-[20px]' />
                <span className="text-md ml-2">See All Products</span>
              </button>
            </div>
          )}
        </div>

        {/* Settings Button */}
        <button
          onClick={() => handleButtonClick('settings')}
          className={`w-full p-4 rounded flex flex-row justify-start items-center ${
            activeButton === 'settings' ? 'bg-yellow-400' : ''
          }`}
        >
          <img src={SettingIcon} alt="" className='w-[30px] h-[30px]' />
          <span className="text-lg">Settings</span>
        </button>

        {/* Exit Button */}
        <button
          onClick={handleExit}
          className="w-full p-4 mt-6 bg-red-400 text-white rounded flex flex-row justify-start items-center"
        >
          <img src={ExitIcon} alt="Exit Icon" className="w-[30px] h-[30px]" />
          <span className="text-lg ml-2">Exit</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
