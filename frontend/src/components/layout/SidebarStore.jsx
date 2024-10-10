import React, { useState } from 'react';

const SidebarStore = ({ merchants, selectedMerchant, setSelectedMerchant, selectedCategory, setSelectedCategory }) => {
  const [subNavbarOpen, setSubNavbarOpen] = useState(null);

  const toggleSubNavbar = (merchant) => {
    if (subNavbarOpen === merchant.id) {
      setSubNavbarOpen(null);  // Close if it's already open
    } else {
      setSubNavbarOpen(merchant.id);  // Open new section
    }
  };

  return (
    <aside className="w-64 mt-3 bg-white shadow-lg p-4 h-screen  top-16 overflow-y-hidden">
      <h2 className="text-xl font-bold mb-6">Categories</h2>
      <ul className="space-y-4">
        {merchants.map((merchant) => (
          <li key={merchant.id}>
            <button
              onClick={() => toggleSubNavbar(merchant)}
              className={`flex items-center justify-between w-full p-3 text-left text-lg font-semibold rounded-md transition-all ${
                subNavbarOpen === merchant.id ? 'bg-[#585649] text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {merchant.name}
              <span className="text-sm">{subNavbarOpen === merchant.id ? '-' : '+'}</span>
            </button>
            {subNavbarOpen === merchant.id && (
              <ul className="mt-2 ml-4 space-y-2">
                {merchant.categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`block p-2 rounded-md ${
                        selectedCategory === category ? 'bg-[#fede00] text-black' : 'hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarStore;
