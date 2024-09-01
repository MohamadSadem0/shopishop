import React, { useState } from 'react';
import SignupForm from './SignupForm';

const Signup = () => {
  const [role, setRole] = useState(null);

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!role ? (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Choose Your Role</h1>
          <div className="flex justify-center">
            <button
              onClick={() => handleRoleSelection('customer')}
              className="bg-green-500 text-white py-2 px-4 rounded mr-2"
            >
              Customer
            </button>
            <button
              onClick={() => handleRoleSelection('seller')}
              className="bg-purple-500 text-white py-2 px-4 rounded"
            >
              Seller
            </button>
          </div>
        </div>
      ) : (
        <SignupForm role={role} />
      )}
    </div>
  );
};

export default Signup;
