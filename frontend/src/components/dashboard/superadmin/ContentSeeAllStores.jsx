import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  approveStoreAPI,
  fetchAllStoresAPI,
} from '../../../services/fetchingService';
import StoreCard from '../cards/StoreCard';
import StoreModal from '../forms/StoreModal'; // Import the Modal component

const ContentSeeAllStores = ({ searchQuery }) => {
  const [stores, setStores] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null); // State to handle the selected store

  const fetchStores = async () => {
    setLoading(true);
    try {
      const fetchedStores = await fetchAllStoresAPI();
      setStores(fetchedStores);
    } catch (err) {
      setError(`Failed to fetch stores: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleApproveStore = async (storeId) => {
    try {
      await approveStoreAPI(storeId);
      fetchStores();
    } catch (err) {
      setError(`Failed to approve store: ${err.message}`);
    }
  };

  const handleViewDetails = (store) => {
    setSelectedStore(store); // Set the selected store for the modal
  };

  const closeModal = () => {
    setSelectedStore(null); // Reset the selected store on closing modal
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 w-full bg-color3">
      {/* Wrapper div for heading and search */}
      <div className="mb-4 flex flex-row justify-between items-center">
        {/* Heading */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Stores</h2>
        </div>

        {/* Search Input (optional if needed) */}
        {/* Add a dropdown or additional buttons as needed */}
      </div>

      {/* Display Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center">
          <ClipLoader color="#4A90E2" size={50} />
        </div>
      ) : (
        <>
          {/* Stores Display */}
          <div className="w-full flex flex-wrap items-center justify-between mt-4">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onViewDetails={() => handleViewDetails(store)}
                  onApprove={handleApproveStore}
                />
              ))
            ) : (
              <p className="mt-4 text-gray-600 w-full text-center">
                No stores match the search query.
              </p>
            )}
          </div>

          {/* Store Details Modal */}
          <StoreModal isOpen={!!selectedStore} onClose={closeModal}>
            {selectedStore && (
              <div>
                <h3 className="text-xl font-bold">{selectedStore.name}</h3>
                <p className="text-gray-600">{selectedStore.description}</p>
                {/* Add additional details about the store */}
              </div>
            )}
          </StoreModal>
        </>
      )}
    </div>
  );
};

export default ContentSeeAllStores;
