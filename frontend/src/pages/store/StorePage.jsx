import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProductsByStore } from '../../redux/slices/productSlice';
import StoreList from './StoreList';
import ProductList from './ProductList';

const StorePage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const storeId = searchParams.get('store'); // Get store ID from query params
  const { status, filteredProducts } = useSelector((state) => state.products);

  // Fetch products when storeId changes
  useEffect(() => {
    if (storeId) {
      dispatch(fetchProductsByStore(storeId));
    }
  }, [dispatch, storeId]);

  // Handle store click to set query params
  const handleStoreClick = (store) => {
    setSearchParams({ store: store.id });
  };

  return (
    <div className="store-page p-8">
      <h1 className="text-3xl font-bold mb-6">Stores and Products</h1>

      {/* Display list of stores */}
      <StoreList onStoreClick={handleStoreClick} />

      {/* Display products for the selected store */}
      {status === 'loading' ? (
        <p>Loading products...</p>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
};

export default StorePage;
