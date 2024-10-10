import React from 'react';

const SearchAndFilterBar = ({ searchTerm, setSearchTerm, sortBy, setSortBy, priceRange, setPriceRange }) => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      {/* Search Input */}
      <div className="flex items-center bg-white p-2 rounded-md shadow-md w-1/3 border border-[#585649]">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full focus:outline-none text-[#585649] placeholder-gray-400"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="bg-white p-2 rounded-md shadow-md border border-[#585649]">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="focus:outline-none text-[#585649]"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilterBar;
