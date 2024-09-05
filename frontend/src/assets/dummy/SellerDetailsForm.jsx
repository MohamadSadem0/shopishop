import React, { useState } from 'react';

const SellerDetailsForm = ({ username, email, password }) => {
  const [serviceName, setServiceName] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  const [location, setLocation] = useState('');
  const [currency, setCurrency] = useState('USD'); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Implement the signup call for sellers
    // Example:
    // try {
    //   const response = await signupSeller({
    //     username, email, password, serviceName, serviceCategory, location, currency
    //   });
    //   // Handle success
    // } catch (err) {
    //   setError('Failed to complete seller registration. Please try again.');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Complete Seller Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Service Name</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border rounded"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Service Category</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border rounded"
            value={serviceCategory}
            onChange={(e) => setServiceCategory(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Currency</label>
          <select
            className="mt-1 block w-full p-2 border rounded"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">$ (USD)</option>
            <option value="LBP">LB (LBP)</option>
          </select>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {loading ? 'Loading...' : 'Complete Registration'}
        </button>
      </form>
    </div>
  );
};

export default SellerDetailsForm;
