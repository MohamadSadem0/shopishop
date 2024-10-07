import React, { useState, useEffect } from 'react';
import Logo from '../../assets/images/Logo.png';
import SearchIcon from '../../assets/icons/Search_alt_light.svg';
import MapIcon from '../../assets/icons/Map_duotone_line.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // To detect screen size
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSignUpButton = () => {
    navigate('/login');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Detect screen size and adjust state accordingly
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true); // If screen width is <= 768px, show burger menu
      } else {
        setIsMobile(false); // Show full nav for larger screens
        setIsMenuOpen(false); // Close the menu if resizing to large screen
      }
    };

    // Initialize the screen size detection
    handleResize();

    // Add an event listener to monitor screen size changes
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="w-full bg-[#585649] p-4 shadow-lg fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img className="h-12 w-auto" src={Logo} alt="Logo" />
        </div>

        {/* Render full navigation if it's not mobile */}
        {!isMobile && (
          <div className="flex items-center space-x-10 text-white font-['Roboto'] text-lg">
            <Link to="/" className="relative group">
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link to="/order" className="relative group">
              Order
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link to="/shop" className="relative group">
              Shop
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link to="/about" className="relative group">
              About Us
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          </div>
        )}

        {/* Right Section with Search, Location, and Sign-In (Hidden on small screens) */}
        {!isMobile && (
          <div className="flex items-center space-x-10">
            {/* Search Icon and Input */}
            <div className="relative flex items-center space-x-2">
              <button onClick={handleSearchToggle} className="focus:outline-none">
                <img
                  src={SearchIcon}
                  alt="Search"
                  className="h-6 w-6 text-white transition-transform duration-300 transform hover:scale-110"
                />
              </button>
              <div
                className={`relative bg-[#585649] text-white border-b border-[#fede00] focus:outline-none p-1 transition-all duration-300 ease-in-out ${
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
            </div>

            {/* Location and Sign In */}
            <div className="flex items-center space-x-10">
              {/* <div className="flex items-center space-x-6 text-white">
                <span className="text-[#ff0008] text-lg">Location</span>
                <img src={MapIcon} alt="Map" className="h-6 w-6 text-white" />
              </div> */}
              <button
                onClick={handleSignUpButton}
                className="text-white text-lg hover:text-[#fede00] transition-colors duration-300"
              >
                Login
              </button>
            </div>
          </div>
        )}

        {/* Burger Menu Icon (Visible only on small screens) */}
        {isMobile && (
          <button
            onClick={handleMenuToggle}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Navigation Menu (Visible only on small screens) */}
      {isMobile && isMenuOpen && (
        <div className="mt-4 bg-[#585649] rounded-md p-4">
          <div className="flex flex-col items-center space-y-4 text-white">
            <Link to="/" onClick={handleMenuToggle} className="text-lg">
              Home
            </Link>
            <Link to="/order" onClick={handleMenuToggle} className="text-lg">
              Order
            </Link>
            <Link to="/shop" onClick={handleMenuToggle} className="text-lg">
              Shop
            </Link>
            <Link to="/about" onClick={handleMenuToggle} className="text-lg">
              About Us
            </Link>
            {/* Location and Sign In for Mobile */}
            <div className="flex flex-col items-center mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-[#ff0008] text-lg">Location</span>
                <img src={MapIcon} alt="Map" className="h-6 w-6" />
              </div>
              <button
                onClick={handleSignUpButton}
                className="text-white text-lg hover:text-[#fede00] transition-colors duration-300"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
