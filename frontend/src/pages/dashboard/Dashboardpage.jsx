// import React from 'react';
// import Sidebar from '../../components/dashboard/Sidebar';
// import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
// import ContentDashboard from '../../components/dashboard/options/ContentDashboard';

// const Dashboardpage = () => {
//   return (
//     <div className="flex flex-row min-h-screen w-full">
//       <Sidebar />
//       <ContentDashboard className="w-screen" />


//     </div>
//   );
// };

// export default Dashboardpage;


import React, { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import ContentDashboard from '../../components/dashboard/options/ContentDashboard';
import ContentOrders from '../../components/dashboard/options/ContentOrders';
import ContentAnalytics from '../../components/dashboard/options/ContentAnalytics';
import ContentAddProduct from '../../components/dashboard/options/ContentAddProduct'; // Add this component
import ContentSeeAllProducts from '../../components/dashboard/options/ContentSeeAllProducts'; // Add this component

const Dashboardpage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ContentDashboard />;
      case 'analytics':
        return <ContentAnalytics />;
      case 'orders':
        return <ContentOrders />;
      case 'addProduct':
        return <ContentAddProduct />;
      case 'seeAllProducts': // Add this case for See All Products
        return <ContentSeeAllProducts />;
      default:
        return <ContentDashboard />;
    }
  };

  return (
    <div className="flex flex-row min-h-screen w-full">
      <Sidebar setActiveTab={setActiveTab} /> {/* Pass setActiveTab */}
      {renderContent()} {/* Render the content based on activeTab */}
    </div>
  );
};

export default Dashboardpage;