import React, { useEffect, useState } from 'react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import Spinner from '../../../components/common/Spinner';
import { fetchSections } from '../../../services/sectionService';

const MerchantDetails = ({
  serviceName,
  setServiceName,
  serviceSection,
  setServiceSection,
  location,
  setLocation,
  currency,
  setCurrency,
  error,
  handleSignup,
  handleBack,
  loading,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  addressLine,
  setAddressLine,
  city,
  setCity,
  state,
  setState,
  zipCode,
  setZipCode,
  country,
  setCountry,
}) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const getSections = async () => {
      try {
        const fetchedSections = await fetchSections();
        setSections(fetchedSections);
      } catch (err) {
        console.error('Failed to fetch sections:', err);
      }
    };
    getSections();
  }, []);

  return (
    <form onSubmit={handleSignup} className="flex flex-col w-full">
      <h1 className="text-black text-3xl sm:text-4xl font-bold mb-4 text-center">
        Enter Merchant Details
      </h1>
      <Input
        label="Service Name"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        required
        className="mb-4 w-full"
      />
      <div className="mb-4 w-full">
        <label className="block text-black mb-2"> Section</label>
        <select
          className="w-full p-2 border rounded"
          value={serviceSection}
          onChange={(e) => setServiceSection(e.target.value)}
          required
        >
          <option value="">Select a Section</option>
          {sections.map((section, index) => (
            <option key={index} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>
      </div>
      <Input
        label="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        required
        className="mb-4 w-full"
      />
      <Input
        label="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        required
        className="mb-4 w-full"
      />
      <Input
        label="Address Line"
        value={addressLine}
        onChange={(e) => setAddressLine(e.target.value)}
        required
        className="mb-4 w-full"
      />
      <Input
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        className="mb-4 w-full"
      />
      <Input
        label="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
        className="mb-4 w-full"
      />
      <Input
        label="Zip Code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        required
        className="mb-4 w-full"
      />
      <Input
        label="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
        className="mb-4 w-full"
      />
      <div className="mb-4 w-full">
        <label className="block text-black mb-2">Currency</label>
        <select
          className="w-full p-2 border rounded"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
        >
          <option value="USD">USD ($)</option>
          <option value="LBP">LBP (ل.ل)</option>
        </select>
      </div>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="flex justify-between">
        <Button
          label="Back"
          onClick={handleBack}
          className="bg-gray-500 text-white text-lg py-2 rounded hover:bg-gray-600"
        />
        <Button
          label={loading ? <Spinner /> : 'Sign up'}
          type="submit"
          className="bg-yellow-400 text-black text-lg py-2 rounded hover:bg-yellow-500 transition"
        />
      </div>
    </form>
  );
};

export default MerchantDetails;
