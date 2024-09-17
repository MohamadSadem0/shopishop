import React from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Content from '../../components/dashboard/Content';

const Dashboardpage = () => {
  return (
    <div className="flex flex-row min-h-screen w-full">
      <Sidebar />
      <Content className="w-screen" />


    </div>
  );
};

export default Dashboardpage;
