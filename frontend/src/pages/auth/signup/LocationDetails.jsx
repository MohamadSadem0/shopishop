import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { FaMapMarkerAlt } from 'react-icons/fa';

const LocationDetails = ({
  setLatitude,
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
}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ lat: 40.712776, lng: -74.005974 }); // Default to New York City
  const [markerPosition, setMarkerPosition] = useState(null); // State to control the marker position
  const [errorMessage, setErrorMessage] = useState(''); // State to store error messages

  // Handle map click to update latitude, longitude, and marker position
  const handleMapClick = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setLatitude(newLat);
    setLongitude(newLng);
    setMarkerPosition({ lat: newLat, lng: newLng });
    setCurrentPosition({ lat: newLat, lng: newLng });
  };

  // Automatically detect the user's current location using Geolocation API
  const detectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setCurrentPosition({ lat: latitude, lng: longitude });
          setMarkerPosition({ lat: latitude, lng: longitude }); // Set the marker to the user's location
        },
        (error) => {
          setErrorMessage('Failed to detect your location. Please enable location services.');
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by this browser.');
    }
  };

  // Google Maps container style
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const mapCenter = currentPosition;

  // Toggle the map modal visibility
  const toggleMapModal = () => {
    setIsMapOpen(!isMapOpen);
  };

  return (
    <form className="flex flex-col w-full">
      <h1 className="text-black text-3xl font-bold mb-4 text-center">Enter Your Location</h1>

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

      {/* Button to open the map for location selection */}
      <div className="flex items-center justify-center mb-4">
        <Button
          label="Choose Your Location"
          onClick={toggleMapModal}
          className="bg-yellow-400 text-black text-lg py-2 rounded flex items-center"
        >
          <FaMapMarkerAlt className="ml-2 text-black" size={20} />
        </Button>
      </div>

      {/* Map modal for picking the location */}
      {isMapOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={12}
              onClick={handleMapClick} // Handle map clicks to place the marker
              options={{
                fullscreenControl: false, // Disable fullscreen control
                mapTypeControl: false, // Disable map type control
                streetViewControl: false, // Disable street view control
                zoomControl: true, // Enable zoom control
              }}
            >
              {/* Place a marker on the map at the selected location */}
              {markerPosition && <Marker position={markerPosition} />}
            </GoogleMap>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={toggleMapModal}
              >
                Close Map
              </button>
              <button
                type="button"
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={detectCurrentLocation} // Detect the user's current location
              >
                Detect My Location
              </button>
            </div>
            {/* Display any error message */}
            {errorMessage && <p className="text-red-500 mt-4 text-center">{errorMessage}</p>}
          </div>
        </div>
      )}

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
};

export default LocationDetails;
