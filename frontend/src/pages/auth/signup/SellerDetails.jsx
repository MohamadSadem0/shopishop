import React from 'react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import Spinner from '../../../components/common/Spinner'; 


const SellerDetails = ({ serviceName, setServiceName, serviceCategory, setServiceCategory, location, setLocation, currency, setCurrency, categories, error, handleSignup, handleBack, loading }) => (
  <form onSubmit={handleSignup} className="flex flex-col text-white w-full">
    <h1 className="text-white text-4xl mb-4">Enter Seller Details</h1>
    <Input label="Service Name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} required className="mb-4 text-black" />
    <div className="mb-4 text-black">
      <label className="block text-white mb-2">Service Category</label>
      <select className="w-full p-2 border rounded" value={serviceCategory} onChange={(e) => setServiceCategory(e.target.value)} required>
        <option value="">Select Category</option>
        {categories.map((category, index) => <option key={index} className='text-black' value={category}>{category}</option>)}
      </select>
    </div>
    <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} required className="mb-4 text-black" />
    <div className="mb-4">
      <label className="block text-white mb-2">Currency</label>
      <select className="w-full text-black p-2 border rounded" value={currency} onChange={(e) => setCurrency(e.target.value)} required>
        <option value="USD">USD ($)</option>
        <option value="LBP">LBP (ل.ل)</option>
      </select>
    </div>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <div className="flex justify-between">
      <Button label="Back" onClick={handleBack} className="bg-gray-500 text-white text-xl py-2 rounded hover:bg-gray-600" />
      <Button label={loading ? <Spinner /> : 'Sign up'} type="submit" className="bg-[#FEDE02] text-black text-xl py-2 rounded hover:bg-yellow-400" />
    </div>
  </form>
);

export default SellerDetails;
