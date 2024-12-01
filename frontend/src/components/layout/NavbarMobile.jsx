import React from 'react';
import { FaMapMarkerAlt, FaBell } from 'react-icons/fa';  // FontAwesome Icons

const NavbarMobile = () => {
  return (
    <div className="bg-white p-4 flex justify-between items-center shadow-sm border-b border-gray-300">
      {/* Left: Location Icon and Text */}
      <div className="flex items-center text-green-600 font-semibold">
        <FaMapMarkerAlt className="mr-2" /> {/* Location Icon */}
        <span>Work</span>
      </div>

      {/* Right: Notification Bell */}
      <div className="text-gray-500">
        <FaBell className="text-xl" /> {/* Notification Icon */}
      </div>
    </div>
  );
};

export default NavbarMobile;
