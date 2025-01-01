import React from 'react';

const StoreCard = ({ store, onClick }) => {
  const { name, ownerName, sectionName, isApproved } = store;

  return (
    <div
      className="store-card block bg-white max-w-sm rounded-lg shadow-lg p-4 cursor-pointer"
      onClick={() => onClick(store)} // Pass the store data to the click handler
    >
      <h2 className="font-bold text-xl text-gray-800">{name}</h2>
      <p className="text-gray-600 mt-2">
        <span className="font-medium">Owner: </span>
        {ownerName}
      </p>
      <p className="text-gray-600 mt-1">
        <span className="font-medium">Section: </span>
        {sectionName}
      </p>
    </div>
  );
};

export default StoreCard;
