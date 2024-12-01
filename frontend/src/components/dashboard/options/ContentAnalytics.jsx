import React from 'react';
import Nav from '../DashboardNavbar';

const ContentAnalytics = () => {
  return (
    <div className="p-8 w-full bg-color3">
      <Nav />
      <h2 className="text-2xl font-bold mb-8">Analytics Overview</h2>
      <div className="w-full h-[400px] bg-white rounded-lg shadow-md p-6">
        <p>Analytics data goes here...</p>
      </div>
    </div>
  );
};

export default ContentAnalytics;
