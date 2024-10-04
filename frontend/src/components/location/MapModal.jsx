import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';



const MapModal = ({ currentPosition, markerPosition, onClose, onMapClick, detectCurrentLocation, errorMessage }) => {
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={12}
          onClick={onMapClick}
          options={{
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: true,
          }}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close Map
          </button>
          <button
            type="button"
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={() => {
              console.log("Detect Location Button Clicked");
              detectCurrentLocation(); // Call detectCurrentLocation when the button is clicked
            }}
          >
            Detect My Location
          </button>
        </div>
        {errorMessage && <p className="text-red-500 mt-4 text-center">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default MapModal;
