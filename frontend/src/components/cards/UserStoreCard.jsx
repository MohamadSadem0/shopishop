import React from 'react';

const UserStoreCard = ({ store, onSelectStore }) => {
  const { name, ownerName } = store;

  return (
    <div
      className="bg-white flex flex-col w-full max-w-sm p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 relative cursor-pointer"
      onClick={onSelectStore}
    >
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-sm text-gray-600">Owner: {ownerName}</p>
      </div>
    </div>
  );
};

export default UserStoreCard;
