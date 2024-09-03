import React, { useState } from 'react';
import Logo from '../assets/images/Logo.png';
import SearchIcon from '../assets/icons/Search_alt_light.svg';
import MapIcon from '../assets/icons/Map_duotone_line.svg';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate =useNavigate();

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSignUpButton = ()=>{
navigate("/signup");  
  }

  return (
    <nav className="w-[95%] bg-[#585649] h-auto p-2 rounded-2xl shadow-lg fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-5">
      <div className="px-10 flex h-full">
        {/* Logo Section */}
        <div className="flex items-center space-x-4 mr-auto">
          <img
            className="h-24 w-auto"
            src={Logo}
            alt="Logo"
          />
        </div>

        {/* Combined Navigation Section */}
        <div className="flex items-center space-x-10 mr-auto justify-between text-white font-['Roboto'] text-lg">
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
        </div>

        {/* Right Section (Search Icon, Location, Map Icon, and Sign In) */}
        <div className="relative flex items-center space-x-2">
          {/* Search Icon and Input */}
          <button onClick={handleSearchToggle} className="focus:outline-none">
            <div className="pr-10">
              <img
                src={SearchIcon}
                alt="Search"
                className="h-6 w-6 text-white transition-transform duration-300 transform hover:scale-110"
              />
            </div>
          </button>
          <div
            className={`relative bg-[#585649] text-white border-b border-[#fede00] focus:outline-none p-1 transition-width duration-300 ease-in-out ${
              isSearchOpen ? 'w-48 opacity-100' : 'w-0 opacity-0'
            }`}
          >
            {isSearchOpen && (
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full bg-transparent text-white border-none focus:outline-none"
              />
            )}
          </div>

          {/* Location, Map Icon, and Sign In */}
          <div className="flex-row flex items-center space-x-36 mr-0">
            {/* Location */}
            <div className="flex items-center space-x-2 text-white">
              <span className="text-[#ff0008] text-lg">Location</span>
              {/* Map Icon */}
              <div>
                <img src={MapIcon} alt="Map" className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Sign In */}
            <button onClick={handleSignUpButton} className="text-white text-lg hover:text-[#fede00] transition-colors duration-300">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
