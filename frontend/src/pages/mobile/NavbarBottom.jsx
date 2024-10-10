import React from 'react';

const NavbarBottom = () => {
  return (
    <div className="fixed bottom-0 left-0  right-0 bg-white border-t border-gray-300 shadow-sm flex justify-around items-center py-3">
      <NavItem icon="🏠" label="Home" />
      <NavItem icon="🔍" label="Search" />
      <NavItem icon="🚚" label="Butler" />
      <NavItem icon="📦" label="Orders" />
      <NavItem icon="👤" label="Account" />
    </div>
  );
};

// Reusable Component for a single item in the bottom navbar
const NavItem = ({ icon, label }) => (
  <div className="flex flex-col items-center text-gray-600 hover:text-teal-500">
    <span className="text-2xl">{icon}</span>
    <p className="text-xs">{label}</p>
  </div>
);

export default NavbarBottom;
