import React, { useState, useEffect, useRef } from 'react';
import Logo from '../../assets/images/Logo.png';
import SearchIcon from '../../assets/icons/Search_alt_light.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart, FaTrashAlt } from 'react-icons/fa'; // Import cart icon

const Navbar = ({ cartItems = [], removeFromCart }) => { // cartItems and removeFromCart passed as props
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false); // Manage cart dropdown visibility
  const cartDropdownRef = useRef(); // To detect clicks outside the dropdown
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

  const handleCartToggle = () => {
    setIsCartDropdownOpen(!isCartDropdownOpen);
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

  // Close cart dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setIsCartDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full bg-color1 sticky top-0 left-0 shadow-lg px-[-20px] z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto ">
        {/* Logo Section */}
        <Link to="/home" className="flex items-center ">
          <img className="h-28 w-32" src={Logo} alt="Logo" />
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
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-color2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </div>
        )}

        {/* Search, Cart, and Login Section (Desktop) */}
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
                className={`relative bg-color1 text-white border-b border-color2 p-1 transition-all duration-300 ease-in-out ${
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

            {/* Cart Icon and Dropdown */}
            <div className="relative" ref={cartDropdownRef}>
              <button onClick={handleCartToggle} className="text-white relative">
                <FaShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {isCartDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-10 p-4">
                  {cartItems.length === 0 ? (
                    <p className="text-gray-600 text-center">Your cart is empty</p>
                  ) : (
                    <div className="flex flex-col space-y-4">
                      {cartItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-lg" />
                            <div>
                              <p className="text-sm text-gray-800 font-semibold">{item.name}</p>
                              <p className="text-sm text-gray-500">${item.price}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => navigate('/cart')}
                        className="bg-color1 text-white py-2 px-4 rounded-lg font-semibold w-full hover:bg-opacity-90 transition"
                      >
                        Go to Cart
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Login Button */}
            <button
              onClick={handleSignUpButton}
              className="text-white text-lg hover:text-color2 transition-colors duration-300"
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
        <div className="bg-color1 p-4 mt-4 rounded-md shadow-md">
          <div className="flex flex-col space-y-4 text-white text-lg">
            {['Home', 'Order', 'Shop', 'About Us'].map((item, index) => (
              <Link
                key={index}
                to={`/${item.toLowerCase().replace(' ', '')}`}
                onClick={handleMenuToggle}
                className="transition-transform duration-300 hover:text-color2"
              >
                {item}
              </Link>
            ))}

            {/* Mobile Login Button */}
            <button
              onClick={handleSignUpButton}
              className="text-lg hover:text-color2 transition-colors duration-300"
            >
              Login
            </button>

            {/* Cart Icon in Mobile Menu */}
            <div className="relative">
              <button onClick={() => navigate('/cart')} className="text-white relative">
                <FaShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
