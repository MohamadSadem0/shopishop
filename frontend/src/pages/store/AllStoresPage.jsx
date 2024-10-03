import React, { useEffect, useState } from 'react';
import { fetchAllStores } from '../../services/fetchingService';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/NavBar';

const AllStoresPage = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOwner, setSelectedOwner] = useState('');

  const navigate = useNavigate();

  // Fetch all stores on component mount
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetchAllStores();
        setStores(response);
        setFilteredStores(response); // Initially show all stores
      } catch (error) {
        console.error('Failed to fetch stores:', error);
      }
    };
    fetchStores();
  }, []);

  // Handle filtering by search or owner
  useEffect(() => {
    let result = stores;

    // Apply owner name filter
    if (selectedOwner) {
      result = result.filter((store) => store.ownerName.toLowerCase() === selectedOwner.toLowerCase());
    }

    // Apply search filter
    if (searchQuery) {
      result = result.filter((store) =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStores(result);
  }, [stores, selectedOwner, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto px-4 py-10 mt-16">
        <h1 className="text-3xl font-bold mb-6 text-center">All Stores</h1>

        {/* Search and Owner Filter */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search stores or owners..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded"
          />

          <select
            value={selectedOwner}
            onChange={(e) => setSelectedOwner(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Owners</option>
            {/* Unique owners from the stores */}
            {Array.from(new Set(stores.map((store) => store.ownerName))).map((owner, index) => (
              <option key={index} value={owner}>
                {owner}
              </option>
            ))}
          </select>
        </div>

        {/* Display Filtered Stores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="store-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(`/store/${store.id}`)}
            >
              <h2 className="text-xl font-bold mb-2">
                {store.name} <span className="text-sm text-gray-600">#{store.id}</span>
              </h2>
              <p className="text-gray-600 mb-4">Owner: {store.ownerName}</p>
              <p className={`text-gray-800 font-semibold ${store.approved ? 'text-green-600' : 'text-red-600'}`}>
                {store.approved ? 'Approved' : 'Not Approved'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllStoresPage;
