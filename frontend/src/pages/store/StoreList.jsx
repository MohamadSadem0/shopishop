import React from 'react';
import { useSelector } from 'react-redux';
import StoreCard from './StoreCard';

const StoreList = ({ className, onStoreClick }) => {
  const filteredStores = useSelector((state) => state.stores.filteredData);
  const status = useSelector((state) => state.stores.status);

  if (status === 'loading') return <p>Loading stores...</p>;
  if (status === 'failed') return <p>Failed to load stores. Please try again later.</p>;

  return (
    <div className={`bg-opacity-50 backdrop-blur-md bg-white min-h-screen p-8 lg:p-6 ${className}`}>
      <h2 className="font-bold text-2xl lg:text-3xl mb-6 text-left">Stores</h2>
      {filteredStores.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStores.map((store) => (
            <li key={store.id}>
              <StoreCard store={store} onClick={onStoreClick} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No stores available for this section.</p>
      )}
    </div>
  );
};

export default StoreList;
