import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { approveStoreAPI } from '../../../services/fetchingService';
import StoreCard from '../cards/StoreCard';
import StoreModal from '../forms/StoreModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStores, resetStores } from '../../../redux/slices/storeSlice';

const ContentSeeAllStores = ({ searchQuery }) => {
  const { data: stores, error, status } = useSelector((state) => state.stores);
  const loading = status === 'loading';
  const dispatch = useDispatch();

  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllStores());
    }
  }, [dispatch, status]);

  const handleApproveStore = async (storeId) => {
    try {
      await approveStoreAPI(storeId);
      dispatch(resetStores());
      dispatch(fetchAllStores());
    } catch (err) {
      console.error(`Failed to approve store: ${err.message}`);
    }
  };

  const handleViewDetails = (store) => {
    setSelectedStore(store);
  };

  const closeModal = () => {
    setSelectedStore(null);
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 w-full bg-color3">
      <div className="mb-4 flex flex-row justify-between items-center">
        <h2 className="text-xl md:text-2xl font-bold">Stores</h2>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <div className="flex justify-center">
          <ClipLoader color="#4A90E2" size={50} />
        </div>
      ) : (
        <>
          <div className="w-full flex flex-wrap items-center justify-between mt-4">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onViewDetails={() => handleViewDetails(store)}
                  onApprove={() => handleApproveStore(store.id)}
                />
              ))
            ) : (
              <p className="mt-4 text-gray-600 w-full text-center">
                No stores match the search query.
              </p>
            )}
          </div>

          <StoreModal isOpen={!!selectedStore} onClose={closeModal}>
            {selectedStore && (
              <div>
                <h3 className="text-xl font-bold">{selectedStore.name}</h3>
                <p className="text-gray-600">{selectedStore.description}</p>
              </div>
            )}
          </StoreModal>
        </>
      )}
    </div>
  );
};

export default ContentSeeAllStores;
