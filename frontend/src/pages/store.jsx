import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearProducts } from '../redux/slices/productSlice';
import Navbar from '../components/layout/NavBar';
import StoreSidebar from './store/StoreSidebar';
import StoreList from './store/StoreList';
import ProductList from './store/ProductList';
import { fetchApprovedStores } from '../redux/slices/storeSlice';

const Store = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const dispatch = useDispatch();

  const handleStoreClick = (storeId) => {
    setSelectedStore(storeId);
  };

  const handleBack = () => {
    setSelectedStore(null);
    dispatch(clearProducts());
  };
  useEffect(() => {
    dispatch(fetchApprovedStores()); // Fetch approved stores
  }, [dispatch]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <StoreSidebar className="lg:w-1/4 border-r border-gray-300 shadow-md" />
        <div className="lg:w-3/4 flex-1 p-4 overflow-y-auto">
          {!selectedStore ? (
            <StoreList className="bg-white shadow-lg rounded-lg p-6" onStoreClick={handleStoreClick} />
          ) : (
            <>
              <button
                onClick={handleBack}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Back to Stores
              </button>
              <ProductList className="bg-white shadow-lg rounded-lg p-6" storeId={selectedStore} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
