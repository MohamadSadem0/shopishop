import React, { useEffect } from 'react';

const StoreCard = ({ store, onViewDetails, onApprove }) => {
  const { id, name, ownerName, sectionName, approved } = store;
  useEffect(()=>{
    console.log(store);
    
  },[])

  return (
    <div className="bg-white shadow-lg rounded-lg h-[220px] desktop:w-[280px] md:w-[200px] laptop:w-[230px] m-0 overflow-hidden transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl my-2 flex flex-col space-y-2">
      <div className="h-full flex justify-between flex-col p-2">
        {/* Store Details */}
        <div className="text-center flex justify-center flex-col">
          <h3 className="text-lg">
            <span className="text-blue-500 font-bold">Store Name:</span>{' '}
            <span>{name}</span>
          </h3>
          <p className="text-sm text-gray-600">
            <span className="font-bold">Owner:</span> {ownerName}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-bold">Section:</span> {sectionName}
          </p>
          <p className="text-blue-500">
            <span className="text-lg font-bold">Status:</span>{' '}
            {approved ? (
              <span className="text-green-600">Approved</span>
            ) : (
              <span className="text-red-600">Pending</span>
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center items-end space-x-2 box-border">
          <button
            onClick={() => onViewDetails(id)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200 flex w-full justify-center"
          >
            View Details
          </button>

          {!approved && (
            <button
              onClick={() => onApprove(id)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition duration-200 flex w-full justify-center"
            >
              Approve
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
