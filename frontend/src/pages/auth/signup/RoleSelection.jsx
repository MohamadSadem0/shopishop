import React from 'react';
import Button from '../../../components/common/Button';

const RoleSelection = ({ userType, setUserType, handleNext }) => (
  <div>
    <h1 className="text-white text-4xl mb-4">Get Started</h1>
    <p className="text-[#c4c4c4] text-2xl mb-6">Welcome to Shopiishop - let’s create your account</p>
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => setUserType('Customer')}
        className={`w-1/2 py-2 rounded ${userType === 'Customer' ? 'bg-[#4A525C] text-[#EDB502]' : 'bg-gray-200 text-gray-700 '}`}
      >
        Customer
      </button>
      <button
        onClick={() => setUserType('Seller')}
        className={`w-1/2 py-2 rounded ${userType === 'Seller' ? 'bg-[#EDB502] text-black' : 'bg-gray-200 text-gray-700'}`}
      >
        Seller
      </button>
    </div>
    <Button
      label="Next"
      onClick={handleNext}
      className="w-full bg-[#FEDE02] text-black text-xl py-2 rounded hover:bg-yellow-400"
    />
  </div>
);

export default RoleSelection;
