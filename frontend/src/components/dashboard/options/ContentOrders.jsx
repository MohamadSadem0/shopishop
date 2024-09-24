import React from 'react';
import Nav from '../DashboardNavbar';

const ContentOrders = () => {
  return (
    <div className="p-8 w-full bg-[#F7F9EB]">
      <Nav />
      <h2 className="text-2xl font-bold mb-8">Orders Overview</h2>
      <div className="w-full h-[400px] bg-white rounded-lg shadow-md p-6">
        <p>Order details go here...</p>
      </div>
    </div>
  );
};

export default ContentOrders;
