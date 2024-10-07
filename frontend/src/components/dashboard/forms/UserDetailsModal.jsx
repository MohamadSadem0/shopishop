import React from 'react';

const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full">
        <div className="text-right">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors duration-150">
            <span className="sr-only">Close</span>
            &#x2715; {/* Unicode for 'X' */}
          </button>
        </div>
        <div className="mt-2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Details</h2>
          <div className="border-t border-gray-100 pt-4">
            <p className="font-medium text-gray-600">Name: <span className="text-gray-800">{user.userName}</span></p>
            <p className="font-medium text-gray-600">Email: <span className="text-gray-800">{user.email}</span></p>
            <p className="font-medium text-gray-600">Role: <span className="text-gray-800">{user.role}</span></p>
          </div>
        </div>

        {user.store && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Store Details</h3>
            <div className="border-t border-gray-100 pt-4">
              <p className="font-medium text-gray-600">Name: <span className="text-gray-800">{user.store.name}</span></p>
              <p className="font-medium text-gray-600">Owner: <span className="text-gray-800">{user.store.ownerName}</span></p>
              <p className="font-medium text-gray-600">Status: <span className={`font-semibold ${user.store.approved ? 'text-green-600' : 'text-red-600'}`}>
                {user.store.approved ? 'Approved' : 'Pending Approval'}
              </span></p>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-150">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;