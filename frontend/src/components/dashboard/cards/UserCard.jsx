import React from 'react';

const UserCard = ({ user, onClick }) => {
  const hasStore = user.role === 'MERCHANT' && user.store;

  return (
    <div
      className="bg-white sm:w-1/2 sm:flex-auto shadow-lg rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl p-7 mr-2 my-2 flex flex-col space-y-2 w-80 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            src="/path/to/default/avatar.jpg" // Replace with actual avatar path
            alt="Profile"
            className="h-12 w-12 rounded-full"
          />
        </div>
        <div className="flex-grow overflow-hidden">
          <h3 className="text-lg font-semibold text-blue-500 truncate">{user.userName || 'No Username'}</h3>
          <p className="text-sm text-gray-600 truncate">{user.email}</p>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
      </div>

      {user.location && (
        <div className="mt-4">
          <h4 className="text-sm font-bold text-gray-700">Location:</h4>
          <p className="text-sm text-gray-600 truncate">{user.location.addressLine}</p>
          <p className="text-sm text-gray-600 truncate">{`${user.location.city}, ${user.location.state} ${user.location.zipCode}`}</p>
          <p className="text-sm text-gray-600">{user.location.country}</p>
        </div>
      )}

      {hasStore && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-bold text-gray-700">Store Details:</h4>
          <p className="text-sm text-gray-600 truncate">{user.store.name}</p>
          <p className="text-sm text-gray-600 truncate">{`Owner: ${user.store.ownerName}`}</p>
          <p className={`text-sm ${user.store.approved ? 'text-green-600' : 'text-red-600'}`}>
            {user.store.approved ? 'Approved' : 'Pending Approval'}
          </p>
        </div>
      )}

      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200 mt-4">
        View Details
      </button>
    </div>
  );
};

export default UserCard;
