import React from 'react';

const CategoriesSidebar = ({ merchants }) => {
  return (
    <div className=" ml-3 w-1/6 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Categories</h2>
      {merchants.map((merchant) => (
        <div key={merchant.id} className="mb-4">
          <button className="w-full text-left py-3 px-4 font-semibold bg-gray-200 rounded-lg hover:bg-gray-300">
            {merchant.name} <span className="ml-2">+</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoriesSidebar;
 