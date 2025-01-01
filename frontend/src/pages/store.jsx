import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearProducts, fetchProductsByStore } from '../redux/slices/productSlice';
import Navbar from '../components/layout/NavBar';
import StoreSidebar from './store/StoreSidebar';
import StoreList from './store/StoreList';
import ProductList from './store/ProductList';
import CategorySubNav from './store/CategorySubNav';
import { fetchApprovedStores } from '../redux/slices/storeSlice';
import SearchAndFilterBar from './store/SearchAndFilterBar';

const Store = () => {
  const [sectionId, setSectionId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { storename } = useParams(); // Extract store name from URL

  const { filteredData: stores } = useSelector((state) => state.stores);
  const { products, filteredProducts, status } = useSelector((state) => state.products);

  // Decode the storename from the URL
  const decodedStoreName = decodeURIComponent(storename);

  // Fetch approved stores when the component mounts
  useEffect(() => {
    dispatch(fetchApprovedStores());
  }, [dispatch]);

  // Handle store click and navigation to store's product page
  const handleStoreClick = useCallback(
    (store) => {
      setSectionId(store.sectionId); // Set sectionId for categories
      navigate(`/store/${encodeURIComponent(store.name)}/products`); // Encode the store name for the URL
      if (!products[store.id]) {
        dispatch(fetchProductsByStore(store.id)); // Fetch products if not cached
      }
    },
    [dispatch, navigate, products]
  );

  // Handle back navigation to store list
  const handleBack = useCallback(() => {
    navigate('/store'); // Navigate back to store list
    setSectionId(null); // Reset sectionId
    dispatch(clearProducts()); // Clear product state
  }, [dispatch, navigate]);

  // Find the selected store based on the decoded storename
  const selectedStore = stores.find((store) => store.name === decodedStoreName);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <StoreSidebar className="lg:w-1/4 border-r border-gray-300 shadow-md" />

        <div className="lg:w-3/4 flex-1 p-4 overflow-y-auto">
          {!selectedStore ? (
            // Store List View: Display when no store is selected
            <StoreList
              className="bg-white shadow-lg rounded-lg p-6"
              onStoreClick={handleStoreClick}
            />
          ) : (
            // Store Products View: Display when a store is selected
            <>
              <button
                onClick={handleBack}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Back to Stores
              </button>

              {/* Search and Filter Bar */}
              <SearchAndFilterBar />

              {/* Category Sub-Navigation */}
              {sectionId && <CategorySubNav storeId={selectedStore.id} sectionId={sectionId} />}

              {/* Product List */}
              <ProductList
                className="bg-white shadow-lg rounded-lg p-6"
                products={filteredProducts || products[selectedStore.id]}
                status={status}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
