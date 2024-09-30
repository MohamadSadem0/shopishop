import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

const MapComponent = () => {
  const [latitude, setLatitude] = useState(54); // Default latitude
  const [longitude, setLongitude] = useState(40); // Default longitude
  const [markerTitle, setMarkerTitle] = useState('Decrypted Location');

  useEffect(() => {
    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const decryptData = (encryptedData) => {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
        return bytes.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        console.error('Error decrypting data:', error);
        return null;
      }
    };

    const loadDecryptedLocationData = () => {
      const encryptedLocation = sessionStorage.getItem('location');
      if (encryptedLocation && encryptionKey) {
        const decryptedLocation = decryptData(encryptedLocation);
        try {
          const parsedLocation = JSON.parse(decryptedLocation);
          const { latitude, longitude, city, state, country } = parsedLocation;
          setLatitude(latitude);
          setLongitude(longitude);
          setMarkerTitle(`${city}, ${state}, ${country}`);
        } catch (error) {
          console.error('Error parsing decrypted location data:', error);
        }
      }
    };

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

    const addGeolocationControl = (map) => {
      const controlDiv = document.createElement('div');
      const controlUI = document.createElement('button');
    
      // Improved styling for the button
      controlUI.style.backgroundColor = '#4285F4'; // Google Maps blue color
      controlUI.style.border = '2px solid #fff';   // White border for better contrast
      controlUI.style.borderRadius = '50%';        // Circular button
      controlUI.style.width = '40px';              // Button size
      controlUI.style.height = '40px';             
      controlUI.style.display = 'flex';            // Center the icon inside
      controlUI.style.justifyContent = 'center';
      controlUI.style.alignItems = 'center';
      controlUI.style.cursor = 'pointer';          // Pointer cursor on hover
      controlUI.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.3)'; // Subtle shadow
      controlUI.style.outline = 'none';            // Remove the outline
    
      // Add hover effect to the button
      controlUI.onmouseover = () => {
        controlUI.style.backgroundColor = '#3367D6'; // Darker blue on hover
      };
    
      controlUI.onmouseout = () => {
        controlUI.style.backgroundColor = '#4285F4'; // Original blue when not hovering
      };
    
      controlUI.innerHTML = `
        <img src="https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png" 
             width="24" height="24" alt="geolocate" title="Locate me"/>
      `;
    
      controlDiv.appendChild(controlUI);
      map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(controlDiv);
    
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
          alert('Geolocation is not supported by this browser.');
        }
      });
    };
    

    const initializeMap = () => {
      if (!latitude || !longitude || !window.google || !window.google.maps) return;

      const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 12,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER,
        },
      };

      const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

      new window.google.maps.Marker({
        position: mapOptions.center,
        map: map,
        title: markerTitle,
      });

      addGeolocationControl(map);
    };

    loadDecryptedLocationData();

    loadGoogleMapsScript()
      .then(initializeMap)
      .catch((error) => console.error('Error loading Google Maps:', error));
  }, [latitude, longitude, markerTitle]);

  return (
    <div className="flex h-full flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Google Maps Example</h2>
      <div id="map" className="w-full h-full max-w-4xl border-2 border-gray-300 rounded-lg shadow-lg"></div>
    </div>
  );
};

export default MapComponent;
