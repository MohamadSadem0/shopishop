import React from 'react';

const UserDetailPopup = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">User Details</h2>

        {/* Show common details */}
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

        {/* Location details */}
        {user.location && (
          <div className="mt-4">
            <h3 className="font-bold">Location:</h3>
            <p>{user.location.addressLine}</p>
            <p>{`${user.location.city}, ${user.location.state}, ${user.location.zipCode}`}</p>
            <p>{user.location.country}</p>
          </div>
        )}

        {/* Conditional rendering based on role */}
        {user.role === 'MERCHANT' && (
          <div className="mt-4">
            <h3 className="font-bold">Merchant Specific Info:</h3>
            <p><strong>Username:</strong> {user.userName}</p>
            {/* Add more MERCHANT-specific details here if needed */}
          </div>
        )}

        {/* Close button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPopup;
