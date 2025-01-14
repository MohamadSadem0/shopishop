import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import Sidebar from '../../components/dashboard/Sidebar';
import SmallDeviceSidebar from '../../components/dashboard/SmallDeviceSidebar'; // Import the new sidebar
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { useResponsiveDesign } from '../../hooks/useResponsiveDesign';

// Import content components
import ContentDashboard from '../../components/dashboard/options/ContentDashboard';
import ContentOrders from '../../components/dashboard/options/ContentOrders';
import ContentAnalytics from '../../components/dashboard/options/ContentAnalytics';
import ContentAddProduct from '../../components/dashboard/options/ContentAddProduct';
import ContentSeeAllProducts from '../../components/dashboard/options/ContentSeeAllProducts';
import ContentSeeAllUsers from '../../components/dashboard/superadmin/ContentSeeAllUsers';
import ContentSeeAllStores from '../../components/dashboard/superadmin/ContentSeeAllStores';
import ContentCategories from '../../components/dashboard/superadmin/ContentCategories';
import ContentSections from '../../components/dashboard/superadmin/ContentSections';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { isMobile } = useResponsiveDesign(); // Responsive design hook

  useEffect(() => {
    const encryptedRole = sessionStorage.getItem('userRole');
    if (encryptedRole) {
      try {
        const bytes = CryptoJS.AES.decrypt(
          encryptedRole,
          process.env.REACT_APP_ENCRYPTION_KEY
        );
        const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);
        setRole(decryptedRole);
      } catch (error) {
        console.error('Decryption failed:', error);
      }
    }
  }, []);

  const handleSearch = (query) => setSearchQuery(query);

  const renderContent = () => {
    const commonProps = { searchQuery }; // Add searchQuery as prop
    switch (activeTab) {
      case 'dashboard':
        return <ContentDashboard {...commonProps} />;
      case 'analytics':
        return <ContentAnalytics {...commonProps} />;
      case 'orders':
        return <ContentOrders {...commonProps} />;
      case 'addProduct':
        return <ContentAddProduct {...commonProps} />;
      case 'seeAllProducts':
        return <ContentSeeAllProducts {...commonProps} />;
      case 'seeAllUsers':
        return <ContentSeeAllUsers {...commonProps} />;
      case 'seeAllStores':
        return <ContentSeeAllStores {...commonProps} />;
      case 'categories':
        return <ContentCategories {...commonProps} />; // Pass searchQuery to ContentCategories
      case 'sections':
        return <ContentSections {...commonProps} />;
      default:
        return <ContentDashboard {...commonProps} />;
    }
  };

  return (
    <div
      className={`flex ${
        isMobile ? 'flex-col' : 'flex-row'
      } w-full h-full  bg-color3 `}
    >
      {/* Conditionally render SmallDeviceSidebar or Sidebar based on screen size */}
      {isMobile ? (
        <SmallDeviceSidebar setActiveTab={setActiveTab} activeTab={activeTab} role={role} />
      ) : (
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} role={role} />
      )}

      <div className="flex-grow  w-full h-lvh overflow-auto">
        <DashboardNavbar onSearch={handleSearch} /> {/* Pass handleSearch to the navbar */}
        <div className="overflow-auto p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DashboardPage;
