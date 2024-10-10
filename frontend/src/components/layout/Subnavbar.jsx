import React from 'react';

const Subnavbar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="bg-white py-3 px-6 shadow-sm mb-6 flex items-center justify-between">
      <div className="flex space-x-4">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`py-2 px-4 rounded-full font-semibold transition ${
            selectedCategory === 'All' ? 'bg-[#fede00] text-black' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedCategory('Men')}
          className={`py-2 px-4 rounded-full font-semibold transition ${
            selectedCategory === 'Men' ? 'bg-[#fede00] text-black' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Men
        </button>
        <button
          onClick={() => setSelectedCategory('Women')}
          className={`py-2 px-4 rounded-full font-semibold transition ${
            selectedCategory === 'Women' ? 'bg-[#fede00] text-black' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Women
        </button>
      </div>

      <button className="text-gray-500 hover:text-black flex items-center">
        <span className="mr-2">Filters</span>
        <img src="/icons/filter.svg" alt="Filter" />
      </button>
    </div>
  );
};

export default Subnavbar;
