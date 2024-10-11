

import React from 'react';

const SubNavbar = ({ categories, setSelectedCategory }) => {
  return (
    <div className="w-full bg-white shadow-lg">
      <div className="flex justify-center items-center py-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className="mx-4 px-4 py-2 text-lg font-semibold text-gray-700 hover:text-white hover:bg-color1 rounded-md transition duration-300"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubNavbar;
 