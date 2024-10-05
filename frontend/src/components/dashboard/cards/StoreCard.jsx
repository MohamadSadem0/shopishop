import React from 'react';

const StoreCard = ({ store, onViewDetails, onApprove }) => {
  const { id, name, ownerName, approved } = store;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4 w-full md:w-1/3 lg:w-1/4">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p><strong>Owner:</strong> {ownerName}</p>
      <p><strong>Approved:</strong> {approved ? 'Yes' : 'No'}</p>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => onViewDetails(id)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          View Details
        </button>

        {!approved && (
          <button
            onClick={() => onApprove(id)} // Call the parent's approve handler
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Approve
          </button>
        )}
      </div>
    </div>
  );
};

export default StoreCard;
