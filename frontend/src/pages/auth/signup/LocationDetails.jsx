import React from 'react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

const LocationDetails = ({
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
  handleNext, // for merchants
  handleSignup, // for customers
  handleBack,
  userType // to differentiate between customer and merchant
}) => (
  <form className="flex flex-col w-full">
    <h1 className="text-black text-3xl font-bold mb-4 text-center">Enter Your Location</h1>
    
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

    <div className="flex justify-between mt-4">
      <Button
        label="Back"
        onClick={handleBack}
        className="bg-gray-500 text-white text-lg py-2 rounded hover:bg-gray-600"
      />
      {/* Conditional Button based on userType */}
      {userType === 'Merchant' ? (
        <Button
          label="Next"
          onClick={handleNext} // Proceed to business details for merchants
          className="bg-yellow-400 text-black text-lg py-2 rounded hover:bg-yellow-500"
        />
      ) : (
        <Button
          label="Signup"
          onClick={handleSignup} // Complete signup for customers
          className="bg-yellow-400 text-black text-lg py-2 rounded hover:bg-yellow-500"
        />
      )}
    </div>
  </form>
);

export default LocationDetails;
