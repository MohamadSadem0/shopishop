import React, { useState, useEffect } from 'react';
import { fetchAllStores, approveStore } from '../../../services/fetchingService';
import StoreCard from '../cards/StoreCard';
import ClipLoader from 'react-spinners/ClipLoader'; // Import ClipLoader from react-spinners

const ContentSeeAllStores = ({ searchQuery }) => { // Accept searchQuery as a prop
  const [stores, setStores] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading status

  const fetchStores = async () => {
    setLoading(true);
    try {
      const fetchedStores = await fetchAllStores();
      setStores(fetchedStores);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch stores');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleApproveStore = async (storeId) => {
    try {
      await approveStore(storeId);
      fetchStores(); // Refresh the list of stores after approving
    } catch (err) {
      setError('Failed to approve store');
    }
  };

  // Filter stores based on the searchQuery
  const filteredStores = stores.filter((store) => {
    const name = store.name || ''; // Safely handle missing names
    const description = store.description || ''; // Safely handle missing descriptions
    const Owner=store.Owner || ""

    // Match the store name or description with the search query
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="p-8 w-full overflow-y-auto bg-[#F7F9EB]">
      <h2 className="text-2xl font-bold mb-8">All Stores</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#4A90E2" size={50} /> {/* Customize the color and size as needed */}
        </div>
      ) : (
        <div className="flex flex-wrap">
          {filteredStores.length === 0 ? (
            <p>No stores match the search query.</p>
          ) : (
            filteredStores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onViewDetails={() => {}}
                onApprove={handleApproveStore}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ContentSeeAllStores;
