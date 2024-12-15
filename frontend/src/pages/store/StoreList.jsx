import React from 'react';
import { useSelector } from 'react-redux';

const StoreList = ({ className, onStoreClick }) => {
  const filteredStores = useSelector((state) => state.stores.filteredData);
  const status = useSelector((state) => state.stores.status);

  if (status === 'loading') return <p>Loading stores...</p>;
  if (status === 'failed') return <p>Failed to load stores. Please try again later.</p>;

  return (
    <div className={`bg-opacity-50 backdrop-blur-md bg-white min-h-screen p-8 lg:p-6 ${className}`}>
      <h2 className="font-bold text-2xl lg:text-3xl mb-6 text-left">Stores</h2>
      {filteredStores.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStores.map((store) => (
            <li
              key={store.id}
              className="p-4 sm:p-3 lg:p-2 border border-gray-300 rounded-lg shadow-sm hover:shadow-md bg-white cursor-pointer"
              onClick={() => onStoreClick(store.id)}
            >
              <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
                <img
                  src={store.imageUrl || 'https://via.placeholder.com/150?text=No+Image'}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg lg:text-base">{store.name}</h3>
              <p className="text-sm text-gray-600 lg:text-xs">Owner: {store.ownerName}</p>
              <p className="text-sm text-gray-600 lg:text-xs">Section: {store.sectionName}</p>
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
