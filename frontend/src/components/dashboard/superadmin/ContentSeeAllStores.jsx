import React, { useState, useEffect } from 'react';
import { fetchAllStores, approveStore } from '../../../services/fetchingService'; // Import the API calls
import StoreCard from '../cards/StoreCard'; // Import the store card component

const ContentSeeAllStores = () => {
  const [stores, setStores] = useState([]);
  const [error, setError] = useState('');

  // Fetch all stores from the backend
  const fetchStores = async () => {
    try {
      const fetchedStores = await fetchAllStores();
      setStores(fetchedStores);
    } catch (err) {
      setError('Failed to fetch stores');
    }
  };

  useEffect(() => {
    fetchStores(); // Fetch stores when the component mounts
  }, []);

  // Handle approval of the store
  const handleApproveStore = async (storeId) => {
    try {
      await approveStore(storeId); // Approve the store in the backend
      fetchStores(); // Refetch the stores after approving to get updated status
    } catch (err) {
      setError('Failed to approve store');
    }
  };

  const handleViewDetails = (storeId) => {
    console.log(`View details for store ID: ${storeId}`);
    // Handle viewing details of the store
  };

  return (
    <div className="p-8 w-full bg-[#F7F9EB]">
      <h2 className="text-2xl font-bold mb-8">All Stores</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex flex-wrap">
        {stores.length === 0 ? (
          <p>No stores available.</p>
        ) : (
          stores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              onViewDetails={handleViewDetails}
              onApprove={handleApproveStore} // Pass the approval handler to StoreCard
              
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ContentSeeAllStores;
