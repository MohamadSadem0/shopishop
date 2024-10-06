
import React, { useState, useEffect } from 'react';
import { FiSun, FiBell } from 'react-icons/fi'; // Icons for light mode and notification
import CryptoJS from "crypto-js";


const DashboardNavbar = () => {
  const [userData, setUserData] = useState({ email: "", name: "", role: "" });

  useEffect(() => {
    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

    // Decrypt data stored in sessionStorage
    const encryptedUserEmail = sessionStorage.getItem("userEmail");
    const encryptedUserName = sessionStorage.getItem("userName");
    const encryptedUserRole = sessionStorage.getItem("userRole");

    if (encryptedUserEmail && encryptedUserName && encryptedUserRole && encryptionKey) {
      const userEmail = CryptoJS.AES.decrypt(encryptedUserEmail, encryptionKey).toString(CryptoJS.enc.Utf8);
      const userName = CryptoJS.AES.decrypt(encryptedUserName, encryptionKey).toString(CryptoJS.enc.Utf8);
      const userRole = CryptoJS.AES.decrypt(encryptedUserRole, encryptionKey).toString(CryptoJS.enc.Utf8);

      setUserData({ email: userEmail, name: userName, role: userRole });
    }
  }, []);

  return (
    <div className=" top-0 right-0 h-16 flex justify-between items-center pr-8  w-full">
      {/* Search Input on the Left */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded border border-gray-400"
        />
      </div>
      
      {/* Icons and Profile on the Right */}
      <div className="flex items-center space-x-6">
        {/* Light Mode Icon */}
        <FiSun className="w-6 h-6 cursor-pointer" />

        {/* Notification Icon */}
        <FiBell className="w-6 h-6 cursor-pointer" />

        {/* Profile Picture and Username */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <span className="text-lg font-medium">{userData.name}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
