// Dashboardpage.jsx
import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js'; // Import CryptoJS for decryption
import Sidebar from '../../components/dashboard/Sidebar';
import ContentDashboard from '../../components/dashboard/options/ContentDashboard';
import ContentOrders from '../../components/dashboard/options/ContentOrders';
import ContentAnalytics from '../../components/dashboard/options/ContentAnalytics';
import ContentAddProduct from '../../components/dashboard/options/ContentAddProduct';
import ContentSeeAllProducts from '../../components/dashboard/options/ContentSeeAllProducts';

// Superadmin components
import ContentSeeAllUsers from '../../components/dashboard/superadmin/ContentSeeAllUsers.jsx';
import ContentSeeAllStores from '../../components/dashboard/superadmin/ContentSeeAllStores.jsx';
import ContentCategories from '../../components/dashboard/superadmin/ContentCategories.jsx'; // New Component for Categories
import ContentSections from '../../components/dashboard/superadmin/ContentSections.jsx'; // New Component for Sections

// Your encryption key from environment variables
const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

const Dashboardpage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState(''); // State to manage decrypted user role (merchant or superadmin)

  // Helper function to decrypt the encrypted role
  const decryptRole = (encryptedRole) => {
    if (!encryptedRole || !encryptionKey) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedRole, encryptionKey);
      return bytes.toString(CryptoJS.enc.Utf8); // Decrypted role as plain text
    } catch (error) {
      console.error("Error decrypting role:", error);
      return null;
    }
  };

  // Fetch and decrypt role from session storage
  useEffect(() => {
    const encryptedRole = sessionStorage.getItem('userRole'); // Assuming encrypted role is stored in sessionStorage
    const decryptedRole = decryptRole(encryptedRole); // Decrypt the role
    setRole(decryptedRole); // Set the decrypted role
    console.log("Decrypted Role: " + decryptedRole);
  }, []);

  const renderMerchantContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ContentDashboard />;
      case 'analytics':
        return <ContentAnalytics />;
      case 'orders':
        return <ContentOrders />;
      case 'addProduct':
        return <ContentAddProduct />;
      case 'seeAllProducts':
        return <ContentSeeAllProducts />;
      default:
        return <ContentDashboard />;
    }
  };

  const renderSuperAdminContent = () => {
    switch (activeTab) {
      case 'seeAllUsers':
        return <ContentSeeAllUsers  />;
      case 'seeAllStores':
        return <ContentSeeAllStores />;
      case 'categories':
        return <ContentCategories />; // New categories content
      case 'sections':
        return <ContentSections  />; // New sections content
      case 'dashboard':
        return <ContentDashboard />; // Shared component for both roles
      default:
        return <ContentDashboard />;
    }
  };

  return (
    <div className="flex ">
      <Sidebar setActiveTab={setActiveTab} role={role} /> {/* Fixed Sidebar */}
      <div className="ml-64 w-full h-screen overflow-auto  bg-[#F7F9EB] ">
        {/* Conditionally render content based on decrypted user role */}
        {role === 'merchant' && renderMerchantContent()}
        {role === 'superadmin' && renderSuperAdminContent()}
      </div>
    </div>
  );
};

export default Dashboardpage;
