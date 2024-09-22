import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

const MapComponent = () => {
  const [latitude, setLatitude] = useState(null); // Start with null to avoid initialization issues
  const [longitude, setLongitude] = useState(null);
  const [markerTitle, setMarkerTitle] = useState("Decrypted Location");

  useEffect(() => {
    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    // Function to decrypt data from localStorage
    const decryptData = (encryptedData) => {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
        return bytes.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        console.error('Error decrypting data:', error);
        return null;
      }
    };

    // Load decrypted location data from localStorage
    const loadDecryptedLocationData = () => {
      const encryptedLocation = localStorage.getItem('location'); // Assuming location is stored as 'location'
      
      if (encryptedLocation && encryptionKey) {
        const decryptedLocation = decryptData(encryptedLocation);
        console.log('Decrypted Location:', decryptedLocation); // Log decrypted data for debugging

        try {
          const parsedLocation = JSON.parse(decryptedLocation);
          const { latitude, longitude, city, state, country } = parsedLocation;
          setLatitude( parsedLocation.latitude)
          setLongitude(parsedLocation.longitude)
          console.log(latitude , longitude)

          // Validate latitude and longitude ranges
          if (
            latitude >= -90 && latitude <= 90 && 
            longitude >= -180 && longitude <= 180
          ) {
            // setLatitude(parseFloat(latitude));
            // setLongitude(parseFloat(longitude));
            setMarkerTitle(`${city}, ${state}, ${country}` || 'Decrypted Location');
          } else {
            console.error('Invalid latitude or longitude values:', latitude, longitude);
          }
        } catch (error) {
          console.error('Error parsing decrypted location data:', error);
        }
      }
    };

    // Load Google Maps API script
    const loadGoogleMapsScript = () => {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve(); // If Google Maps API is already loaded
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject('Google Maps script failed to load.');
        document.head.appendChild(script);
      });
    };

    // Initialize the Google Map
    const initializeMap = () => {
      if (!latitude || !longitude || !window.google || !window.google.maps) return;

      const mapOptions = {
        center: { lat: latitude, lng: longitude }, // Use decrypted latitude and longitude
        zoom: 12,
      };

      // Create the map
      const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

      // Add a marker at the center
      new window.google.maps.Marker({
        position: mapOptions.center, // Place the marker at the map's center
        map: map, // The map object
        title: markerTitle, // Tooltip text from decrypted marker title
      });
    };

    // Load the decrypted location data
    loadDecryptedLocationData();

    // Load the script and initialize the map
    loadGoogleMapsScript()
      .then(initializeMap)
      .catch((error) => {
        console.error('Error loading Google Maps:', error);
      });
  }, [latitude, longitude, markerTitle]);

  return (
    <div className="flex h-full flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Google Maps Example</h2>
      <div id="map" className="w-full h-full max-w-4xl border-2 border-gray-300 rounded-lg shadow-lg"></div>
    </div>
  );
};

export default MapComponent;
