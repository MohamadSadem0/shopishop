import React from "react";

const StoreCard = ({ store, onClick }) => {
  const {name, ownerName, sectionName, isApproved} = store;
  return (
    <div className="bg-white max-w-sm rounded-lg shadow-lg p-4">
      {/* Store Name */}
      <h2 className="font-bold text-xl text-gray-800">{name}</h2>
      
      {/* Owner Name */}
      <p className="text-gray-600 mt-2">
        <span className="font-medium">Owner: </span>
        {ownerName}
      </p>
      
      {/* Section Name */}
      <p className="text-gray-600 mt-1">
        <span className="font-medium">Section: </span>
        {sectionName}
      </p>
      
      {/* Approval Status */}
      <div className="mt-4">
        <span
          className={`px-3 py-1 text-sm rounded font-medium ${
            store.isApproved
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {isApproved ? "Approved" : "Pending Approval"}
        </span>
      </div>
    </div>
  );
};

export default StoreCard;
