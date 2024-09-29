import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const MapPicker = ({ setLatitude, setLongitude, latitude, longitude, closeMap }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Ensure this is correct
  });

  const [selectedLocation, setSelectedLocation] = useState({
    lat: latitude || 40.712776,
    lng: longitude || -74.005974,
  });

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });
    setLatitude(lat);
    setLongitude(lng);
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selectedLocation}
        zoom={12}
        onClick={handleMapClick}
      >
        <Marker position={selectedLocation} />
      </GoogleMap>
      <button
        onClick={closeMap}
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Confirm Location
      </button>
    </div>
  );
};

export default MapPicker;
