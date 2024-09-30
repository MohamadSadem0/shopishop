import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapPicker = ({ latitude, longitude, setLatitude, setLongitude, onClose }) => {
  const [markerPosition, setMarkerPosition] = useState({ lat: latitude, lng: longitude });
  const [mapRef, setMapRef] = useState(null); // Reference to the map instance

  // Handle map clicks to set marker
  const handleMapClick = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setMarkerPosition({ lat: newLat, lng: newLng });
    setLatitude(newLat);
    setLongitude(newLng);
  };

  // Function to detect and center the user's current location
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
            mapRef.panTo(newCenter); // Pan the map to the user's location
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

  // Automatically center on user location on load
  useEffect(() => {
    centerOnUserLocation();
  }, [centerOnUserLocation]);

  // Map container style
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  // Map options: enable zoom control, and enable geolocation UI control
  const mapOptions = {
    zoomControl: true,
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    disableDefaultUI: false, // Ensure the default UI is enabled (which includes the My Location button)
  };

  return (
    <div className="map-container">
      {/* Load Google Maps Script */}
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition} // Set center of the map to the marker's position
          zoom={12}
          onClick={handleMapClick}
          options={mapOptions}
          onLoad={(map) => setMapRef(map)} // Save the reference to the map instance
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
