import React from 'react';

const StoreCard = ({ store, onViewDetails, onApprove }) => {
  const { id, name, ownerName, approved } = store;

  return (
    <div className="bg-white shadow-lg rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl p-7 mr-2 my-2 flex flex-col space-y-2 w-80"> {/* Fixed width with w-80 (20rem) */}
      <h3 className="text-lg">
        <span className="text-blue-500 font-bold">Store Name:</span>{' '}
        <span>{name}</span>
      </h3>
      <p className="text-sm text-gray-600">
        <span className="font-bold">Owner:</span> {ownerName}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-bold">Status:</span>{' '}
        {approved ? (
          <span className="text-green-600">Approved</span>
        ) : (
          <span className="text-red-600">Pending</span>
        )}
      </p>

      <div className="flex space-x-2">
        <button
          onClick={() => onViewDetails(id)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200"
        >
          View Details
        </button>

        {!approved && (
          <button
            onClick={() => onApprove(id)}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition duration-200"
          >
            Approve
          </button>
        )}
      </div>
    </div>
  );
};

export default StoreCard;
