import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapPicker = ({ latitude, longitude, setLatitude, setLongitude, onClose }) => {
  const [markerPosition, setMarkerPosition] = useState({ lat: latitude, lng: longitude });
  const [mapRef, setMapRef] = useState(null); // Reference to the map instance

  // Function to handle map click and place a marker
  const handleMapClick = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setMarkerPosition({ lat: newLat, lng: newLng });
    setLatitude(newLat);
    setLongitude(newLng);
  };

  // Automatically center the map on the user's current location
  const centerOnUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: userLat, longitude: userLng } = position.coords;
          const newCenter = { lat: userLat, lng: userLng };
          setLatitude(userLat);
          setLongitude(userLng);
          setMarkerPosition(newCenter);
          if (mapRef) {
            mapRef.panTo(newCenter); // Center the map on the user's location
          }
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [mapRef, setLatitude, setLongitude]);

  // Map options: Ensure the default UI is enabled and geolocation controls are visible
  const mapOptions = {
    zoomControl: true,
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    disableDefaultUI: false, // Enable the default Google Maps UI (which includes the My Location button)
    clickableIcons: false, // Disable clickable POIs
  };

  // Automatically center the map on the user's location when the map loads
  useEffect(() => {
    centerOnUserLocation();
  }, [centerOnUserLocation]);

  // Map container style
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition} // Set the initial center of the map
          zoom={12}
          onClick={handleMapClick} // Allow placing a marker on map click
          options={mapOptions}
          onLoad={(map) => setMapRef(map)} // Save the map reference for future use
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      </LoadScript>

      {/* Button to confirm the selected location */}
      <button className="bg-yellow-500 text-white px-4 py-2 rounded mt-2" onClick={onClose}>
        Confirm Location
      </button>
    </div>
  );
};

export default MapPicker;
