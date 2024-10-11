import React, { useState, useEffect } from 'react';
import { fetchAllStores, approveStore } from '../../../services/fetchingService';
import StoreCard from '../cards/StoreCard';
import ClipLoader from 'react-spinners/ClipLoader';
import StoreModal from '../forms/StoreModal'; // Import the Modal component

const ContentSeeAllStores = ({ searchQuery }) => {
  const [stores, setStores] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null); // State to handle the selected store

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
      fetchStores();
    } catch (err) {
      setError('Failed to approve store');
    }
  };

  const handleViewDetails = (store) => {
    setSelectedStore(store); // Set the selected store for the modal
  };

  const closeModal = () => {
    setSelectedStore(null); // Reset the selected store on closing modal
  };

  const filteredStores = stores.filter((store) => store.name.toLowerCase().includes(searchQuery.toLowerCase()) || store.description.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-8 w-full overflow-y-auto bg-color3">
      <h2 className="text-2xl font-bold mb-8">All Stores</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#4A90E2" size={50} />
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
                onViewDetails={() => handleViewDetails(store)}
                onApprove={handleApproveStore}
              />
            ))
          )}
          <StoreModal isOpen={!!selectedStore} onClose={closeModal}>
            {selectedStore && (
              <div>
                <h3>{selectedStore.name}</h3>
                <p>{selectedStore.description}</p>
                {/* Display other details as needed */}
              </div>
            )}
          </StoreModal>
        </div>
      )}
    </div>
  );
};

export default ContentSeeAllStores;
