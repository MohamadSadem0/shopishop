import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

/**
 * MapComponent renders a Google Map with a marker at a decrypted location.
 * It also includes zoom controls and a geolocation button to center the map
 * based on the user's current location.
 */
const MapComponent = () => {
  // State to manage latitude, longitude, and marker title (for decrypted location)
  const [latitude, setLatitude] = useState(54); // Default latitude
  const [longitude, setLongitude] = useState(40); // Default longitude
  const [markerTitle, setMarkerTitle] = useState("Decrypted Location"); // Default marker title

  useEffect(() => {
    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    /**
     * Decrypts the data from sessionStorage using CryptoJS AES.
     * @param {string} encryptedData - The encrypted data string.
     * @returns {string|null} - Decrypted string or null if an error occurs.
     */
    const decryptData = (encryptedData) => {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
        return bytes.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        console.error('Error decrypting data:', error);
        return null;
      }
    };

    /**
     * Loads and decrypts location data stored in sessionStorage.
     * Sets the latitude, longitude, and marker title with the decrypted data.
     */
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

    // Load decrypted location data
    loadDecryptedLocationData();

    /**
     * Dynamically loads the Google Maps API script.
     * @returns {Promise} - A promise that resolves when the script is successfully loaded.
     */
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

    /**
     * Adds a custom geolocation control button to the Google Map.
     * When clicked, it centers the map on the user's current location.
     * @param {object} map - The Google Maps instance.
     */
    const addGeolocationControl = (map) => {
      const controlDiv = document.createElement('div');
      const controlUI = document.createElement('button');

      // Button styling
      controlUI.style.backgroundColor = '#fff';
      controlUI.style.border = 'none';
      controlUI.style.outline = 'none';
      controlUI.style.width = '40px';
      controlUI.style.height = '40px';
      controlUI.style.borderRadius = '50%';
      controlUI.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.3)';
      controlUI.innerHTML = `<img src="https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png" width="24" height="24" alt="geolocate" aria-label="Locate me" title="Geolocation"/>`;

      // Add the control to the map
      controlDiv.appendChild(controlUI);
      map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(controlDiv);

      // Event listener for geolocation
      controlUI.addEventListener('click', () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            map.setCenter(pos);
            new window.google.maps.Marker({
              position: pos,
              map: map,
              title: 'Your Location',
            });
          });
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      });
    };

    /**
     * Initializes the Google Map with a marker at the given latitude and longitude.
     * Also adds zoom controls and geolocation functionality.
     */
    const initializeMap = () => {
      if (!latitude || !longitude || !window.google || !window.google.maps) return;

      // Map configuration
      const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 12,
        zoomControl: true, // Enable zoom controls (+ and -)
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER, // Position the zoom controls
        },
      };

      // Initialize map
      const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
      
      // Add marker at the decrypted location
      new window.google.maps.Marker({
        position: mapOptions.center,
        map: map,
        title: markerTitle, // Title for the marker
      });

      // Add geolocation button
      addGeolocationControl(map);
    };

    // Load the Google Maps script and initialize the map
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
