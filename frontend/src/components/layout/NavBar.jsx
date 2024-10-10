import React, { useState, useEffect } from 'react';
import Logo from '../../assets/images/Logo.png';
import SearchIcon from '../../assets/icons/Search_alt_light.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
        setIsMobile(true); // Show burger menu for small screens
      } else {
        setIsMobile(false); // Show full nav for larger screens
        setIsMenuOpen(false); // Close mobile menu if resizing to large screen
      }
    };

    // Initialize screen size detection
    handleResize();

    // Monitor screen size changes
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="w-full bg-[#585649] fixed top-0 left-0 z-50 mb-[30px] shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-4">
          <img className="h-12 w-auto" src={Logo} alt="Logo" />
        </Link>

        {/* Full Navigation (Desktop) */}
        {!isMobile && (
          <div className="flex items-center space-x-8 text-white font-['Roboto'] text-lg">
            {['Home', 'Order', 'Store', 'About Us'].map((item, index) => (
              <Link
                key={index}
                to={`/${item.toLowerCase().replace(' ', '')}`}
                className="relative group transition-all"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fede00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </div>
        )}

        {/* Search & Login Section (Desktop) */}
        {!isMobile && (
          <div className="flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative flex items-center space-x-2">
              <button onClick={handleSearchToggle} className="focus:outline-none">
                <img
                  src={SearchIcon}
                  alt="Search"
                  className="h-6 w-6 text-white transition-transform duration-300 transform hover:scale-110"
                />
              </button>
              <div
                className={`relative bg-[#585649] text-white border-b border-[#fede00] p-1 transition-all duration-300 ease-in-out ${
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

            {/* Login Button */}
            <button
              onClick={handleSignUpButton}
              className="text-white text-lg hover:text-[#fede00] transition-colors duration-300"
            >
              Login
            </button>
          </div>
        )}

        {/* Burger Menu (Mobile) */}
        {isMobile && (
          <button
            onClick={handleMenuToggle}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="bg-[#585649] p-4 mt-4 rounded-md shadow-md">
          <div className="flex flex-col space-y-4 text-white text-lg">
            {['Home', 'Order', 'Shop', 'About Us'].map((item, index) => (
              <Link
                key={index}
                to={`/${item.toLowerCase().replace(' ', '')}`}
                onClick={handleMenuToggle}
                className="transition-transform duration-300 hover:text-[#fede00]"
              >
                {item}
              </Link>
            ))}

            {/* Mobile Login Button */}
            <button
              onClick={handleSignUpButton}
              className="text-lg hover:text-[#fede00] transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
