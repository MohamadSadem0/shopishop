import React from 'react';
import Logo from "../../assets/images/Logo.png"
import DashboardIcon from "../../assets/icons/darhboard_alt.svg"
import AnalyticIcon from "../../assets/icons/analys icon.svg"
import OrderIcon from "../../assets/icons/Basket_alt_3_duotone.svg"
import ReviewIcon from "../../assets/icons/Review.svg"
import ProductIcon from "../../assets/icons/User_alt.svg"
import SettingIcon from "../../assets/icons/Setting_alt_line.svg"

const Sidebar = () => {
  return (
    <div className="w-auto min-h-screen bg-white px-6  top-0 left-0">
      <div className="p-4">
        <img
          src={Logo}
          alt="logo"
          className="max-w-[225.86px] max-h-[158px]"
        />
      </div>
      <div className="flex flex-col items-center space-y-6 mt-8">

        <button className="w-full bg-yellow-400 p-4 rounded flex flex-row justify-start items-center">
          <img src={DashboardIcon} alt="" className='w-[30px] h-[30px]' />
          <span className="text-lg">Dashboard</span>
        </button>

        <button className="w-full p-4 rounded flex flex-row justify-start items-center">
        <img src={AnalyticIcon} alt="" className='w-[30px] h-[30px]' />
        <span className="text-lg">Analytics</span>
        </button>

        <button className="w-full p-4 rounded flex flex-row justify-start items-center">
        <img src={OrderIcon} alt="" className='w-[30px] h-[30px]' />
        <span className="text-lg">Orders</span>
        </button>

        <button className="w-full p-4 rounded flex flex-row justify-start items-center">
        <img src={ReviewIcon} alt="" className='w-[30px] h-[30px]' />
        <span className="text-lg">Review</span>
        </button>
        <button className="w-full p-4 rounded flex flex-row justify-start items-center">
        <img src={ProductIcon} alt="" className='w-[30px] h-[30px]' />
        <span className="text-lg">Products</span>
        </button>
        <button className="w-full p-4 rounded flex flex-row justify-start items-center">
        <img src={SettingIcon} alt="" className='w-[30px] h-[30px]' />
        <span className="text-lg">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
