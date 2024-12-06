import React, { useState, useEffect } from 'react';
import { FiSun, FiBell } from 'react-icons/fi'; // Icons for light mode and notification
import { getDecryptedItem } from '../../utils/decryptToken'; // Import named exports
import { useResponsiveDesign } from '../../hooks/useResponsiveDesign'; // Hook to check if it's mobile view

const DashboardNavbar = ({ onSearch }) => {
  const [userData, setUserData] = useState({ email: "", name: "", role: "" });
  const [searchQuery, setSearchQuery] = useState(''); // State to handle the search input
  const { isMobile } = useResponsiveDesign(); // Use responsive design to detect mobile view

  useEffect(() => {
    const decryptedUserEmail = getDecryptedItem('userEmail');
    const decryptedUserName = getDecryptedItem('userName');
    const decryptedUserRole = getDecryptedItem('userRole');

    setUserData({
      email: decryptedUserEmail,
      name: decryptedUserName,
      role: decryptedUserRole,
    });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update local state
    onSearch(query); // Pass the search query up to the parent (DashboardPage)
  };

  // Hide navbar content on mobile view
  if (isMobile) {
    return null; // Do not render the navbar items on mobile
  }

  return (
    <div className="p-10 pl-7 h-16 flex justify-between items-center w-full">
      {/* Search Input on the Left */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange} // Call the search handler
          className="px-4 py-2 rounded border border-gray-400"
        />
      </div>
      
      {/* Icons and Profile on the Right */}
      <div className="flex items-center space-x-6">
        {/* Light Mode Icon */}
        <FiSun className="w-6 h-6 cursor-pointer" />

        {/* Notification Icon */}
        <FiBell className="w-6 h-6 cursor-pointer" />

        {/* Username */}
        <div className="text-lg font-medium">{userData.name}</div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
