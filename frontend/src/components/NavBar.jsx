


import React, { useState } from 'react';
import Logo from '../assets/images/Logo.png';
import SearchIcon from '../assets/icons/Search_alt_light.svg';
import MapIcon from '../assets/icons/Map_duotone_line.svg';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav className="w-[95%] bg-[#585649] h-[80px] p-2 rounded-2xl shadow-lg fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-5">
      <div className="container mx-auto flex justify-between items-center h-full">
        {/* Logo Section */}
        <img
          className="h-12 w-auto"
          src={Logo}
          alt="Logo"
        />

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-white font-['Roboto'] text-lg items-center">
          <a href="#" className="relative group">
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a href="#" className="relative group">
            Order
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a href="#" className="relative group">
            Shop
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a href="#" className="relative group">
            About Us
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>

          {/* Search Icon and Input */}
          <div className="relative">
            <button onClick={handleSearchToggle} className="focus:outline-none">
              <img src={SearchIcon} alt="Search" className="h-6 w-6 text-white" />
            </button>
            {isSearchOpen && (
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="absolute left-8 top-0 bg-[#585649] text-white border-b border-[#fede00] focus:outline-none p-1"
              />
            )}
          </div>
        </div>

        {/* Right Section (Location, Map Icon, and Sign In) */}
        <div className="flex items-center space-x-6">
          {/* Location */}
          <div className="flex items-center space-x-2 text-white">
            {/* <div className="w-4 h-4 border-2 border-white rounded-full relative flex justify-center items-center">
              <div className="w-2 h-2 border-2 border-white rounded-full"></div>
            </div> */}
            <span className="text-[#ff0008] text-lg">Location</span>
          </div>

          {/* Map Icon */}
          <div>
            <img src={MapIcon} alt="Map" className="h-6 w-6 text-white" />
          </div>

          {/* Sign In */}
          <a href="#" className="text-white text-lg hover:text-[#fede00] transition-colors duration-300">
            Sign In
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
