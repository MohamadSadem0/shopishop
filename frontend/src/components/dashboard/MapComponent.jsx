import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    // Load the Google Maps API script
    const loadGoogleMapsScript = () => {
      return new Promise((resolve, reject) => {
        if (window.google) {
          resolve(); // If the script is already loaded, resolve immediately
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

    // Initialize the Google Map and add a marker
    const initializeMap = () => {
      if (window.google) {
        const mapOptions = {
          center: { lat: 37.7749, lng: -122.4194 }, // Example: San Francisco coordinates
          zoom: 12, // Adjust zoom level to show a smaller part of the map
        };

        // Create the map
        const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

        // Add a marker at the center
        const marker = new window.google.maps.Marker({
          position: mapOptions.center, // Place the marker at the map's center
          map: map, // The map object
          title: 'San Francisco', // Tooltip text when hovering over the marker
        });
      }
    };

    // Load the script and initialize the map with the marker
    loadGoogleMapsScript().then(initializeMap).catch((error) => {
      console.error('Error loading Google Maps:', error);
    });
  }, []);

  return (
    <div className="flex h-full flex-col items-center">
      
      <div id="map" className="w-full h-full max-w-4xl  border-gray-300 rounded-lg shadow-lg"></div>
    </div>
  );
};

export default MapComponent;
