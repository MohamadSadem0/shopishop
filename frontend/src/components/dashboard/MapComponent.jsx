import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

const MapComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [markerTitle, setMarkerTitle] = useState("Decrypted Location");

  useEffect(() => {
    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    // Function to decrypt data from sessionStorage
    const decryptData = (encryptedData) => {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
        return bytes.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        console.error('Error decrypting data:', error);
        return null;
      }
    };

    // Load decrypted location data from sessionStorage
    const loadDecryptedLocationData = () => {
      const encryptedLocation = sessionStorage.getItem('location');
      if (encryptedLocation && encryptionKey) {
        const decryptedLocation = decryptData(encryptedLocation);
        console.log('Decrypted Location:', decryptedLocation);

        try {
          const parsedLocation = JSON.parse(decryptedLocation);
          const { latitude, longitude, city, state, country } = parsedLocation;

          setLatitude(latitude);
          setLongitude(longitude);
          setMarkerTitle(`${city}, ${state}, ${country}` || 'Decrypted Location');
        } catch (error) {
          console.error('Error parsing decrypted location data:', error);
        }
      }
    };

    // Load the decrypted location data and initialize the map
    loadDecryptedLocationData();

    // Load Google Maps API script
    const loadGoogleMapsScript = () => {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // Initialize the Google Map
    const initializeMap = () => {
      if (!latitude || !longitude || !window.google || !window.google.maps) return;

      const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 12,
      };

      const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
      new window.google.maps.Marker({
        position: mapOptions.center,
        map: map,
        title: markerTitle,
      });
    };

    loadGoogleMapsScript().then(initializeMap).catch(error => console.error('Error loading Google Maps:', error));
  }, [latitude, longitude, markerTitle]);

  return (
    <div className="flex h-full flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Google Maps Example</h2>
      <div id="map" className="w-full h-full max-w-4xl border-2 border-gray-300 rounded-lg shadow-lg"></div>
    </div>
  );
};

export default MapComponent;
