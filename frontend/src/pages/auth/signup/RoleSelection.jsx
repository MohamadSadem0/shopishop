import React from 'react';
import Button from '../../../components/common/Button';

const RoleSelection = ({ userType, setUserType, handleNext }) => (
  <div>
    <h1 className="text-black text-3xl font-bold mb-4 text-center">Choose Your Role</h1>
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => setUserType('Customer')}
        className={`w-1/2 py-2 rounded ${userType === 'Customer' ? 'bg-yellow1 text-black' : 'bg-gray-200 text-gray-700'}`}
      >
        Customer
      </button>
      <button
        onClick={() => setUserType('Merchant')}
        className={`w-1/2 py-2 rounded ${userType === 'Merchant' ? 'bg-yellow1 text-black' : 'bg-gray-200 text-gray-700'}`}
      >
        Merchant
      </button>
    </div>
    <Button label="Next" onClick={handleNext} className="w-full bg-yellow1 text-black py-2 rounded hover:bg-yellow1" />
  </div>
);


export default RoleSelection;
