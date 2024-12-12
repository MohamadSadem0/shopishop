import React from 'react';
import StoreCard from '../cards/UserStoreCard';

const StoreGrid = ({ stores, onSelectStore }) => {
  return (
    <div className="pr-10 flex flex-wrap gap-8 py-6 bg-bg">
      {stores.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No stores available.</p>
      ) : (
        stores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            onSelectStore={() => onSelectStore(store)}
          />
        ))
      )}
    </div>
  );
};

export default StoreGrid;
